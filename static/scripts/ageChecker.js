const btn = document.getElementById('ageBtn');

function checkAge()
{
    const birthDateInput = document.getElementById("birthDate").value;
    
    if (!birthDateInput)
    {
        alert("Пожалуйста, введите дату рождения.");
        return;
    }
    
    const birthDate = new Date(birthDateInput);
    const today = new Date();
    
    console.log(birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    console.log(age)
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }

    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const dayOfWeek = daysOfWeek[birthDate.getDay()];

    const message = document.getElementById("message");
    
    if (age >= 18)
    {
        message.innerHTML = `Ваш возраст: ${age} лет. Вы родились в ${dayOfWeek}. Добро пожаловать!`;
    }
    else
    {
        message.innerHTML = `Ваш возраст: ${age} лет. Вы родились в ${dayOfWeek}. Пожалуйста, получите разрешение от родителей для использования сайта.`;
        alert("Вы несовершеннолетний. Необходимо разрешение родителей для использования сайта.");
    }
}

btn.addEventListener('click', () => {
    checkAge();
});