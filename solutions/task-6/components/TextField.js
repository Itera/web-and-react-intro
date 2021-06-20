function TextField({ id, label, value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" value={value} onChange={handleChange} />
    </>
  );
}

export default TextField;
