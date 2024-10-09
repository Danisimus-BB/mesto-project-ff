// @todo: Темплейт карточки
const cardTеmplate = document.querySelector('#card-template').content; // То, что я буду вставлять в элемент .places_list
const popupBigImage = document.querySelector('.popup_type_image');

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

// Функция просмотра изображения в крупном размере
function openCardImage (cardTitle, cardImage) {
    popupBigImage.classList.add('popup_is-opened');
    const image = popupBigImage.querySelector('.popup__image');
    const text = popupBigImage.querySelector('.popup__caption');
    image.src = cardImage.src;
    image.alt = cardImage.alt;
    text.textContent = cardTitle.textContent;
}

export {createCardElement, removeCardElement, cardLikeFunction, openCardImage}