import "./StationPanelQueueItem.scss";

function StationPanelQueueItem(props) {
    return (
        <div className="StationPanelQueueItem">
            <div>{props.ticketCode}</div>
            <div>{props.timeToArrive}</div>
        </div>
    );
}
export default StationPanelQueueItem;
