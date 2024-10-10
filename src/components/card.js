// @todo: Темплейт карточки
const cardTеmplate = document.querySelector('#card-template').content; // То, что я буду вставлять в элемент .places_list

// @todo: Функция создания карточки
function createCardElement(item, removeCardElement, cardLikeFunction, openCardImage) {
    const cardElement = cardTеmplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const buttonRemoval = cardElement.querySelector('.card__delete-button');
    const buttonCardLike = cardElement.querySelector('.card__like-button');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    buttonRemoval.addEventListener('click', () => {
        removeCardElement(cardElement);
    });

    buttonCardLike.addEventListener('click', () => {
        cardLikeFunction(buttonCardLike);
    });

    cardImage.addEventListener('click', () => {
        openCardImage (cardTitle, cardImage);
    })

    return cardElement;
}

// @todo: Функция удаления карточки
function removeCardElement(card) { 
    card.remove();
}

// Функция лайка / снятия лайка
function cardLikeFunction (button) {
    button.classList.toggle('card__like-button_is-active');
}

export {createCardElement, removeCardElement, cardLikeFunction};