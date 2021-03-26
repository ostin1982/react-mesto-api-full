import { useState } from 'react';

const Login = ({ handleLogin }) => {
    const [data, setData] = useState({
        password: '',
        email: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(data)
    }

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h2 className="register__title">Вход</h2>
            <input className="register__input" id="email" name="email" type="text" placeholder="Email" minLength="6" required value={data.email} onChange={handleChange} />
            <input className="register__input" id="password" name="password" type="password" placeholder="Пароль" minLength="6" value={data.password} required onChange={handleChange} />
            <button className="register__submit" type="submit">Войти</button>          
        </form>
    )
}

export default Login;