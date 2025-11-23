import TicketCode from "./Components/TicketCode/TicketCode";
import TimeToArrive from "./Components/TimeToArrive/TimeToArrive";
import StationName from "./Components/StationName/StationName";
import TicketGetOut from "./Components/TicketGetOut/TicketGetOut";
import FixedDown from "../FixedDown/FixedDown";
import "./TicketPage.scss";
function TicketPage() {
    return (
        <>
            <div className="TicketPage">
                <TicketCode
                    ticketCode="К-12"
                    peopleRemaining={7}
                    eventName={"Мир ИТ Изнутри"}
                />

                <TimeToArrive timeToArrive={"10:47"} />
                <StationName stationName={"Карьерные консультации"} />
                <TicketGetOut />
            </div>
            <FixedDown />
        </>
    );
}
export default TicketPage;
