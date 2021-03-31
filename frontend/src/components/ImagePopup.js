function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup__photo-big-card ${card && "popup_is-open"}`}> 
            <div className="popup__photo-element">
                <img 
                className="popup__photo-big" 
                src={card?.link} 
                alt={card?.name}
                />                               
                <button 
                className="popup__close popup__photo-close"  
                type="button"
                aria-label="Закрыть"
                onClick={onClose}
                ></button>
                <p className="popup__photo-edit">{card?.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;