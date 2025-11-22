import TicketCode from "../TicketCode/TicketCode";
import TimeToArrive from "../TimeToArrive/TimeToArrive";
import AboutStation from "../AboutStation/AboutStation";
import FixedDown from "../FixedDown/FixedDown";
import "./AboutStationPage.scss";

function AboutStationPage() {
    return (
        <>
            {/* <HeaderBack /> */}
            <AboutStation
                stationName={"Карьерные консультации"}
                stationDescription={
                    "Стоим, ждём всех, у кого есть вопросы про карьеру в IT! С чего начать? Как сменить профессию? Как вырасти до тимлида? Подходи — обсудим твой уникальный путь."
                }
                imageURL={
                    "https://vanrobaeysludwigoils.com/wp-content/uploads/2022/10/post4.jpg"
                }
            />
            {/* <GetInline />
            <FixedDown /> */}
        </>
    );
}
export default AboutStationPage;
