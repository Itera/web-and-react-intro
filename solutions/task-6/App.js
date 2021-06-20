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

  const handleAdd = (newColleague) => {
    setColleagues([...colleagues, newColleague]);
  };

  return (
    <main id="task-6">
      <h1>My Colleagues</h1>
      <ColleagueForm onAdd={handleAdd} />
      <Table
        headings={["Name", "Background", "Home Town"]}
        entries={colleagues}
      />
    </main>
  );
}

export default App;
