const toggleCheckbox = document.getElementById('toggleStyleOptions');
const styleOptionsContainer = document.getElementById('styleOptionsContainer');

function createStyleOptions()
{
    const form = document.createElement('div');
    form.className = 'style-form';

    const fontSizeLabel = document.createElement('label');
    fontSizeLabel.textContent = 'Размер шрифта (например, 16px):';
    const fontSizeInput = document.createElement('input');
    fontSizeInput.type = 'text';
    fontSizeInput.placeholder = 'Введите размер шрифта';

    const textColorLabel = document.createElement('label');
    textColorLabel.textContent = 'Цвет текста:';
    const textColorInput = document.createElement('input');
    textColorInput.type = 'color';

    const bgColorLabel = document.createElement('label');
    bgColorLabel.textContent = 'Цвет фона страницы:';
    const bgColorInput = document.createElement('input');
    bgColorInput.type = 'color';

    form.appendChild(fontSizeLabel);
    form.appendChild(fontSizeInput);
    form.appendChild(textColorLabel);
    form.appendChild(textColorInput);
    form.appendChild(bgColorLabel);
    form.appendChild(bgColorInput);

    fontSizeInput.addEventListener('input', function () {
        document.body.style.fontSize = fontSizeInput.value;
    });

    textColorInput.addEventListener('input', function () {
        document.body.style.color = textColorInput.value;
    });

    bgColorInput.addEventListener('input', function () {
        document.body.style.backgroundColor = bgColorInput.value;
    });

    return form;
}

toggleCheckbox.addEventListener('change', function () {
    if (toggleCheckbox.checked)
    {
        const form = createStyleOptions();
        styleOptionsContainer.appendChild(form);
    }
    else
    {
        styleOptionsContainer.innerHTML = '';
    }
});