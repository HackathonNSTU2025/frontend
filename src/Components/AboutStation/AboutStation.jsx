import { useNavigate } from "react-router-dom";
import "./AboutStation.scss";
import { useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

function AboutStation(props) {
    const navigate = useNavigate();
    const location = useLocation();
    // 1) Попробовать стандартный query-параметр ?id=
    const params = new URLSearchParams(location.search);
    let id = params.get("id");

    // 2) Фоллбек: если пришёл нестандартный URL вида /aboutStation&id=2
    if (!id) {
        const match = location.pathname.match(/&id=(\d+)$/); // ищем в пути
        if (match) id = match[1];
    }

    // Получаем массив записей — имя пропа из App: aboutStation
    const list = props.aboutStation || props.queues || [];

    const queueItem = list.find((q) => q.id === Number(id));

    if (!queueItem) {
        return <div className="AboutStation">Стойка не найдена</div>;
    }

    return (
        <div className="AboutStation">
            <div className="container">
                <div className="AboutStation__inner">
                    <div className="AboutStation__header">
                        <div
                            className="AboutStation__back"
                            onClick={() => navigate("/QueueList")}
                        >
                            <FiArrowLeft size={36} />
                        </div>
                        <div className="AboutStation__event-title">
                            Мир ИТ изнутри
                        </div>
                    </div>
                    <div
                        className={`AboutStation__card${
                            queueItem.isActive
                                ? ""
                                : " AboutStation__card--disabled"
                        }`}
                    >
                        <div className="AboutStation__image">
                            <img src={queueItem.image} alt={queueItem.title} />
                        </div>
                        <div className="AboutStation__content">
                            <div className="AboutStation__name">
                                {queueItem.title}
                            </div>
                            <div className="AboutStation__decription">
                                {queueItem.description}
                            </div>
                        </div>
                    </div>
                    {queueItem.isActive ? (
                        <button className="getInLine">
                            <b>Встать в очередь</b>
                            <div className="getInLine__counter">
                                В очереди: {7} человек
                            </div>
                        </button>
                    ) : (
                        <div className="getInLine getInLine--disabled">
                            <b>Стойка закрыта</b>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default AboutStation;
