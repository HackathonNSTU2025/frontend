import FixedDown from "../FixedDown/FixedDown";
import Queue from "../Queue/Queue";
import "./QueueListPage.scss";

let QueueListPage = (props) => {
    return (
        <>
            <div className="queues">
                <div className="container">
                    <div className="queues__inner">
                        {props.queues.map((queuesItem) => (
                            <div className="queues-list-wrap queues--accessible">
                                <h3 className="queues-list--title">
                                    {queuesItem.queuesTitle}
                                </h3>
                                <ul className="queues-list">
                                    {queuesItem.queuesList.map((queue) => (
                                        <Queue
                                            key={queue.id} // ключ для React
                                            id={queue.id} // передаем id
                                            title={queue.title}
                                            isCompleted={queue.isCompleted}
                                            inLine={queue.inLine}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default QueueListPage;
