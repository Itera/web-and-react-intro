import { useEffect, useState } from "react";
import TextField from "./components/TextField";

function ColleagueForm({ onAdd, onUpdate, editing }) {
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const [homeTown, setHomeTown] = useState("");

  const resetForm = () => {
    setName("");
    setBackground("");
    setHomeTown("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const colleague = {
      Name: name,
      Background: background,
      "Home Town": homeTown,
    };
    if (editing == null) {
      onAdd(colleague);
    } else {
      onUpdate(colleague);
    }

    resetForm();
  };

  useEffect(() => {
    if (editing != null) {
      setName(editing.Name || "");
      setBackground(editing.Background || "");
      setHomeTown(editing["Home Town"] || "");
    }
  }, [editing]);

  return (
    <form style={{ marginBottom: 16 }} onSubmit={handleSubmit}>
      <fieldset>
        <legend>New Colleague</legend>
        <TextField id="name" label="Name" value={name} onChange={setName} />
        <TextField
          id="background"
          label="Background"
          value={background}
          onChange={setBackground}
        />
        <TextField
          id="homeTown"
          label="Home Town"
          value={homeTown}
          onChange={setHomeTown}
        />
        <button type="submit" style={{ marginTop: 8 }}>
          {editing == null ? "Add" : "Update"}
        </button>
      </fieldset>
    </form>
  );
}

export default ColleagueForm;
