import { useEffect, useState } from "react";
import TextField from "./components/TextField";

function ColleagueForm({ onAdd, onUpdate, editing }) {
  const [name, setName] = useState("");

  const resetForm = () => {
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing == null) {
      onAdd(name);
    } else {
      onUpdate(name);
    }

    resetForm();
  };

  useEffect(() => {
    if (editing != null) {
      setName(editing || "");
    }
  }, [editing]);

  return (
    <form style={{ marginBottom: 16 }} onSubmit={handleSubmit}>
      <fieldset>
        <legend>New Colleague</legend>
        <TextField id="name" label="Name" value={name} onChange={setName} />
        <button type="submit" style={{ marginTop: 8 }} disabled={!name}>
          {editing == null ? "Add" : "Update"}
        </button>
      </fieldset>
    </form>
  );
}

export default ColleagueForm;
