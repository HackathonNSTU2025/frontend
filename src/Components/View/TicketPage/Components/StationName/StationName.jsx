import "./StationName.scss";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

let StationName = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/aboutStation?id=${props.id}`);
    };
    return (
        <div className="StationName" onClick={handleClick}>
            <div className="container">
                <div className="StationName__inner">
                    <div className="StationName__content">
                        <div className="StationName__name">
                            {props.stationName}
                        </div>
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
