import { useState } from "react";

import List from "./components/List";
import ColleagueForm from "./ColleagueForm";
import "./App.css";

const INITIAL_COLLEAGUES = [
  "Tin Anh Nguyen",
  "Thanh Son Vo",
  "Didrik Fleischer",
];

function App() {
  const [colleagues, setColleagues] = useState(INITIAL_COLLEAGUES);

  const handleAdd = (newColleague) => {
    setColleagues([...colleagues, newColleague]);
  };

  return (
    <main id="task-6">
      <h1>My Colleagues</h1>
      <ColleagueForm onAdd={handleAdd} />
      <List entries={colleagues} />
    </main>
  );
}

export default App;
