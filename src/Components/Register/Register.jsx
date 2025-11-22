import { useState } from "react";

function Register({ onRegister, users }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        if (users.some((u) => u.username === username))
            return alert("Этот логин уже занят");

        onRegister({
            id: Date.now(),
            username,
            password,
        });
    };

    return (
        <div className="login-box">
            <h2>Регистрация</h2>

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

            <button onClick={register}>Создать аккаунт</button>
        </div>
    );
}

export default Register;
