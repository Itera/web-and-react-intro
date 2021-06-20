import { useState } from "react";
import TextField from "./components/TextField";

function ColleagueForm({ onAdd }) {
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

    onAdd({
      Name: name,
      Background: background,
      "Home Town": homeTown,
    });

    resetForm();
  };

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
          Add
        </button>
      </fieldset>
    </form>
  );
}

export default ColleagueForm;
