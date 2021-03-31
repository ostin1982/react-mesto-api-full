import React from "react";
import PopupWithForm from "./PopupWithForm";


function ConfirmDeletionPopup({ onDeleteCard, isOpen, onClose, card }) {

    function handleSubmit(event) {
    event.preventDefault();
    onDeleteCard(card);
    }
    

    return (
    <PopupWithForm
        title="Вы уверены?" 
        name="delete"
        button="Да" 
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
    </PopupWithForm>
    );
}

export default ConfirmDeletionPopup;