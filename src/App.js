import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./main.scss";
import { FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import LoginPage from "./Components/LoginPage/LoginPage";
import RegistrationPage from "./Components/RegistrationPage/RegistrationPage";
import { fakeUsers } from "./fakeUsers";

import FixedDown from "./Components/FixedDown/FixedDown";
import QueueListPage from "./Components/QueueListPage/QueueListPage";
import AboutStationPage from "./Components/AboutStationPage/AboutStationPage";
import StationPanelPage from "./Components/StationPanelPage/StationPanelPage";
import TicketPage from "./Components/TicketPage/TicketPage";

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

function AnimatedRoutes({ queues, aboutStation }) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/ticket"
                    element={
                        <PageWrapper>
                            <TicketPage />
                        </PageWrapper>
                    }
                />

                <Route
                    path="/QueueList"
                    element={
                        <PageWrapper>
                            <QueueListPage queues={queues} />
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

    const handleRegister = (newUser) => {
        setUsers([...users, newUser]);
        setIsRegistering(false);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    // Если пользователь не авторизован — показываем регистрацию / вход
    if (!currentUser) {
        return (
            <div className="wrapper">
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

                                    <LoginPage
                                        onLogin={handleLogin}
                                        users={users}
                                    />

                                    <div
                                        onClick={() =>
                                            setIsRegistering(true)
                                        }
                                        className="isHaveAccaunt"
                                    >
                                        Создать аккаунт <FiArrowRight />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Данные
    const queues = [
        {
            queuesTitle: "Доступные стойки",
            queuesList: [
                { id: 1, title: "Карьерные консультации", inLine: true, isCompleted: false },
                { id: 2, title: "Турнир по поиску багов", inLine: false, isCompleted: false },
                { id: 3, title: "Разбор портфолио", inLine: false, isCompleted: false },
            ],
        },
        {
            queuesTitle: "Пройденные стойки",
            queuesList: [
                { id: 4, title: "Код-ревью в реальном времени", inLine: false, isCompleted: true },
            ],
        },
    ];

    const aboutStation = [
        {
            id: 1,
            title: "Карьерные консультации",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description: "Описание 1",
            isActive: true,
        },
        {
            id: 2,
            title: "Турнир по поиску багов на время",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description: "Описание 2",
            isActive: true,
        },
        {
            id: 3,
            title: "Разбор портфолио",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description: "Описание 3",
            isActive: true,
        },
        {
            id: 4,
            title: "Код-ревью в реальном времени",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description: "Описание 4",
            isActive: false,
        },
    ];

    return (
        <BrowserRouter>
            <div className="wrapper">
                <main>
                    <AnimatedRoutes
                        queues={queues}
                        aboutStation={aboutStation}
                    />
                </main>

                <FixedDown />
            </div>
        </BrowserRouter>
    );
}

export default App;
