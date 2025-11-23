import React, { useState } from "react";
import "./MainPage.scss";
const initialEvents = [
    {
        name: "Мир ИТ изнутри - Москва",
        date: "15.10.2023",
        stands: 8,
        status: "Активно",
        statusColor: "var(--success)",
    },
    {
        name: "Мир ИТ изнутри - Санкт-Петербург",
        date: "22.10.2023",
        stands: 6,
        status: "Активно",
        statusColor: "var(--success)",
    },
    {
        name: "Мир ИТ изнутри - Казань",
        date: "05.11.2023",
        stands: 5,
        status: "Запланировано",
        statusColor: "var(--warning)",
    },
];

const initialStands = [
    {
        name: "Разработка ПО",
        description: "Узнайте о процессе создания программного обеспечения",
        tables: 3,
        queueLimit: 25,
    },
    {
        name: "Кибербезопасность",
        description: "Защита информации и систем от кибератак",
        tables: 2,
        queueLimit: 20,
    },
    {
        name: "Искусственный интеллект",
        description: "Машинное обучение и нейросети",
        tables: 2,
        queueLimit: 30,
    },
];

export default function MainPage() {
    const [showEventModal, setShowEventModal] = useState(false);
    const [showStandModal, setShowStandModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [limitQueue, setLimitQueue] = useState(false);
    const [events, setEvents] = useState(initialEvents);
    const [stands, setStands] = useState(initialStands);

    // Form states
    const [eventForm, setEventForm] = useState({
        name: "",
        date: "",
        location: "",
        description: "",
    });
    const [standForm, setStandForm] = useState({
        name: "",
        description: "",
        photo: null,
        tables: 1,
        limitQueue: false,
        queueLimit: 20,
    });

    // Handlers
    const handleEventFormChange = (e) => {
        const { name, value } = e.target;
        setEventForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleStandFormChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setStandForm((prev) => ({ ...prev, [name]: checked }));
            setLimitQueue(checked);
        } else if (type === "file") {
            setStandForm((prev) => ({ ...prev, photo: files[0] }));
        } else {
            setStandForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://cloudybooks.ru:8000/events/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: eventForm.name }),
            });
            if (!response.ok) {
                throw new Error("Ошибка при создании мероприятия");
            }
            // Optionally parse response if needed
            // const data = await response.json();
            setEvents((prev) => [
                ...prev,
                {
                    name: eventForm.name,
                    date: eventForm.date,
                    stands: 0,
                    status: "Запланировано",
                    statusColor: "var(--warning)",
                },
            ]);
            setShowEventModal(false);
            setEventForm({ name: "", date: "", location: "", description: "" });
            alert("Мероприятие успешно создано!");
        } catch (err) {
            console.error("Event creation error:", err);
            alert(
                "Ошибка при создании мероприятия: " +
                    (err.message === "Failed to fetch"
                        ? "Нет соединения с сервером. Проверьте доступность API и настройки CORS."
                        : err.message)
            );
        }
    };

    const handleStandSubmit = (e) => {
        e.preventDefault();
        // Add stand logic
        setStands((prev) => [
            ...prev,
            {
                name: standForm.name,
                description: standForm.description,
                tables: standForm.tables,
                queueLimit: standForm.limitQueue ? standForm.queueLimit : null,
            },
        ]);
        setShowStandModal(false);
        setStandForm({
            name: "",
            description: "",
            photo: null,
            tables: 1,
            limitQueue: false,
            queueLimit: 20,
        });
        setLimitQueue(false);
        alert("Стойка успешно создана!");
    };

    return (
        <div className="admin">
            <div className="container">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="logo">
                        <h1>Мир ИТ изнутри</h1>
                        <p>Админ-панель</p>
                    </div>
                    <ul className="nav-links">
                        <li className="active">
                            <a href="#">
                                <i>📊</i> Панель управления
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i>📅</i> Мероприятия
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i>🏢</i> Стойки
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i>👥</i> Очереди
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i>⚙️</i> Настройки
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    <div className="header">
                        <h2>Панель управления</h2>
                        <div className="user-info">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Аватар"
                            />
                            <span>Администратор</span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-cards">
                        <div className="stat-card">
                            <div className="stat-icon events">📅</div>
                            <div className="stat-info">
                                <h3>{events.length}</h3>
                                <p>Активных мероприятий</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stands">🏢</div>
                            <div className="stat-info">
                                <h3>{stands.length}</h3>
                                <p>Всего стоек</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon queues">👥</div>
                            <div className="stat-info">
                                <h3>156</h3>
                                <p>Людей в очередях</p>
                            </div>
                        </div>
                    </div>

                    {/* Events Section */}
                    <div className="section">
                        <div className="section-header">
                            <h3>Мероприятия</h3>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowEventModal(true)}
                            >
                                + Добавить мероприятие
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Дата</th>
                                    <th>Кол-во стоек</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event, idx) => (
                                    <tr key={idx}>
                                        <td>{event.name}</td>
                                        <td>{event.date}</td>
                                        <td>{event.stands}</td>
                                        <td>
                                            <span
                                                style={{
                                                    color: event.statusColor,
                                                }}
                                            >
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="actions">
                                            <button className="action-btn btn-primary">
                                                Редактировать
                                            </button>
                                            <button className="action-btn btn-warning">
                                                Управление
                                            </button>
                                            <button className="action-btn btn-danger">
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Stands Section */}
                    <div className="section">
                        <div className="section-header">
                            <h3>
                                Стойки мероприятия "Мир ИТ изнутри - Москва"
                            </h3>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowStandModal(true)}
                            >
                                + Добавить стойку
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Описание</th>
                                    <th>Кол-во столов</th>
                                    <th>Лимит очереди</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stands.map((stand, idx) => (
                                    <tr key={idx}>
                                        <td>{stand.name}</td>
                                        <td>{stand.description}</td>
                                        <td>{stand.tables}</td>
                                        <td>{stand.queueLimit || "-"}</td>
                                        <td className="actions">
                                            <button className="action-btn btn-primary">
                                                Редактировать
                                            </button>
                                            <button
                                                className="action-btn btn-success"
                                                onClick={() =>
                                                    setShowQRModal(true)
                                                }
                                            >
                                                QR-код
                                            </button>
                                            <button className="action-btn btn-danger">
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Event Modal */}
                {showEventModal && (
                    <div
                        className="modal active"
                        onClick={(e) =>
                            e.target === e.currentTarget &&
                            setShowEventModal(false)
                        }
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Добавить мероприятие</h3>
                                <button
                                    className="close-modal"
                                    onClick={() => setShowEventModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <form id="eventForm" onSubmit={handleEventSubmit}>
                                <div className="form-group">
                                    <label htmlFor="eventName">
                                        Название мероприятия
                                    </label>
                                    <input
                                        type="text"
                                        id="eventName"
                                        name="name"
                                        className="form-control"
                                        placeholder="Введите название"
                                        required
                                        value={eventForm.name}
                                        onChange={handleEventFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDate">
                                        Дата проведения
                                    </label>
                                    <input
                                        type="date"
                                        id="eventDate"
                                        name="date"
                                        className="form-control"
                                        required
                                        value={eventForm.date}
                                        onChange={handleEventFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventLocation">
                                        Место проведения
                                    </label>
                                    <input
                                        type="text"
                                        id="eventLocation"
                                        name="location"
                                        className="form-control"
                                        placeholder="Введите место проведения"
                                        required
                                        value={eventForm.location}
                                        onChange={handleEventFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDescription">
                                        Описание
                                    </label>
                                    <textarea
                                        id="eventDescription"
                                        name="description"
                                        className="form-control"
                                        placeholder="Введите описание мероприятия"
                                        value={eventForm.description}
                                        onChange={handleEventFormChange}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-danger close-modal"
                                        onClick={() => setShowEventModal(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Stand Modal */}
                {showStandModal && (
                    <div
                        className="modal active"
                        onClick={(e) =>
                            e.target === e.currentTarget &&
                            setShowStandModal(false)
                        }
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Добавить стойку</h3>
                                <button
                                    className="close-modal"
                                    onClick={() => setShowStandModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <form id="standForm" onSubmit={handleStandSubmit}>
                                <div className="form-group">
                                    <label htmlFor="standName">
                                        Название стойки
                                    </label>
                                    <input
                                        type="text"
                                        id="standName"
                                        name="name"
                                        className="form-control"
                                        placeholder="Введите название"
                                        required
                                        value={standForm.name}
                                        onChange={handleStandFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="standDescription">
                                        Описание
                                    </label>
                                    <textarea
                                        id="standDescription"
                                        name="description"
                                        className="form-control"
                                        placeholder="Введите описание стойки"
                                        value={standForm.description}
                                        onChange={handleStandFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="standPhoto">
                                        Фотография стойки
                                    </label>
                                    <input
                                        type="file"
                                        id="standPhoto"
                                        name="photo"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleStandFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tablesCount">
                                        Количество столов
                                    </label>
                                    <input
                                        type="number"
                                        id="tablesCount"
                                        name="tables"
                                        className="form-control"
                                        min="1"
                                        max="10"
                                        value={standForm.tables}
                                        required
                                        onChange={handleStandFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="limitQueue"
                                            name="limitQueue"
                                            checked={limitQueue}
                                            onChange={handleStandFormChange}
                                        />
                                        <label htmlFor="limitQueue">
                                            Ограничить максимальное количество
                                            людей в очереди
                                        </label>
                                    </div>
                                </div>
                                {limitQueue && (
                                    <div
                                        className="form-group"
                                        id="queueLimitGroup"
                                    >
                                        <label htmlFor="queueLimit">
                                            Максимальное количество людей
                                        </label>
                                        <input
                                            type="number"
                                            id="queueLimit"
                                            name="queueLimit"
                                            className="form-control"
                                            min="1"
                                            value={standForm.queueLimit}
                                            onChange={handleStandFormChange}
                                        />
                                    </div>
                                )}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-danger close-modal"
                                        onClick={() => setShowStandModal(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* QR Modal */}
                {showQRModal && (
                    <div
                        className="modal active"
                        onClick={(e) =>
                            e.target === e.currentTarget &&
                            setShowQRModal(false)
                        }
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>QR-код для входа в очередь</h3>
                                <button
                                    className="close-modal"
                                    onClick={() => setShowQRModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="qr-code">
                                <img
                                    src="https://via.placeholder.com/200x200"
                                    alt="QR Code"
                                />
                                <p>
                                    Стойка: <strong>Разработка ПО</strong>
                                </p>
                                <p>Отсканируйте QR-код для входа в очередь</p>
                                <button className="btn btn-primary">
                                    Скачать QR-код
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger close-modal"
                                    onClick={() => setShowQRModal(false)}
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
