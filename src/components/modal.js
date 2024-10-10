function closeModalOnEsc(evt) {
    if (evt.key === "Escape") {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEsc);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEsc);
}

export { openModal, closeModal };