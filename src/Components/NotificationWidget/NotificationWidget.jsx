import "./NotificationWidget.scss";
import { FiBell } from "react-icons/fi";

let NotificationWidget = ({ isNotificationsAvailable }) => {
    return (
        <div className="NotificationWidget">
            <div className="NotificationWidget__inner">
                <div className="NotificationWidget__icon">
                    <FiBell size={36} />
                </div>

                <div className="NotificationWidget__content">
                    {isNotificationsAvailable ? (
                        <div className="NotificationWidget__text">
                            Вы получите уведомление, когда очередь дойдёт до
                            Вас.
                        </div>
                    ) : (
                        <div className="NotificationWidget__text">
                            Хотите получить уведомление, когда очередь дойдёт до
                            Вас?
                        </div>
                    )}

                    {isNotificationsAvailable ? null : (
                        <div className="NotificationWidget__buttonsRow">
                            <div className="NotificationWidget__buttonNo">
                                Нет
                            </div>
                            <div className="NotificationWidget__buttonYes">
                                Да, конечно!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default NotificationWidget;
