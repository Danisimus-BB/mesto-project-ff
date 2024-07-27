// @todo: Темплейт карточки
let cardTEmplate = document.querySelector('#card-template').content; // То, что я буду вставлять в элемент .places_list

// @todo: DOM узлы
let placesList = document.querySelector('.places__list');// сам элемент .places__list 

// @todo: Функция создания карточки
function cardElementcreation(item, cardElementRemoval){ 
    let cardElement = cardTEmplate.querySelector('.places__item').cloneNode(true);// Скопировали
    
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    let ButtonRemoval = cardElement.querySelector('.card__delete-button');
    ButtonRemoval.addEventListener('click', function () {
        cardElementRemoval(cardElement);
        });
    return cardElement;
}    

// @todo: Функция удаления карточки
 function cardElementRemoval(card) { 
    card.remove();
 }
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    let card = cardElementcreation(item, cardElementRemoval);
    placesList.append(card);
   
}); 