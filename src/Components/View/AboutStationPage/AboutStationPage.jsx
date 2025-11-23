import AboutStation from "./Components/AboutStation/AboutStation";
import "./AboutStationPage.scss";

function AboutStationPage(props) {
    return (
        <>
            <AboutStation aboutStation={props.aboutStation} />
        </>
    );
}
export default AboutStationPage;
