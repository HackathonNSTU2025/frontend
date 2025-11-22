import "./StationName.scss";
import { FiArrowRight } from "react-icons/fi";
let StationName = ({ stationName }) => {
    return (
        <div className="StationName">
            <div className="container">
                <div className="StationName__inner">
                    <div className="StationName__content">
                        <div className="StationName__name">{stationName}</div>
                        <div className="StationName__text">
                            Подробнее о стойке
                        </div>
                    </div>
                    <div className="StationName__arrow">
                        <FiArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StationName;
