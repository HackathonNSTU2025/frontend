import "./AboutStation.scss";
import { useLocation } from "react-router-dom";

function AboutStation(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search); // получаем query-параметры
    const id = params.get("id"); // id как строка

    // Находим нужную очередь по id
    const queueItem = props.queues.find((q) => q.id === Number(id));

    if (!queueItem) {
        return <div>Стойка не найдена</div>;
    }

    return (
        <div className="AboutStation">
            <div className="AboutStation__image">
                <img src={queueItem.image} alt={queueItem.title} />
            </div>
            <div className="AboutStation__name">{queueItem.title}</div>
            <div className="AboutStation__decription">
                {queueItem.description}
            </div>
        </div>
    );
}
export default AboutStation;
