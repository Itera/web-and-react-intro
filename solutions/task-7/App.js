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

  const entries = colleagues.map((colleague, index) => (
    <div key={index} style={{ display: "flex", gap: 8 }}>
      <button onClick={() => handleDelete(index)}>Delete</button>
      {colleague}
    </div>
  ));

  const handleAdd = (newColleague) => {
    setColleagues([...colleagues, newColleague]);
  };

  const handleDelete = (index) => {
    setColleagues(colleagues.filter((_, i) => i !== index));
  };

  return (
    <main id="task-7">
      <h1>My Colleagues</h1>
      <ColleagueForm onAdd={handleAdd} />
      <List entries={entries} />
    </main>
  );
}

export default App;
