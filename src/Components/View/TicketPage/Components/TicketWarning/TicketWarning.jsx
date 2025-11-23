import "./TicketWarning.scss";
let TicketWarning = () => {
    return (
        <div className="TicketWarning">
            <div className="TicketWarning__inner">
                Данные обновляются автоматически каждую минуту. Время ожидания
                является приблизительным.
            </div>
        </div>
    );
};
export default TicketWarning;
