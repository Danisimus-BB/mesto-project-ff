import "./styles/index.css";
import { createCardElement, removeCardElement, cardLikeFunction } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { fetchResponse, profileEditPromise, cardAddPromise, avatarEditPromise } from "./components/promises.js";

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');// сам элемент .places__list 

// Выбор элементов
const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closeButtonList = document.querySelectorAll('.popup__close');
const formEditName = popupEdit.querySelector('.popup__form');
const formAddCard = popupNewCard.querySelector('.popup__form');
const formEditAvatar = popupAvatar.querySelector('.popup__form');
const nameInput = formEditName.querySelector('input[name="name"]');
const descriptionInput = formEditName.querySelector('input[name="description"]');
const avatarInput = formEditAvatar.querySelector('.popup__input');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const newCardName = popupNewCard.querySelector('.popup__input_type_card-name');
const newCardUrl = popupNewCard.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupBigImage = document.querySelector('.popup_type_image');
const cardsUrl = 'https://nomoreparties.co/v1/wff-cohort-24/cards';
const myUrl = 'https://nomoreparties.co/v1/wff-cohort-24/users/me';


const baseData = async function fetchData() {
    const profileResponse = await fetchResponse(myUrl);
    const cardsResponse = await fetchResponse(cardsUrl);
    const profileData = await profileResponse.json();
    const cardsData = await cardsResponse.json();
    const myId = profileData._id;

    try {
        profileTitle.textContent = profileData.name;
        profileDescription.textContent = profileData.about;    
        profileImage.style.backgroundImage = `url('${profileData.avatar}')`;

        cardsData.forEach((item) => {
        const card = createCardElement(removeCardElement, cardLikeFunction, openCardImage, item, myId);
        placesList.append(card);
    });    
    } catch (err) {
        console.log(err);
    }
}

baseData();

enableValidation({
    formSelector: '.popup_type_edit',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_active'
});
enableValidation({
    formSelector: '.popup_type_avatar',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_active'
});
enableValidation({
    formSelector: '.popup_type_new-card',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_active'
});

// Функция просмотра изображения в крупном размере
function openCardImage (cardTitle, cardImage) {
    openModal(popupBigImage);
    const image = popupBigImage.querySelector('.popup__image');
    const text = popupBigImage.querySelector('.popup__caption');
    image.src = cardImage.src;
    image.alt = cardImage.alt;
    text.textContent = cardTitle.textContent;
}

// Функция для открытия попапа "изменение профиля"
editButton.addEventListener('click', () => {
    // Заполнение полей текущими значениями
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(formEditName, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error-message_active'
    });
    openModal(popupEdit);    
    // enableValidation(formEditName);
});

// Функция для открытия попапа "Изменение аватара"
profileImage.addEventListener('click', () => {
    clearValidation(popupAvatar, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error-message_active'
    });
    openModal(popupAvatar);
    // enableValidation(popupAvatar);
})

// Функция для открытия попапа "Добавление карточки"
addCardButton.addEventListener('click', () => {
    clearValidation(formAddCard, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error-message_active'
    });
    openModal(popupAddCard);
    // enableValidation(formAddCard);
});

// Функция для закрытия попапа при нажатии на крестик
for (let button of closeButtonList) {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closeModal(popup);
    });
}

// Функция для закрытия попапа при нажатии на фон
for (let popup of popups) {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) { //проверка на то, содержит ли "кликнутый" элемент класс "popup". Если содержит, делаем это:
            closeModal(popup);
        }    
    });
}

// Функция для обработки отправки профиля
formEditName.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвратить перезагрузку страницы
    async function fetchData() {
        const submitButton = formEditName.querySelector('.popup__button');
        submitButton.textContent = 'Сохранение...';
    
        try {
            const response = await profileEditPromise(nameInput.value, descriptionInput.value);            
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            submitButton.textContent = 'Сохранить';
        }
    };

    fetchData()
    .then(() => {
        // Обновление информации профиля
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
        closeModal(popupEdit);
    }).catch((err) => {
        console.log(err);
    });
});

// Функция для обработки отправки аватара
formEditAvatar.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвратить перезагрузку страницы
    
    async function fetchData() {
        const submitButton = popupAvatar.querySelector('.popup__button');
        submitButton.textContent = 'Сохранение...';
    
        try {
            const response = await avatarEditPromise(avatarInput.value);
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            submitButton.textContent = 'Создать';
        }
    };

    fetchData()
    .then(() => {
        // Обновление информации аватара    
        profileImage.style.backgroundImage = `url('${avatarInput.value}')`;
        closeModal(popupAvatar);
    }).catch((err) => {
        console.log(err);
    });
});

// Функция для обработки отправки добавления карточки
formAddCard.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвратить перезагрузку страницы
    const newCardData = {
        name: newCardName.value,
        link: newCardUrl.value,
    };

    async function fetchData() {
        const profileResponse = await fetchResponse(myUrl);
        const profileData = await profileResponse.json();
        const myId = profileData._id;
        const submitButton = popupNewCard.querySelector('.popup__button');
        submitButton.textContent = 'Сохранение...';

        try {
            await cardAddPromise(...Object.values(newCardData));
        } catch (error) {
            console.error('Ошибка:', error);
            submitButton.textContent = 'Сохранить';
        } finally {
            const cardsResponse = await fetchResponse(cardsUrl);
            const cardsData = await cardsResponse.json();
            const card = createCardElement(removeCardElement, cardLikeFunction, openCardImage, cardsData[0], myId);
            placesList.prepend(card);
            submitButton.textContent = 'Сохранить';
        }
    };

    fetchData()
    .then(() => {
        closeModal(popupAddCard);
        newCardName.value = '';
        newCardUrl.value = '';
    }).catch((err) => {
        console.log(err);
    });

});