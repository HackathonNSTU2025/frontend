import TicketCode from "../TicketCode/TicketCode";
import TimeToArrive from "../TimeToArrive/TimeToArrive";
import AboutStation from "../AboutStation/AboutStation";
import FixedDown from "../FixedDown/FixedDown";
import "./AboutStationPage.scss";

function AboutStationPage(props) {
    return (
        <>
            {/* <HeaderBack /> */}
            <AboutStation aboutStation={props.aboutStation} />
            {/* <GetInline />
            <FixedDown /> */}
        </>
    );
}
export default AboutStationPage;
