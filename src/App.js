import { useState } from "react";

import "./main.scss";

import RegistrationCode from "./Components/RegistrationCode/RegistrationCode";
import StationName from "./Components/StationName/StationName";
import QueueList from "./Components/QueueList/QueueList";
import TimeToArrive from "./Components/TimeToArrive/TimeToArrive";
import TimeRemaining from "./Components/TimeRemaining/TimeRemaining";
import GetInline from "./Components/GetInline/GetInline";

import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

import { fakeUsers } from "./fakeUsers";

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

    return (
        <div className="wrapper">
            <main>
                <RegistrationCode
                    registrationCode="К-12"
                    peopleRemaining={7}
                    eventName={"Мир ИТ Изнутри"}
                />
                <TimeRemaining timeRemaining={35} />
                <TimeToArrive timeToArrive={"10:47"} />
                <StationName stationName={"Карьерные консультации"} />
                <QueueList />
                <GetInline />
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
