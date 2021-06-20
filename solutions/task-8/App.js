import { useState } from "react";

import Table from "./components/Table";
import ColleagueForm from "./ColleagueForm";
import "./App.css";

function App() {
  const [colleagues, setColleagues] = useState([
    { Id: 1, Name: "Tin Anh Nguyen" },
    { Id: 2, Name: "Thanh Son Vo" },
    { Id: 3, Name: "Didrik Fleischer" },
  ]);

  const [editing, setEditing] = useState(null);

  const entries = colleagues.map((colleague, index) => ({
    ...colleague,
    Controls: (
      <div style={{ display: "flex", gap: 4 }}>
        <button onClick={() => handleEdit(index)}>Edit</button>
        <button onClick={() => handleDelete(index)} disabled={editing}>
          Delete
        </button>
      </div>
    ),
  }));

  const handleAdd = (newColleague) => {
    setColleagues([...colleagues, newColleague]);
  };

  const handleDelete = (index) => {
    setColleagues(colleagues.filter((_, i) => i !== index));
  };

  const handleUpdate = (updatedColleague) => {
    setColleagues(
      colleagues.map((colleague) =>
        colleague.Id === editing.Id
          ? { ...colleague, ...updatedColleague }
          : colleague
      )
    );
    setEditing(null);
  };

  const handleEdit = (index) => {
    setEditing(colleagues[index]);
  };

  return (
    <main id="task-8">
      <h1>My Colleagues</h1>
      <ColleagueForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editing={editing}
      />
      <Table
        headings={["Name", "Background", "Home Town", "Controls"]}
        entries={entries}
      />
    </main>
  );
}

export default App;
