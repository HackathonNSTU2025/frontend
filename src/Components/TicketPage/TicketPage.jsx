import TicketCode from "../TicketCode/TicketCode";
import TimeToArrive from "../TimeToArrive/TimeToArrive";
import StationName from "../StationName/StationName";
import TicketWidget from "../TicketWidget/TicketWidget";
import TicketWarning from "../TicketWarning/TicketWarning";
import FixedDown from "../FixedDown/FixedDown";
import "./TicketPage.scss";
function TicketPage() {
    return (
        <>
            <TicketCode
                ticketCode="К-12"
                peopleRemaining={7}
                eventName={"Мир ИТ Изнутри"}
            />

            <TimeToArrive timeToArrive={"10:47"} />
            <StationName stationName={"Карьерные консультации"} />
            {/* <QueueList /> */}
            {/* <GetInline /> */}
            <FixedDown />
        </>
    );
}
export default TicketPage;
