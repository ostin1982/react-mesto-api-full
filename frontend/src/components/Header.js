import { Route, Link } from 'react-router-dom';

import logo from "../images/logo.svg";

const Header = ({ email, loggedOut }) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта. Mesto Russian" />
      {
        <nav className='header__info'>
          <Route path='/sign-up'>
              <Link className='header__link' to='/sign-in'>Войти</Link>
          </Route>
          <Route path='/sign-in'>
              <Link className='header__link' to='/sign-up'>Регистрация</Link>
          </Route>
          <Route exact path='/'>
              <div className='header__info'>
                  <p className='header__link header__link_nothover'>{email}</p>
                  <Link className='header__link header__link_weight' onClick={loggedOut} to='/sign-in'>Выйти</Link>
              </div>
          </Route>
        </nav>
      }
    </header>
  );
}

export default Header;