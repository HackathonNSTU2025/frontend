import "./StationPanelPage.scss";
import StationPanelName from "./Components/StationPanelName/StationPanelName";
import StationPanelCurrentTicket from "./Components/StationPanelCurrentTicket/StationPanelCurrentTicket";
import StationPanelQueueItem from "./Components/StationPanelQueueItem/StationPanelQueueItem";
import StationPanelAboutQueue from "./Components/StationPanelAboutQueue/StationPanelAboutQueue";
import StationPanelQR from "./Components/StationPanelQR/StationPanelQR";

import { useLocation } from "react-router-dom";

function StationPanelPage(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    let id = params.get("id");
    const queuesUsersList = props.queuesUsersList || [];
    const stationsList = props.stationsList || [];

    const currentStation = stationsList.find(
        (station) => station.id === Number(id)
    );
    const currentQueue = queuesUsersList.find(
        (queue) => queue.queuesId === Number(id)
    );

    const currentTicket = currentQueue?.Users?.[0];
    const nextTickets = currentQueue?.Users?.slice(1, 5) || [];

    return (
        <div className="StationPanelPage">
            <div className="StationPanelPage__left">
                <div className="StationPanelPage__StationName">
                    <StationPanelName name="Карьерные консультации" />
                </div>
                <div className="StationPanelPage__QRCode">
                    <StationPanelQR url="https://example.com" />
                </div>
                <div></div>
            </div>
            <div className="StationPanelPage__right">
                <div className="StationPanelPage__CurrentTicket">
                    <StationPanelCurrentTicket ticketCode="К-12" />
                    <div className="StationPanelPage__QueueTextHead">
                        Следующие в очереди
                    </div>
                    <div className="StationPanelPage__QueueList">
                        <StationPanelQueueItem
                            ticketCode="К-14"
                            timeToArrive="11:42"
                        />
                        <StationPanelQueueItem
                            ticketCode="К-13"
                            timeToArrive="11:48"
                        />
                        <StationPanelQueueItem
                            ticketCode="К-15"
                            timeToArrive="11:54"
                        />
                        <StationPanelQueueItem
                            ticketCode="К-16"
                            timeToArrive="12:00"
                        />
                    </div>
                    <div className="StationPanelPage__AboutQueue">
                        <StationPanelAboutQueue
                            peopleInQueue={7}
                            averageTime={6}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default StationPanelPage;
