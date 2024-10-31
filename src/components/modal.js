const openedPopup = document.querySelector('.popup_is-opened');

function closeModalOnEsc(evt) {
    if (evt.key === "Escape") {
        closeModal(openedPopup);
    }
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEsc);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEsc);
    const inputs = popup.querySelectorAll('input');
    for (let input of inputs) {
        input.value = '';
    }
}

export { openModal, closeModal };