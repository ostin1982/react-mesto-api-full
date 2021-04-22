import { useContext } from "react";

import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
        className="profile__avatar"  
        onClick={onEditAvatar}>
          <img
          className="profile__avatar-img" 
          alt="Аватар"
          src={currentUser.avatar} />
        </div>
          <div className="profile__info">                   
            <div className="profile__edit">
              <h1 className="profile__name">{currentUser.name}</h1>
                <button 
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
                ></button>
            </div>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>               
          <button 
          className="profile__add-button" 
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
          ></button>
        </section>
        <section className="element">
        <ul className="elements">
            {cards.map((card) => {
              return (
                <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                />
              );
            })}
        </ul>
        </section>
    </main>
  );
}

export default Main;