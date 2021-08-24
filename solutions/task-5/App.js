import List from "./components/List";
import "./App.css";

const COLLEAGUES = ["Tin Anh Nguyen", "Thanh Son Vo", "Didrik Fleischer"];

function App() {
  return (
    <main id="task-5">
      <h1>My Colleagues</h1>
      <List entries={COLLEAGUES} />
    </main>
  );
}

export default App;
