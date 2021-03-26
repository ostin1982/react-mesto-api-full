import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletionPopup from "./ConfirmDeletionPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../index.css";

const App = () => { 
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(); 
  const [deletedCard, setDeletedCard] = useState({}); 

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] = useState(false);  

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);  
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState(false);

  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfoAbout()])
      .then(([result, user]) => {
        setCards(result);
        setCurrentUser(user);
      })
      .catch(error => console.log(`Ошибка при попытке загрузить данные пользователя и карточки: ${error}`));
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  const handleDeleteClick = (card) => {
    setIsConfirmDeletionPopupOpen(true);
    setDeletedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletionPopupOpen(false);
    setSelectedCard();
    setIsInfoTooltipOpen(false);
  };


  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(error => console.error(error));
} 


  const handleDeleteCard = (card) => {
    api.deleteCard(card).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
      closeAllPopups();
    })
    .catch(error => console.error(error));
    }


  const handleUpdateUser = (userData) => {
    api.changeInfo(userData)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch(error => console.error(error))
  }

  const handleUpdateAvatar = (imgSrc) => {
    api.changeUserAvatar(imgSrc)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch(error => console.error(error))
  }

  const handleAddPlaceSubmit = (card) => {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  const handleRegister = ({email, password}) => {  
    return auth.register({email, password})
    .then(res => {
      if (res) {
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipStatus(true);
        history.push('/sign-in');
        }
      })
    .catch(() => {
      setIsInfoTooltipOpen(true);
      setIsInfoTooltipStatus(false);
    })
  }
  
  const handleLogin = ({email, password}) => {
    return auth.login({email, password})
    .then(res => {
      if (res.token)  {
        localStorage.setItem('jwt', res.token);
        return res;
      } else {
        return;
      }
    })
    .then(data => {
      if (data.token) {
        setLoggedIn(true)
        setEmail(email)
        history.push('/')
      }
    })
    .catch(() => {
      setIsInfoTooltipOpen(true)
      setIsInfoTooltipStatus(false)
    })
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail(email);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            //добавил строку ниже, теперь при перезагрузке страницы остается на месте, но ругается eslint
            history.push('/');
            setEmail(res.data.email);
          }
        })
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">

      <Header 
      email={email} 
      loggedOut={handleLogout} 
      loggedIn={loggedIn} 
      />

      <Switch>
          <ProtectedRoute
          exact path='/'
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
          closeAllPopups={closeAllPopups}
        />

        <Route path='/sign-in'>
          <Login handleLogin={handleLogin} setEmail={setEmail} />
        </Route>
        <Route path='/sign-up'>
          <Register handleRegister={handleRegister} />
        </Route>
        <Route>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
        </Route>
      </Switch>

        <Footer />

        <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups} 
        onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmDeletionPopup 
        isOpen={isConfirmDeletionPopupOpen} 
        onClose={closeAllPopups} 
        onDeleteCard={handleDeleteCard}
        card={deletedCard}
        />
        
        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} 
        {...selectedCard} 
        />

        <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isInfoTooltipStatus={isInfoTooltipStatus}
        />

      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;