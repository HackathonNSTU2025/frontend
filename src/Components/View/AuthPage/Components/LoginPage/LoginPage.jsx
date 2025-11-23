import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import "./LoginPage.scss";

function Login({ onLogin, users }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        if (!email || !password) {
            setError("Введите email и пароль");
            return;
        }
        try {
            const response = await fetch(
                "http://cloudybooks.ru:8000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            if (!response.ok) {
                let errorMsg = "Ошибка авторизации";
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.detail) {
                        errorMsg += ": " + JSON.stringify(errorData.detail);
                    }
                } catch (parseErr) {}
                throw new Error(errorMsg);
            }
            const data = await response.json();
            onLogin({ email, token: data.access_token });
        } catch (err) {
            setError(
                err.message === "Failed to fetch"
                    ? "Нет соединения с сервером. Проверьте доступность API и настройки CORS."
                    : err.message
            );
        }
    };

    return (
        <div className="auth__form">
            <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="auth__btn">
                Войти <FiArrowRight />
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Login;
