import FixedDown from "../FixedDown/FixedDown";
import Queue from "./Components/Queue/Queue";
import "./QueueListPage.scss";
import React from "react";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiUserX } from "react-icons/fi";

let QueueListPage = (props) => {
    return (
        <>
            <div className="queues">
                <div className="container">
                    <div className="queues__inner">
                        <div className="queues__header">
                            <div className="queues__header__tbank">
                                <a
                                    href="https://tbank.ru"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <img src="/tbank.svg" alt="" />
                                </a>
                            </div>
                            <div className="queues__header__title">
                                Мир ИТ изнутри
                            </div>
                            <div className="queues__header__avatar">
                                {props.currentUser ? (
                                    <div
                                        className="queues__header__avatar__image"
                                        onClick={props.onLogout}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src="/avatar.svg" alt="" />
                                        <span>
                                            <FiUserX />
                                        </span>
                                    </div>
                                ) : (
                                    <span
                                        style={{ fontSize: 24 }}
                                        className="queues__header__avatar__login"
                                    >
                                        <FiUserX size={36} />
                                    </span>
                                )}
                            </div>
                        </div>
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
