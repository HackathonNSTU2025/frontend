import "./NotificationWidget.scss";
import { FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";

let NotificationWidget = ({ queueTime }) => {
    const [permission, setPermission] = useState(Notification.permission);

    let timerId = null; // хранение id таймера

    const clearExistingTimer = () => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
    };

    const scheduleNotification = (queueTime) => {
        clearExistingTimer();

        if (!queueTime) return;
        if (permission !== "granted") return;

        // точное время (например: "2025-02-01T14:00:00")
        const target = new Date(queueTime);

        // минус 5 минут
        const notifyAt = new Date(target.getTime() - 5 * 60 * 1000);
        const now = new Date();

        const diff = notifyAt - now;

        console.log("[Таймер]: уведомление через (сек):", diff / 1000);

        if (diff <= 0) return;

        timerId = setTimeout(() => {
            new Notification("Скоро ваша очередь!", {
                body: "Осталось 5 минут!",
            });
        }, diff);
    };

    const askPermission = async () => {
        if (!("Notification" in window)) {
            alert("Ваш браузер не поддерживает уведомления");
            return;
        }

        const result = await Notification.requestPermission();
        setPermission(result);

        if (result === "granted") {
            localStorage.setItem("notificationsAllowed", "true");
            scheduleNotification(queueTime);
        }
    };

    // если пользователь когда-то разрешил → ставим таймер автоматически
    useEffect(() => {
        if (permission === "granted") {
            const allowed = localStorage.getItem("notificationsAllowed");
            if (allowed === "true") scheduleNotification(queueTime);
        }
    }, [permission, queueTime]);

    return (
        <div className="NotificationWidget">
            <div className="NotificationWidget__inner">
                <div className="NotificationWidget__icon">
                    <FiBell size={36} />
                </div>

                <div className="NotificationWidget__content">
                    {permission === "granted" && (
                        <div className="NotificationWidget__text">
                            Вы получите уведомление, когда очередь дойдёт до
                            вас.
                        </div>
                    )}

                    {permission === "denied" && (
                        <div className="NotificationWidget__text">
                            Вы отключили уведомления для сайта. Включите их в
                            настройках браузера.
                        </div>
                    )}

                    {permission === "default" && (
                        <>
                            <div className="NotificationWidget__text">
                                Хотите получить уведомление, когда очередь
                                дойдёт до вас?
                            </div>

                            <div className="NotificationWidget__buttonsRow">
                                <div className="NotificationWidget__buttonNo">
                                    Нет
                                </div>

                                <div
                                    className="NotificationWidget__buttonYes"
                                    onClick={askPermission}
                                >
                                    Да, конечно!
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationWidget;
