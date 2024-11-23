import base64
import io
import urllib
from datetime import datetime, timezone
import logging

import requests
import statistics
from django.core.mail import message
from django.db.models import Q, F, Avg, Count, Sum
from django.http import JsonResponse
from django.shortcuts import render, redirect
from matplotlib import pyplot as plt

from lab5.settings import DEBUG
from .models import User, Article, Question, Answer, Job, Review, Promo, Tour, Country, Hotel, Order, Employee, Partner, \
    CartItem, AboutCompany, CompanyHistory

logging.basicConfig(level=logging.INFO, filename='logging.log', filemode='a')


# Create your views here.
def home(request):
    return render(request, 'home.html')


def login(request):
    resp = render(request, 'login.html')
    resp.delete_cookie('phone')
    resp.delete_cookie('role')
    if request.method == 'POST':
        phone = request.POST['phone']
        password = request.POST['password']
        user = User.objects.filter(phone=phone, password=password).first()
        if user is not None:
            response = redirect('main')
            response.set_cookie("phone", phone)
            response.set_cookie("role", user.type)
            return response

        else:
            return redirect('login')

    return resp


def register(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        second_name = request.POST['second_name']
        password = request.POST['password']
        phone = request.POST['phone']
        address = request.POST['address']
        birth = datetime.strptime(request.POST['date_of_birth'], '%Y-%m-%d')
        if datetime.now().year - birth.year < 18:
            return redirect('register')
        User.objects.create(first_name=first_name, last_name=last_name, second_name=second_name, phone=phone,
                            address=address, date_of_birth=birth)
        response = redirect('main')
        response.set_cookie("phone", phone)
        response.set_cookie("role", "client")
        return response

    return render(request, 'register.html')


def main(request):
    url = "https://catfact.ninja/fact"
    url2 = "https://api.ipify.org/?format=json"

    response = requests.get(url)
    response2 = requests.get(url2)

    role = 'none'
    userPhone = request.COOKIES.get('phone')
    user = User.objects.filter(phone=userPhone).first()
    if userPhone:
        role = user.type

    article = Article.objects.order_by("created_at").first()
    tours = Tour.objects.all()
    countries = Country.objects.all()
    hotels = Hotel.objects.all()
    partners = Partner.objects.all()
    context = {'article': article, 'fact': response.json()["fact"], 'ip': response2.json()["ip"],'tours': tours, 'countries': countries, 'hotels': hotels, 'role': role, 'partners': partners}
    return render(request, 'main.html', context)


def about(request):
    about = AboutCompany.objects.first()
    histories = CompanyHistory.objects.all()
    context = {'about': about, 'histories': histories}
    return render(request, 'about.html', context)

def details(request, name):
    userPhone = request.COOKIES.get('phone')
    # name = request.GET().get('name')
    role = 'none'
    countries = Country.objects.all()
    hotels = Hotel.objects.all()
    user = User.objects.filter(phone=userPhone).first()
    if userPhone:
        role = user.type

    tour = Tour.objects.filter(name=name).first()

    context = {'tour': tour, 'countries': countries, 'hotels': hotels, 'role': role, 'name': name}
    return render(request, 'details.html', context)

def news(request):
    articles = Article.objects.order_by("created_at").all()
    context = {'articles': articles}
    return render(request, 'news.html', context)

def news_details(request, title):
    article = Article.objects.filter(title=title).first()
    context = {'article': article}
    return render(request, 'news_details.html', context)

def dick(request):
    questions = Question.objects.order_by("date").all()
    answers = Answer.objects.order_by("date").all()
    context = {'questions': questions, 'answers': answers}
    return render(request, 'dick.html', context)


def contacts(request):
    doctors = list(
        Employee.objects.all().values('id', 'first_name', 'surname', 'last_name', 'position', 'email',
                                    'phone', 'img_url'))

    data = {'emps': doctors}
    return render(request, 'contacts.html', context=data)


def policy(request):
    return render(request, 'policy.html')


def job(request):
    jobs = Job.objects.order_by("date").all()
    context = {'jobs': jobs}
    return render(request, 'job.html', context)


def reviews(request):
    if request.method == "POST":
        userPhone = request.COOKIES.get('phone')
        user = User.objects.filter(phone=userPhone).first()
        Review.objects.create(
            title=request.POST["title"],
            stars=request.POST["stars"],
            user=user
        )
    reviews = Review.objects.order_by("created_at").all()
    context = {'reviews': reviews}
    return render(request, 'reviews.html', context)


def promo(request):
    promos = Promo.objects.order_by("end_date").all()
    context = {'promos': promos, 'now': datetime.now()}
    return render(request, 'promo.html', context)


def tours(request):
    userPhone = request.COOKIES.get('phone')
    role = 'none'
    countries = Country.objects.all()
    hotels = Hotel.objects.all()
    user = User.objects.filter(phone=userPhone).first()
    if userPhone:
        role = user.type

    if request.method == 'POST':
        duration = request.POST['duration']
        country = request.POST['country']
        price = request.POST['less']
        stars = request.POST['stars']
        filter = Q()
        if duration != "0":
            filter &= Q(duration=duration)
        if country != "0":
            filter &= Q(country__name=country)
        if price != "":
            total_price = F('hotel__oneDayPrice') * (F('duration') * 7)
            filter &= Q(price__lte=price - total_price)
        if stars != "0":
            filter &= Q(hotel__stars=stars)

        tours = Tour.objects.filter(filter)
    else:
        tours = Tour.objects.all()
    context = {'tours': tours, 'countries': countries, 'hotels': hotels, 'role': role}
    return render(request, 'tours.html', context)

def cart(request):
    userPhone = request.COOKIES.get('phone')
    countries = Country.objects.all()
    hotels = Hotel.objects.all()
    user = User.objects.filter(phone=userPhone).first()
    if userPhone:
        role = user.type
    if request.method == 'POST' and request.POST['delete'] == 'True':
        item_to_delete = CartItem.objects.filter(tour__name = request.POST['name']).filter(user=user).first()
        item_to_delete.delete()
    elif request.method == 'POST':
        name = request.POST['name']
        amount = request.POST['amount']
        tour = Tour.objects.filter(name=name).first()
        CartItem.objects.create(
            amount=amount,
            price=int(request.POST['price']) * int(amount),
            startDate=datetime.strptime(request.POST['date'], "%Y-%m-%d"),
            user=user,
            tour=tour,
        )
    cart_items = CartItem.objects.filter(user=user).all()
    context = {'cart_items': cart_items , 'role': role}
    return render(request, 'cart.html', context)

def orders(request):
    userPhone = request.COOKIES.get('phone')
    role = 'none'
    countries = Country.objects.all()
    hotels = Hotel.objects.all()
    user = User.objects.filter(phone=userPhone).first()
    if userPhone:
        role = user.type

    if request.method == 'POST':
        name = request.POST['name']
        amount = request.POST['amount']
        tour = Tour.objects.filter(name=name).first()
        Order.objects.create(
            amount=amount,
            price=int(request.POST['price']) * int(amount),
            startDate=datetime.strptime(request.POST['date'], "%Y-%m-%d"),
            user=user,
            tour=tour,
        )
        #return render(request,'orders.html')

    orders = Order.objects.order_by("createdAt").filter(user=user)
    context = {'orders': orders}
    return render(request, 'orders.html', context)


def sells(request):
    sells = Order.objects.order_by("createdAt").all()
    context = {'sells': sells}
    return render(request, 'sells.html', context)


def clients(request):
    clients = User.objects.filter(type='client')
    context = {'clients': clients}
    return render(request, 'clients.html', context)


def stats(request):
    users = User.objects.all()
    years = []
    sum = 0
    for date in users:
        age = datetime.now().year - date.date_of_birth.year
        years.append(age)
        sum += age

    avg = sum / len(years)
    median = statistics.median(years)

    tours = Order.objects.values('tour__name').annotate(dcount=Count('tour'))
    most_pop_name = tours.order_by("dcount").first()['tour__name']

    orders = Order.objects.all()
    tours_dick = {}
    for o in orders:
        if o.tour.name in tours_dick:
            tours_dick[o.tour.name] += o.price
        else:
            tours_dick[o.tour.name] = 0
            tours_dick[o.tour.name] += o.price

    max_profit = max(tours_dick, key=tours_dick.get)

    sum = 0
    for iter in tours_dick.values():
        sum += iter

    print(tours_dick)
    sl_avg = sum / len(tours_dick.values())
    sl_mod = statistics.median(tours_dick.values())
    sl_median = statistics.median(tours_dick.values())


    # plt.plot(range(10))
    # fig = plt.gcf()
    # # convert graph into dtring buffer and then we convert 64 bit code into image
    # buf = io.BytesIO()
    # fig.savefig(buf, format='png')
    # buf.seek(0)
    # string = base64.b64encode(buf.read())
    # uri = urllib.parse.quote(string)

    context = {'cl_avg': avg,
               'cl_median': median,
               'max_profit': max_profit,
               'most_pop': most_pop_name,
               'sl_avg': sl_avg,
               'sl_mod': sl_mod,
               'sl_median': sl_median}

    return render(request, 'stats.html', context)


def edit(request):
    user = User.objects.filter(phone=request.COOKIES.get('phone')).first()
    if request.method == 'POST':
        user.first_name = request.POST['first_name']
        user.last_name = request.POST['last_name']
        user.email = request.POST['address']
        user.phone = request.POST['phone']
        user.address = request.POST['address']
        user.password = request.POST['password']
        user.save()

    if DEBUG:
        logging.debug('asdasd')
    else:
        logging.error("sdasd")

    #print(datetime.tzinfo.)

    context = {'user': user,
               'current_date':datetime.now()
               }
    return render(request, 'edit.html', context)


def delete(request):
    User.objects.remove(phone=request.COOKIES.get('phone'))
    return redirect('login')

def chart(request):
    return render(request, 'chart.html')