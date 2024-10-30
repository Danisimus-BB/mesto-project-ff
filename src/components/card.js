import { cardDeletePromise, cardLikePromise } from "./promises";

// @todo: Темплейт карточки
const cardTеmplate = document.querySelector('#card-template').content; // То, что я буду вставлять в элемент .places_list

// @todo: Функция создания карточки
function createCardElement(removeCardElement, cardLikeFunction, openCardImage, item, myId) {
    const cardElement = cardTеmplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const buttonRemoval = cardElement.querySelector('.card__delete-button');
    const buttonCardLike = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    cardLikeCounter.textContent = String(item.likes.length);
    
    if (myId === item.owner._id) {
        buttonRemoval.addEventListener('click', () => {
            removeCardElement(cardElement, item);
        });
    } else {
        cardElement.removeChild(buttonRemoval);
    }

    buttonCardLike.addEventListener('click', () => {
        cardLikeFunction(buttonCardLike, cardLikeCounter, item, myId);
    });

    cardImage.addEventListener('click', () => {
        openCardImage (cardTitle, cardImage);
    })

    return cardElement;
}

// @todo: Функция удаления карточки
function removeCardElement(card, item) { 
    card.remove();
    cardDeletePromise(`https://nomoreparties.co/v1/wff-cohort-24/cards/${item._id}`);
}

// Функция лайка / снятия лайка
function cardLikeFunction (button, counter, item) {
    button.classList.toggle('card__like-button_is-active');

    if (button.classList.contains('card__like-button_is-active')) {
        cardLikePromise(`https://nomoreparties.co/v1/wff-cohort-24/cards/likes/${item._id}`, 'PUT', counter);
    } else {
        cardLikePromise(`https://nomoreparties.co/v1/wff-cohort-24/cards/likes/${item._id}`, 'DELETE', counter);
    } 
}

export {createCardElement, removeCardElement, cardLikeFunction};