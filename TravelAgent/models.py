import datetime
from enum import Enum

from django.core.validators import RegexValidator
from django.db import models
from django_matplotlib import MatplotlibFigureField


import matplotlib.pyplot as plt

class MyModel(models.Model):
    figure = MatplotlibFigureField(figure='my_figure')



def my_figure():
    fig, ax = plt.subplots()
    ax.plot([1, 3, 4], [3, 2, 5])
    return fig
# Create your models here.


class User(models.Model):
    UserType = (
        ('client', 'Client'),
        ('employee', 'Employee')
    )
    phone_regex = RegexValidator(
        regex=r'\+\d{3} \(\d{2}\) \d{3}-\d{2}-\d{2}$',
        message="+375 (29) XXX-XX-XX;   "
    )

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)

    date_of_birth = models.DateField(default=datetime.date.today())

    phone = models.CharField(
        validators=[phone_regex],
        max_length=19,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=50)
    type = models.CharField(max_length=8, choices=UserType, default='client')


class Article(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    img_url = models.CharField(max_length=200,default='')
    created_at = models.DateTimeField(auto_now_add=True)


class Question(models.Model):
    text = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)


class Answer(models.Model):
    text = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)


class Job(models.Model):
    title = models.CharField(max_length=50)
    salary = models.IntegerField()
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    stars = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Promo(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()

    end_date = models.DateTimeField()


class Climate(models.Model):
    climate = models.CharField(max_length=50)


class Country(models.Model):
    name = models.CharField(max_length=50)
    winterClimate = models.ForeignKey(Climate, on_delete=models.CASCADE,related_name='winterClimate')
    springClimate = models.ForeignKey(Climate, on_delete=models.CASCADE,related_name='springClimate')
    autumnClimate = models.ForeignKey(Climate, on_delete=models.CASCADE,related_name='autumnClimate')
    summerClimate = models.ForeignKey(Climate, on_delete=models.CASCADE,related_name='summerClimate')


class Hotel(models.Model):
    name = models.CharField(max_length=50)
    stars = models.PositiveSmallIntegerField()
    oneDayPrice = models.PositiveSmallIntegerField()
    country = models.ForeignKey(Country, related_name="hotels", on_delete=models.CASCADE)


class Tour(models.Model):
    name = models.CharField(max_length=50)
    Duration = {
        1: "One week",
        2: "Two weeks",
        4: "Four weeks",
    }
    duration = models.IntegerField(choices=Duration)
    hotel = models.ForeignKey(Hotel, related_name="tours", on_delete=models.CASCADE)
    country = models.ForeignKey(Country, related_name="tours", on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default=1)

    def get_price(self):
        return self.hotel.oneDayPrice * int(self.duration * 7) + self.price



class Order(models.Model):
    id = models.AutoField(primary_key=True)
    amount = models.PositiveSmallIntegerField(default=1)
    price = models.FloatField()
    startDate = models.DateField()

    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, related_name='orders', on_delete=models.CASCADE)

    createdAt = models.DateField(auto_now_add=True)

class Employee(models.Model):
    position = models.CharField(max_length=50)
    phone_regex = RegexValidator(
        regex=r'\+\d{3} \(\d{2}\) \d{3}-\d{2}-\d{2}$',
        message="+375 (29) XXX-XX-XX;   "
    )

    phone = models.CharField(
        validators=[phone_regex],
        max_length=19,
        blank=True,
        null=True
    )
    img_url = models.CharField(max_length=200,default='')
    email = models.EmailField(blank=True)

