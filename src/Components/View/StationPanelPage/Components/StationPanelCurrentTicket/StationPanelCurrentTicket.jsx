import "./StationPanelCurrentTicket.scss";

function StationPanelCurrentTicket(props) {
    return (
        <div className="StationPanelCurrentTicket">
            <div className="StationPanelCurrentTicket__text">Текущий талон</div>
            <div className="StationPanelCurrentTicket__code">
                {props.ticketCode}
            </div>
        </div>
    );
}
export default StationPanelCurrentTicket;
