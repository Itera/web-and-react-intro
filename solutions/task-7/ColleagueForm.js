import { useState } from "react";
import TextField from "./components/TextField";

function ColleagueForm({ onAdd }) {
  const [name, setName] = useState("");

  const resetForm = () => {
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(name);
    resetForm();
  };

  return (
    <form style={{ marginBottom: 16 }} onSubmit={handleSubmit}>
      <fieldset>
        <legend>New Colleague</legend>
        <TextField id="name" label="Name" value={name} onChange={setName} />
        <button type="submit" style={{ marginTop: 8 }} disabled={!name}>
          Add
        </button>
      </fieldset>
    </form>
  );
}

export default ColleagueForm;
