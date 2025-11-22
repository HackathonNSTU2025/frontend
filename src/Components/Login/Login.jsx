import { useState } from "react";

function Login({ onLogin, users }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            onLogin(user);
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className="login-box">
            <h2>Вход</h2>

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

            <button onClick={handleLogin}>Войти</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Login;
