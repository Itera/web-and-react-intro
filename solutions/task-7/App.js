import { useState } from "react";

import Table from "./components/Table";
import ColleagueForm from "./ColleagueForm";
import "./App.css";

function App() {
  const [colleagues, setColleagues] = useState([
    { Name: "Tin Anh Nguyen" },
    { Name: "Thanh Son Vo" },
    { Name: "Didrik Fleischer" },
  ]);

  const entries = colleagues.map((colleague, index) => ({
    ...colleague,
    Delete: <button onClick={() => handleDelete(index)}>Delete</button>,
  }));

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
      <Table
        headings={["Name", "Background", "Home Town", "Delete"]}
        entries={entries}
      />
    </main>
  );
}

export default App;
