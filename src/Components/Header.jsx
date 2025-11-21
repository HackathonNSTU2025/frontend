import logo from "../logo.svg";
import "../App.css";

function MyHeader() {
    const time = new Date();
    return (
        <header className="MyHeader">
            <div style={{ display: "flex" }}>
                <img src={logo} width="100vh" alt="Логотип React"></img>
                <h1>React ВанЛаф</h1>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 20,
                }}
            >
                <h3>Главная</h3>
                <h3>Продукция</h3>
                <h3>
                    <a
                        href="https://github.com/SpaceInMe"
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        Контакты
                    </a>
                </h3>
            </div>
            <span>Локальное время: {time.toLocaleTimeString()}</span>
        </header>
    );
}

export default MyHeader;
