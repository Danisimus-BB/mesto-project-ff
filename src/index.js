import "./styles/index.css";
import { initialCards } from "./components/cards.js";
import {createCardElement, removeCardElement, cardLikeFunction} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
// import { createCardElement, removeCardElement, cardLikeFunction, openCardImage} from "./card.js";
// import { closeModal, openModal } from "./modal.js";

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');// сам элемент .places__list 

// Выбор элементов
const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closeButtonList = document.querySelectorAll('.popup__close');
const formEditName = popupEdit.querySelector('.popup__form');
const formAddCard = popupNewCard.querySelector('.popup__form');
const nameInput = formEditName.querySelector('input[name="name"]');
const descriptionInput = formEditName.querySelector('input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardName = popupNewCard.querySelector('.popup__input_type_card-name');
const newCardUrl = popupNewCard.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupBigImage = document.querySelector('.popup_type_image');



// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const card = createCardElement(item, removeCardElement, cardLikeFunction, openCardImage);
    placesList.append(card);
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
    openModal(popupEdit);
});

// Функция для открытия попапа "добавление карточки"
addCardButton.addEventListener('click', () => {
    openModal(popupAddCard);
});


// Функция для закрытия попапа при нажатии на крестик
for (let button of closeButtonList) {
    button.addEventListener('click', () => {
        for (let item of popups) {
            closeModal(item);
        }
    });
}

// Функция для закрытия попапа при нажатии на фон
for (let popup of popups) {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) { //проверка на то, содержит ли "кликнутый" элемент класс "popup__content". Если НЕ содержит, делаем это:
            closeModal(popup);
        }    
    });
}


// Функция для обработки отправки формы
formEditName.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвратить перезагрузку страницы
    // Обновление информации профиля
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(popupEdit);
});

// Функция закрытия попапа с добавлением карточки в список
formAddCard.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвратить перезагрузку страницы
    const newCardData = {
        name: newCardName.value,
        link: newCardUrl.value
    };
    const card = createCardElement(newCardData, removeCardElement, cardLikeFunction, openCardImage);
    placesList.prepend(card);
    closeModal(popupAddCard);
    newCardName.value = '';
    newCardUrl.value = '';
});