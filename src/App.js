import logo from "./logo.svg";
import "./App.css";
import MyHeader from "./Components/Header";

function MyParent({ name }) {
    return <li>{name}</li>;
}

function App() {
    return (
        <div className="App">
            <MyHeader />
            <main>
                <h3>Как именно я люблю своих родителей?</h3>
                <ul>
                    <MyParent name="мама топчик" />
                    <MyParent name="папа тоже топчик" />
                </ul>
            </main>
        </div>
    );
}

export default App;
