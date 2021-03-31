import { useContext, useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";



function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");    


    useEffect(() => {
            setName(currentUser.name || '');
            setDescription(currentUser.about || '');
    }, [currentUser, isOpen]); 


    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    return (
        <PopupWithForm 
        title="Редактировать профиль" 
        name="edit" 
        button="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
            <section>
                <input className="popup__about popup__about_grey-line popup__about_name" name="name" type="text" value={name} onChange={handleChangeName} required placeholder="Имя" id="sign-in-name" minLength={2} maxLength={40} autoComplete="off" />                 
                <span className="" id="sign-in-name-error"></span>
                <input className="popup__about popup__about_grey-line popup__about_occupation_name" name="description" type="text" value={description} onChange={handleChangeDescription} required placeholder="О себе" id="sign-in-occupation" minLength={2} maxLength={200} autoComplete="off" />
                <span className="" id="sign-in-occupation-error"></span>                            
            </section>
        </PopupWithForm> 
    )
}

export default EditProfilePopup;