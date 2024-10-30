function validateRegexInput(inputElement) {
    const regex = /^[a-zA-Zа-яА-Я- ]*$/;
    if (!regex.test(inputElement.value)) {
        inputElement.setCustomValidity(inputElement.dataset.error);
        inputElement.setAttribute('validity', 'invalid');
    } else {
        inputElement.setCustomValidity(''); 
        inputElement.setAttribute('validity', 'valid');
    }
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error-message_active');
}; // util: Включаем сообщение об ошибке если валидация не прошла.

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error-message_active');
    errorElement.textContent = '';
}; // util: Прячем сообщение об ошибке, если валидация прошла

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; // util: Функция проверки, есть ли в списке инпутов невалидный

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        // buttonElement.classList.add('popup__button_inactive');
        buttonElement.setAttribute('disabled', '');
    } else { 
        // buttonElement.classList.remove('popup__button_inactive');
        buttonElement.removeAttribute('disabled', '');
    }
} // util: Функция переключения кнопки в активный / неактивный режим, при проверке валидности / невалидности

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
}; // механика включения / выключения сообщения об ошибке если поле валидно / инвалидно

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            if (inputElement.name !== 'link') {
                validateRegexInput(inputElement);
            }
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}; // Для всех инпутов формы запускаем показ / скрытие сообщение об ошибке и переключение кнопки submit

const enableValidation = (form) => {
    setEventListeners(form);
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
}; // На вход даем объект с данными для отключения работы кнопки submit по умолчанию

const clearValidation = (form) => {   
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const buttonElement = form.querySelector('.popup__button');
    buttonElement.setAttribute('disabled', '');
    
    inputList.forEach((inputElement) => {
        inputElement.setCustomValidity('');
        hideInputError(form, inputElement);
    });
}

export { enableValidation, clearValidation };