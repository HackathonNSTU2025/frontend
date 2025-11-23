import "./TicketWidget.scss";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
let TicketWidget = ({ ticketCode, timeRemaining }) => {
    let TicketWidget = {
        TicketCode: "K-12",
        WaitingTime: "35",
    };
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/ticket`);
    };
    return (
        <div className="TicketWidget" onClick={handleClick}>
            <div className="TicketWidget__inner">
                <div className="TicketWidget__icon">
                    <FiClock size={24} />
                </div>
                <div className="TicketWidget__content">
                    <div className="TicketWidget__ticket">
                        <div className="TicketWidget__ticketText">
                            Ваш талон:{" "}
                        </div>
                        <div className="TicketWidget__ticketCode">
                            {TicketWidget.TicketCode}
                        </div>
                    </div>
                    <div className="Ticketwidget__time">
                        <div className="TicketWidget__timeText">
                            Время ожидания:{" "}
                        </div>
                        <div className="TicketWidget__timeNumber">
                            ~ {TicketWidget.WaitingTime} мин
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TicketWidget;
