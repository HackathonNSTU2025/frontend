import "./TimeRemaining.scss";
let TimeRemaining = ({ timeRemaining }) => {
    return (
        <div className="TimeRemaining">
            <div className="TimeRemaining__text">Примерное время ожидания:</div>
            <div className="TimeRemaining__time">~ {timeRemaining} мин</div>
        </div>
    );
};
export default TimeRemaining;
