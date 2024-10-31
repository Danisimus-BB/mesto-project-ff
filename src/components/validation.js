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

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}; // util: Включаем сообщение об ошибке если валидация не прошла.

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
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

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}; // механика включения / выключения сообщения об ошибке если поле валидно / инвалидно

const setEventListeners = (formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass) => {
    
    const formElement = document.querySelector(formSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            if (inputElement.name !== 'link') {
                validateRegexInput(inputElement);
            }
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement);
        });
    });
}; // Для всех инпутов формы запускаем показ / скрытие сообщение об ошибке и переключение кнопки submit

const enableValidation = (validationConfig) => {
    setEventListeners(validationConfig.formSelector, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.inputErrorClass, validationConfig.errorClass);
    
    const form = document.querySelector(validationConfig.formSelector);
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    
}; // На вход даем объект с данными для отключения работы кнопки submit по умолчанию

const clearValidation = (form, validationConfig) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
    buttonElement.setAttribute('disabled', '');
    
    inputList.forEach((inputElement) => {
        inputElement.setCustomValidity('');
        hideInputError(form, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    });
}

export { enableValidation, clearValidation };