import "./StationPanelPage.scss";
import StationPanelName from "../StationPanelName/StationPanelName";
import StationPanelCurrentTicket from "../StationPanelCurrentTicket/StationPanelCurrentTicket";

function StationPanelPage(props) {
    return (
        <div className="StationPanelPage">
            <div className="StationPanelPage__left">
                <div className="StationPanelPage__StationName">
                    <StationPanelName name="Карьерные консультации" />
                </div>
            </div>
            <div className="StationPanelPage__right">
                <div className="StationPanelPage__CurrentTicket">
                    <StationPanelCurrentTicket ticketCode="К-12" />
                </div>
            </div>
        </div>
    );
}
export default StationPanelPage;
