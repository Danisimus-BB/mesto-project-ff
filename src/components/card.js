import { cardDeletePromise, cardLikePromise, fetchResponse, config } from "./promises";

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
    cardDeletePromise(`${config.baseUrl}/cards/${item._id}`)
    .then((res) => {
        card.remove();
        return res;
    }).catch((err) => {
        console.log(err)
    });
}

// Функция лайка / снятия лайка
async function cardLikeFunction (button, counter, item, myId) {
    const cardsResponse = await fetchResponse(`${config.baseUrl}/cards`);
    const cardsData = await cardsResponse.json();    
    
    const findCard = () => {
        for (let card of Object.values(cardsData)) {
            if (card._id === item._id) {
                return card;
                }
            }
    };
    const currentCard = findCard();
    
    if (currentCard.likes.some(like => like._id === myId)) {        
        cardLikePromise(`${config.baseUrl}/cards/likes/${item._id}`, 'DELETE')
        .then((data) => {            
            button.classList.remove('card__like-button_is-active');
            counter.textContent = data.likes.length;
        }).catch((err) => {
            console.log(err);
        });
    } else {
        cardLikePromise(`${config.baseUrl}/cards/likes/${item._id}`, 'PUT')
        .then((data) => {
            button.classList.add('card__like-button_is-active');
            counter.textContent = data.likes.length;
        }).catch((err) => {
            console.log(err);
        });
    }
}

export {createCardElement, removeCardElement, cardLikeFunction};