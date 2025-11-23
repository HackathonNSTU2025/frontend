import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./main.scss";
import { FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import LoginPage from "./Components/View/AuthPage/Components/LoginPage/LoginPage";
import RegistrationPage from "./Components/View/AuthPage/Components/RegistrationPage/RegistrationPage";
import { fakeUsers } from "./fakeUsers";

import FixedDown from "./Components/View/FixedDown/FixedDown";
import QueueListPage from "./Components/View/QueueListPage/QueueListPage";
import AboutStationPage from "./Components/View/AboutStationPage/AboutStationPage";
import StationPanelPage from "./Components/View/StationPanelPage/StationPanelPage";
import TicketPage from "./Components/View/TicketPage/TicketPage";

import MainPage from "./Components/Admin/MainPage/MainPage";

// Анимационная оболочка страниц
function PageWrapper({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

// Защищённый маршрут
function ProtectedRoute({ currentUser, AuthComponent, children }) {
    const location = useLocation();

    // Не авторизован и находится на /ticket → показываем авторизацию
    if (!currentUser && location.pathname === "/ticket") {
        return <AuthComponent />;
    }

    // Авторизован → показываем реальный компонент
    return children;
}

// Роуты
function AnimatedRoutes({
    queues,
    aboutStation,
    currentUser,
    AuthComponent,
    queuesUsersList,
    handleLogout,
}) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/ticket"
                    element={
                        <ProtectedRoute
                            currentUser={currentUser}
                            AuthComponent={AuthComponent}
                        >
                            <PageWrapper>
                                <TicketPage />
                            </PageWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/QueueList"
                    element={
                        <PageWrapper>
                            <QueueListPage
                                queues={queues}
                                onLogout={handleLogout}
                                currentUser={currentUser}
                            />
                        </PageWrapper>
                    }
                />

                <Route
                    path="/aboutStation"
                    element={
                        <PageWrapper>
                            <AboutStationPage aboutStation={aboutStation} />
                        </PageWrapper>
                    }
                />

                <Route
                    path="/StationPanel"
                    element={
                        <PageWrapper>
                            <StationPanelPage />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/admin/mainpage"
                    element={
                        <PageWrapper>
                            <MainPage />
                        </PageWrapper>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    const [users, setUsers] = useState(fakeUsers);
    const [currentUser, setCurrentUser] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = (user) => {
        setCurrentUser(user);
    };

    const handleRegister = async (newUser) => {
        try {
            // Ensure email, username, and password are present
            if (!newUser.email || !newUser.username || !newUser.password) {
                alert(
                    "Пожалуйста, заполните все поля: email, имя пользователя, пароль."
                );
                return;
            }
            const response = await fetch("http://cloudybooks.ru:8000/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password,
                }),
            });
            if (!response.ok) {
                let errorMsg = "Ошибка при регистрации пользователя";
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.detail) {
                        errorMsg += ": " + JSON.stringify(errorData.detail);
                    }
                } catch (parseErr) {
                    // Ignore JSON parse errors
                }
                console.error("Registration response:", response);
                throw new Error(errorMsg);
            }
            setUsers([...users, newUser]);
            setIsRegistering(false);
            alert("Регистрация успешна!");
        } catch (err) {
            console.error("Registration error:", err);
            alert(
                "Ошибка при регистрации: " +
                    (err.message === "Failed to fetch"
                        ? "Нет соединения с сервером. Проверьте доступность API и настройки CORS."
                        : err.message)
            );
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        // If you use a token, clear it here as well
        // setToken(null);
    };

    const Auth = () => (
        <div className="auth">
            <div className="container">
                <div className="auth__inner">
                    {isRegistering ? (
                        <>
                            <h2>Регистрация</h2>

                            <RegistrationPage
                                onRegister={handleRegister}
                                users={users}
                            />

                            <div
                                onClick={() => setIsRegistering(false)}
                                className="isHaveAccaunt"
                            >
                                Уже есть аккаунт <FiArrowRight />
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>Вход</h2>

                            <LoginPage onLogin={handleLogin} users={users} />

                            <div
                                onClick={() => setIsRegistering(true)}
                                className="isHaveAccaunt"
                            >
                                Создать аккаунт <FiArrowRight />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    const queues = [
        {
            queuesTitle: "Доступные стойки",
            queuesList: [
                {
                    id: 1,
                    title: "Карьерные консультации",
                    inLine: true,
                    isCompleted: false,
                },
                {
                    id: 2,
                    title: "Турнир по поиску багов",
                    inLine: false,
                    isCompleted: false,
                },
                {
                    id: 3,
                    title: "Разбор портфолио",
                    inLine: false,
                    isCompleted: false,
                },
            ],
        },
        {
            queuesTitle: "Пройденные стойки",
            queuesList: [
                {
                    id: 4,
                    title: "Код-ревью в реальном времени",
                    inLine: false,
                    isCompleted: true,
                },
            ],
        },
    ];

    const aboutStation = [
        {
            id: 1,
            title: "Карьерные консультации",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description:
                "Стоим, ждём всех, у кого есть вопросы про карьеру в IT! С чего начать? Как сменить профессию? Как вырасти до тимлида? Подходи — обсудим твой уникальный путь.",
            isActive: true,
        },
        {
            id: 2,
            title: "Турнир по поиску багов",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description:
                "Стань героем нашего кода! Мы спрятали в проекте коварные баги. Твоя задача — найти и обезвредить максимальное количество за отведенное время. Скорость и качество решают всё. Готов испытать свои силы?",
            isActive: true,
        },
        {
            id: 3,
            title: "Разбор портфолио",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description:
                "Твое портфолио — твоя суперсила. Покажи его нам! Senior-разработчики и HR дадут персональный фидбек: что цепляет, а что можно улучшить, чтобы прокачать твои шансы на работу мечты.",
            isActive: true,
        },
        {
            id: 4,
            title: "Код-ревью в реальном времени",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description:
                "Смотри и учись! Наши разработчики будут в прямом эфире разбирать код и давать советы по его улучшению. Это уникальный шанс заглянуть в мысли Senior'а и научиться писать не просто рабочий, а чистый и профессиональный код.",
            isActive: false,
        },
    ];
    const queuesUsersList = [
        {
            queuesId: 1,
            Users: [
                { id: 1, name: "Никита Петров", code: "K-13", time: "11:42" },
                { id: 2, name: "Иван Иванов", code: "K-14", time: "11:48" },
                { id: 3, name: "Пётр Петров", code: "K-15", time: "11:54" },
                { id: 4, name: "Сидор Сидоров", code: "K-16", time: "12:00" },
            ],
        },
        {
            queuesId: 2,
            Users: [
                { id: 1, name: "Никита Петров", code: "A-13", time: "11:42" },
                { id: 2, name: "Иван Иванов", code: "A-14", time: "11:42" },
                { id: 3, name: "Пётр Петров", code: "A-15", time: "11:54" },
                { id: 4, name: "Сидор Сидоров", code: "A-16", time: "12:00" },
            ],
        },
        {
            queuesId: 3,
            Users: [
                { id: 1, name: "Никита Петров", code: "B-13", time: "11:42" },
                { id: 2, name: "Иван Иванов", code: "B-14", time: "11:48" },
                { id: 3, name: "Пётр Петров", code: "B-15", time: "11:54" },
                { id: 4, name: "Сидор Сидоров", code: "B-16", time: "12:00" },
            ],
        },
        {
            queuesId: 4,
            Users: [
                { id: 1, name: "Никита Петров", code: "L-13", time: "11:42" },
                { id: 2, name: "Иван Иванов", code: "L-14", time: "11:48" },
                { id: 3, name: "Пётр Петров", code: "L-15", time: "11:54" },
                { id: 4, name: "Сидор Сидоров", code: "L-16", time: "12:00" },
            ],
        },
    ];
    return (
        <BrowserRouter>
            <div className="wrapper">
                <main>
                    <AnimatedRoutes
                        queues={queues}
                        aboutStation={aboutStation}
                        currentUser={currentUser}
                        AuthComponent={Auth}
                        queuesUsersList={queuesUsersList}
                        handleLogout={handleLogout}
                    />
                </main>

                <FixedDown />
            </div>
        </BrowserRouter>
    );
}

export default App;
