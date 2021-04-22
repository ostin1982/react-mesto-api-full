import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
    const placeRef = useRef();
    const urlRef = useRef();


    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            name: placeRef.current.value,
            link: urlRef.current.value
        });
    } 


    return (
        <PopupWithForm 
        name="add" 
        title="Новое место"
        button="Сохранить"
        isOpen={isOpen}
        onClose={onClose}       
        onSubmit={handleSubmit}>
            <section>                
                <input ref={placeRef} className="popup__about popup__about_grey-line popup__about_photo-card" id="sign-in-photo-card-name" type="text" placeholder="Название"  name="name" required minLength={2} maxLength={30} autoComplete="off" />
                <span className="" id="sign-in-photo-card-name-error"></span>  
                <input ref={urlRef} className="popup__about popup__about_grey-line popup__about_occupation_photo-card" id="sign-in-photo-card-occupation" type="url" placeholder="Ссылка на картинку"  name="link" required autoComplete="off" />
                <span className="" id="sign-in-photo-card-occupation-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default AddPlacePopup;