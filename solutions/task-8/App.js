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
  const [editIndex, setEditIndex] = useState(null);

  const entries = colleagues.map((colleague, index) => (
    <div key={index} style={{ display: "flex", gap: 8 }}>
      <button onClick={() => handleDelete(index)} disabled={editIndex != null}>
        Delete
      </button>
      <button onClick={() => handleEdit(index)}>Edit</button>
      {colleague}
    </div>
  ));

  const handleAdd = (newColleague) => {
    setColleagues([...colleagues, newColleague]);
  };

  const handleDelete = (index) => {
    setColleagues(colleagues.filter((_, i) => i !== index));
  };

  const handleUpdate = (updatedColleague) => {
    setColleagues(
      colleagues.map((colleague, i) =>
        i === editIndex ? updatedColleague : colleague
      )
    );
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  return (
    <main id="task-8">
      <h1>My Colleagues</h1>
      <ColleagueForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editing={colleagues[editIndex]}
      />
      <List entries={entries} />
    </main>
  );
}

export default App;
