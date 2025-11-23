import "./TicketCode.scss";
import { useNavigate } from "react-router-dom";
import TimeRemaining from "../TimeRemaining/TimeRemaining";
import { FiArrowLeft } from "react-icons/fi";
let TicketCode = ({ eventName, ticketCode, peopleRemaining }) => {
    const navigate = useNavigate();
    return (
        <div className="TicketCode">
            <div className="container">
                <div className="TicketCode__inner">
                    <div className="TicketCode__header">
                        <div
                            className="TicketCode__back"
                            onClick={() => navigate("/QueueList")}
                        >
                            <FiArrowLeft size={36} />
                        </div>
                        <div className="TicketCode__event-title">
                            {eventName}
                        </div>
                    </div>
                    <div className="TicketCode__content">
                        <div className="TicketCode__content__inner">
                            <div className="TicketCode__text">Ваш талон:</div>
                            <div className="TicketCode__num">{ticketCode}</div>
                            <div className="TicketCode__PeopleRemaining">
                                Перед вами: {peopleRemaining} человек
                            </div>
                        </div>
                    </div>
                    <TimeRemaining timeRemaining={35} />
                </div>
            </div>
        </div>
    );
};
export default TicketCode;
