let start_employees = JSON.parse(document.getElementById('employees-data').textContent.replace(/<.+>/, ''));
let employees = start_employees;
let checkedEmployees = new Set();
console.log(start_employees)
const employeesPerPage = 4;
let currentPage = 1;

hidePreloader()

const medList = document.getElementById('employee-list').querySelector('tbody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const employeeDetails = document.getElementById('employee-details');
const bonusButton = document.getElementById('bonusButton');
const bonusInfo = document.getElementById('bonusInfo');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const employeeFormContainer = document.getElementById('employeeFormContainer');
const employeeForm = document.getElementById('employeeForm');
employeeFormContainer.style.display = 'none';

function showPreloader()
{
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'block'; 
}

function hidePreloader()
{
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}

function validateEmpty(value)
{
    return value.length != 0;
}

function validateURL(url)
{
    const urlPattern = /^http[s]?:\/\/.*\./;
    return urlPattern.test(url);
}

function validatePhone(phone)
{
    const phonePattern = /^((8)|(\+375)) ?((\(\d{2,3}\))|(\d{2,3})) ?\d{3}[ -]?\d{2}[ -]?\d{2}$/;
    return phonePattern.test(phone);
}

function validateEmail(email)
{
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
}


function validateField(field, isValid, errorMessage)
{
    const messageElement = document.getElementById(errorMessage);

    if (!isValid)
        {
        field.classList.add('invalid');
        messageElement.style.display = 'block';
    }
    else
    {
        field.classList.remove('invalid');
        messageElement.style.display = 'none';
    }
}

function displayEmployeeDetails(employee)
{
    employeeDetails.innerHTML = `
        <p><strong>Фамилия:</strong> ${employee.surname}</p>
        <p><strong>Имя:</strong> ${employee.first_name}</p>
        <p><strong>Отчество:</strong> ${employee.last_name}</p>
        <p><strong>Должность:</strong> ${employee.position}</p>
        <p><strong>Почта:</strong> ${employee.email}</p>
        <p><strong>Телефон:</strong> ${employee.phone}</p>
    `;
}

function renderEmployees()
{
    medList.innerHTML = '';

    const start = (currentPage - 1) * employeesPerPage;
    const end = start + employeesPerPage;

    const employeesToShow = employees.slice(start, end);
    
    employeesToShow.forEach(employee => {
        const tr = document.createElement('tr');

        if (!employee.img_url || employee.img_url == '')
        {
            employee.img_url = 'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg';
        }
        else if (employee.img_url.slice(0, 13) == 'users_images/')
        {
            employee.img_url = '/media/' + employee.img_url;
        }
        let img = document.createElement('img');
        img.src = employee.img_url;
        let td = document.createElement('td');
        td.appendChild(img);
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = `${employee.surname}`;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = `${employee.first_name}`;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = `${employee.last_name}`;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = `${employee.position}`;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = `${employee.email}`;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = `${employee.phone}`;
        tr.appendChild(td);
        checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        checkedEmployees.forEach((staff) => {
            if (staff.email == employee.email)
            {
                checkbox.checked = true;
            }
        });

        td = document.createElement('td');
        td.appendChild(checkbox);
        tr.appendChild(td);

        medList.appendChild(tr);

        tr.addEventListener('click', function() {
            displayEmployeeDetails(employee);
        });
    });

    pageInfo.textContent = `Страница ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= employees.length;
}

addEmployeeBtn.addEventListener('click', () => {
    if(employeeFormContainer.style.display == 'block'){
        employeeFormContainer.style.display = 'none';
    }
    else{
        employeeFormContainer.style.display = 'block';
    }

});

prevBtn.addEventListener('click', () => {
    checkboxes = document.querySelector('tbody').querySelectorAll('input');

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked)
        {
            checkedEmployees.add(employees[(currentPage - 1) * 3 + (index)]);
        }
        else
        {
            checkedEmployees.delete(employees[(currentPage - 1) * 3 + (index)]);
        }
    });
    if (currentPage > 1)
    {
        currentPage--;
        renderEmployees();
    }
});

nextBtn.addEventListener('click', () => {
    checkboxes = document.querySelector('tbody').querySelectorAll('input');
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked)
        {
            checkedEmployees.add(employees[(currentPage - 1) * 3 + (index)]);
        }
        else
        {
            checkedEmployees.delete(employees[(currentPage - 1) * 3 + (index)]);
        }
    });

    if ((currentPage * employeesPerPage) < employees.length)
    {
        currentPage++;
        renderEmployees();
    }
});

renderEmployees();

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function filterEmployees(searchTerm)
{
    const filteredEmployees = start_employees.filter(employee => {
        return Object.values(employee).some(value => 
            value.toString().toLowerCase().includes(searchTerm)
        );
    });
    console.log(start_employees)
    employees = filteredEmployees;
    renderEmployees();
}

searchButton.addEventListener('click', async function() {
    const searchTerm = searchInput.value.toLowerCase();
    checkedEmployees.clear();

    showPreloader()

    await new Promise(resolve => setTimeout(resolve, 2000));

    hidePreloader()

    filterEmployees(searchTerm);
});

bonusButton.addEventListener('click', async function() {
    checkboxes = document.querySelector('tbody').querySelectorAll('input');
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked)
        {
            checkedEmployees.add(employees[(currentPage - 1) * 3 + (index)]);
        }
        else
        {
            checkedEmployees.delete(employees[(currentPage - 1) * 3 + (index)]);
        }
    });

    showPreloader();

    await new Promise(resolve => setTimeout(resolve, 2000));

    hidePreloader();

    bonusInfo.innerHTML = '';
    let p = document.createElement('p');
    p.textContent = "Премией награждаются следующие сотрудники:";
    bonusInfo.appendChild(p);
    let info;
    checkedEmployees.forEach(employee => {
        info = document.createElement('p');
        info.textContent = `${employee.surname} ` + `${employee.first_name} ` + `${employee.last_name}`;
        bonusInfo.appendChild(info);
        console.log(info.textContent);
    });
});

employeeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const last_name = document.getElementById('last_name').value;
    const first_name = document.getElementById('first_name').value;
    const surname = document.getElementById('surname').value;
    const photo = document.getElementById('photo').files[0];
    const jobDescription = document.getElementById('position').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    var newEmployee = new Object();

    newEmployee.surname = last_name;
    newEmployee.first_name = first_name;
    newEmployee.last_name = surname;
    newEmployee.position = jobDescription;
    newEmployee.phone = phone;
    newEmployee.email = email;
    let date = new Date();
    start_employees.push(newEmployee);
    
    if (photo)
    {
        const reader = new FileReader();
        reader.onload = function(event) {
            newEmployee.img_url = event.target.result;
        };
        reader.readAsDataURL(photo);
    }

    currentPage = 1;
    renderEmployees();

    employeeForm.reset();
    submitBtn.disabled = true;
    successMessage.style.display = 'none';

    employeeFormContainer.style.display = 'none';
});

const urlInput = document.getElementById('url');
const phoneInput = document.getElementById('phone');
const successMessage = document.getElementById('successMessage');
const last_name = document.getElementById('last_name');
const first_name = document.getElementById('first_name');
const surname = document.getElementById('surname');
const jobDescription = document.getElementById('position');
const email = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');

function checkForm()
{
    const isURLValid = validateURL(urlInput.value);
    const isPhoneValid = validatePhone(phoneInput.value);
    const last_nameValid = validateEmpty(last_name.value);
    const first_nameValid = validateEmpty(first_name.value);
    const surnameValid = validateEmpty(surname.value);
    const jobDescriptionValid = validateEmpty(jobDescription.value);
    const emailValid = validateEmail(email.value);

    validateField(urlInput, isURLValid, 'urlMessage');
    validateField(phoneInput, isPhoneValid, 'phoneMessage');

    if (isURLValid && isPhoneValid && last_nameValid && first_nameValid && surnameValid && jobDescriptionValid && emailValid)
    {
        console.log('a')
        successMessage.style.display = 'block';
        submitBtn.disabled = false;
    }
    else
    {
        console.log('-----------------------------')
        console.log('url: ' + isURLValid)
        console.log('phone: ' + isPhoneValid)
        console.log('surname: ' + last_nameValid)
        console.log('last name: ' + surnameValid)
        console.log('name: ' + first_nameValid)
        console.log('descr: ' + jobDescriptionValid)
        console.log('email: ' + emailValid)
        console.log('-----------------------------')
        submitBtn.disabled = true;
        successMessage.style.display = 'none';
    }
}

urlInput.addEventListener('input', checkForm);
phoneInput.addEventListener('input', checkForm);
last_name.addEventListener('input', checkForm);
first_name.addEventListener('input', checkForm);
surname.addEventListener('input', checkForm);
jobDescription.addEventListener('input', checkForm);
email.addEventListener('input', checkForm);