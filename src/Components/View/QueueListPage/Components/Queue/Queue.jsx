import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

let Queue = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/aboutStation?id=${props.id}&inLine=${props.inLine}`);
    };

    return (
        <li
            className={`queue${props.isCompleted ? " queue--Completed" : ""}`}
            onClick={handleClick}
            style={{ cursor: "pointer" }} // чтобы показывалось, что элемент кликабельный
        >
            <div className="queue__content">
                <div className="queue__title">{props.title}</div>
                <p className="queue__text">Подробнее о стойке</p>

                {props.inLine ? (
                    <div className="queue__state">В очереди</div>
                ) : null}
            </div>
            <FiArrowRight />
        </li>
    );
};
export default Queue;
