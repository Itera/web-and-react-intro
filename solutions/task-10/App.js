import { useEffect, useState } from "react";

import Table from "./components/Table";
import ColleagueForm from "./ColleagueForm";
import "./App.css";
import * as api from "./api/colleagues";

function App() {
  const [colleagues, setColleagues] = useState([]);
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

  const updateColleagues = () => {
    return api.getColleagues().then(setColleagues);
  };

  const handleAdd = (newColleague) => {
    api.addColleague(newColleague).then(() => updateColleagues());
  };

  const handleDelete = (index) => {
    api.deleteColleague(colleagues[index]).then(() => updateColleagues());
  };

  const handleUpdate = (updatedColleague) => {
    const oldColleague = colleagues.find(({ Id }) => Id === editing.Id);
    if (oldColleague) {
      api
        .updateColleague({ ...oldColleague, ...updatedColleague })
        .then(() => updateColleagues())
        .then(() => setEditing(null));
    }
  };

  const handleEdit = (index) => {
    setEditing(colleagues[index]);
  };

  useEffect(() => {
    updateColleagues();
  }, []);

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
