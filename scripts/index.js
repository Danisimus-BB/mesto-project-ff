// @todo: Темплейт карточки
const cardTеmplate = document.querySelector('#card-template').content; // То, что я буду вставлять в элемент .places_list

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');// сам элемент .places__list 

// @todo: Функция создания карточки
function createCardElement(item, removeCardElement) {
    const cardElement = cardTеmplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const buttonRemoval = cardElement.querySelector('.card__delete-button');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    buttonRemoval.addEventListener('click', function () {
        removeCardElement(cardElement);
    });

    return cardElement;
}

// @todo: Функция удаления карточки
 function removeCardElement(card) { 
    card.remove();
 }
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const card = createCardElement(item, removeCardElement);
    placesList.append(card);
   
}); 