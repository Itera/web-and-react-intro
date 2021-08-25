import { useEffect, useState } from "react";

import * as api from "./api/colleagues";
import List from "./components/List";
import ColleagueForm from "./ColleagueForm";
import "./App.css";

function App() {
  const [colleagues, setColleagues] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const entries = colleagues.map((colleague, index) => (
    <div key={index} style={{ display: "flex", gap: 8 }}>
      <button onClick={() => handleDelete(index)} disabled={editIndex != null}>
        Delete
      </button>
      <button onClick={() => handleEdit(index)}>Edit</button>
      {colleague.name}
    </div>
  ));

  const updateColleagues = () => {
    return api.getColleagues().then(setColleagues);
  };

  const handleAdd = (newColleague) => {
    api.addColleague({ name: newColleague }).then(() => updateColleagues());
  };

  const handleDelete = (index) => {
    api.deleteColleague(colleagues[index]).then(() => updateColleagues());
  };

  const handleUpdate = (updatedColleague) => {
    const oldColleague = colleagues.find((_, i) => i === editIndex);
    const newColleague = { name: updatedColleague };
    if (oldColleague) {
      api
        .updateColleague({ ...oldColleague, ...newColleague })
        .then(() => updateColleagues());
    }
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  useEffect(() => {
    updateColleagues();
  }, []);

  return (
    <main id="task-10">
      <h1>My Colleagues</h1>
      <ColleagueForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editing={editIndex != null ? colleagues[editIndex].name : undefined}
      />
      <List entries={entries} />
    </main>
  );
}

export default App;
