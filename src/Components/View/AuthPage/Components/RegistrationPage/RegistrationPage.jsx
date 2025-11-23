import { useState } from "react";
import "./RegistrationPage.scss";
import { FiArrowRight } from "react-icons/fi";
function Register({ onRegister, users }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const register = () => {
        if (users.some((u) => u.username === username))
            return alert("Этот логин уже занят");

        onRegister({
            id: Date.now(),
            username,
            password,
            email,
        });
    };

    return (
        <div className="auth__form">
            <input
                placeholder="Почта"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={register} className="auth__btn">
                Создать аккаунт <FiArrowRight />
            </button>
        </div>
    );
}

export default Register;
