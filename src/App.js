import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.scss";

import QueueListPage from "./Components/QueueListPage/QueueListPage";
import GetInline from "./Components/GetInline/GetInline";
import TicketPage from "./Components/TicketPage/TicketPage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

import { fakeUsers } from "./fakeUsers";
import Footer from "./Components/Footer/Footer";
import FixedDown from "./Components/FixedDown/FixedDown";
import AboutStationPage from "./Components/AboutStationPage/AboutStationPage";

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

    // Если пользователь не авторизован, показываем вход или регистрацию
    // if (!currentUser) {
    //     return (
    //         <div className="wrapper">
    //             {isRegistering ? (
    //                 <>
    //                     <Register onRegister={handleRegister} users={users} />
    //                     <button onClick={() => setIsRegistering(false)}>
    //                         Уже есть аккаунт
    //                     </button>
    //                 </>
    //             ) : (
    //                 <>
    //                     <Login onLogin={handleLogin} users={users} />
    //                     <button onClick={() => setIsRegistering(true)}>
    //                         Создать аккаунт
    //                     </button>
    //                 </>
    //             )}
    //         </div>
    //     );
    // }
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
    let aboutStation = [
        {
            id: 1,
            title: "Карьерные консультации",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description: "Описание 1",
        },
        {
            id: 2,
            title: "Турнир по поиску багов на время",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description: "Описание 2",
        },
        {
            id: 3,
            title: "Разбор портфолио",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description: "Описание 3",
        },
        {
            id: 4,
            title: "Код-ревью в реальном времени",
            image: "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg",
            description: "Описание 4",
        },
    ];
    return (
        <BrowserRouter>
            <div className="wrapper">
                <main>
                    <Routes>
                        <Route path="/ticket" element={<TicketPage />} />
                        <Route
                            path="/QueueList"
                            element={<QueueListPage queues={queues} />}
                        />
                        <Route
                            path="/aboutStation"
                            element={
                                <AboutStationPage aboutStation={aboutStation} />
                            }
                        />
                    </Routes>
                </main>
                {/* <Footer /> */}
                <FixedDown />
            </div>
        </BrowserRouter>
    );
}

export default App;
