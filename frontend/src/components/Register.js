import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ handleRegister }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });


    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({...data, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleRegister(data)
    };

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h2 className="register__title">Регистрация</h2>
            <input className="register__input" name="email" type="email" placeholder="Email" minLength="6" maxLength="20" required value={data.email} onChange={handleChange}  />
            <input className="register__input" name="password" type="password" placeholder="Пароль" minLength="6" maxLength="20" required value={data.password} onChange={handleChange}  />
            <button className="register__submit" type="submit">Зарегестрироваться</button>
            <p className="register__link">Уже зарегестрированы? <Link className="register__link register__link_hover" to="/sign-in">Войти</Link></p>
        </form>
    );
}

export default Register;