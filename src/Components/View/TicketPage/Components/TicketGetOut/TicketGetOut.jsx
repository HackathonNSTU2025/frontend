import "./TicketGetOut.scss";
import { useNavigate, useLocation } from "react-router-dom";

let TicketGetOut = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/queuelist`);
    };
    return (
        <div className="TicketGetOut">
            <div className="container">
                <div className="TicketGetOut__inner">
                    <button className="getOutOfLine" onClick={handleClick}>
                        <b>Выйти из очереди</b>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TicketGetOut;
