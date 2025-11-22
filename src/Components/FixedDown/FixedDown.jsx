import "./FixedDown.scss";
import TicketWarning from "../TicketWarning/TicketWarning";
import TicketWidget from "../TicketWidget/TicketWidget";
import QueueListPage from "../QueueListPage/QueueListPage";
import NotificationWidget from "../NotificationWidget/NotificationWidget";
import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
let FixedDown = (props) => {
    const fixedRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const el = fixedRef.current;
        if (!el) return;

        // Устанавливаем padding-bottom равным высоте блока
        const padding = el.offsetHeight + 30; // bottom + маленький запас
        document.body.style.paddingBottom = padding + "px";

        // Чистим на размонтировании
        return () => {
            document.body.style.paddingBottom = "0px";
        };
    }, []);
    return (
        <div className="TicketPage__fixed" ref={fixedRef}>
            {location.pathname === "/ticket" && (
                <>
                    <NotificationWidget />
                    <TicketWarning />
                </>
            )}

            {location.pathname === "/QueueList" && (
                <TicketWidget ticketCode="K-12" timeRemaining={35} />
            )}
        </div>
    );
};
export default FixedDown;
