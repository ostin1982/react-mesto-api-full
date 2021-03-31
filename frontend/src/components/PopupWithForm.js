import React from 'react'

function PopupWithForm({ name, title, button, children, isOpen, onClose, onSubmit }) {
    return(
        <div className={isOpen ? `popup popup__input_${name} popup_is-open` : `popup popup__input_${name}`}>
            <div className="popup__container">
                <h2 className="popup__edit">{title}</h2>
                <form className={`popup__input popup__input_${name} form`} method="POST" name={`${name}`} onSubmit={onSubmit} noValidate>
                    <div>{children}</div>
                <input className="popup__submit" type="submit" value={button} />
                </form>
                <button className="popup__close" type="button" onClick={onClose}/>
            </div>
        </div>
    )
}

export default PopupWithForm