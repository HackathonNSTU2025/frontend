import "./StationPanelAboutQueue.scss";

function StationPanelAboutQueue(props) {
    return (
        <div className="StationPanelAboutQueue">
            <div>Талонов в очереди: {props.peopleInQueue}</div>
            <div>Среднее время ожидания: {props.averageTime} мин</div>
        </div>
    );
}
export default StationPanelAboutQueue;
