function List({ entries }) {
  return (
    <ul>
      {entries.map((entry, i) => (
        <li key={i}>{entry}</li>
      ))}
    </ul>
  );
}

export default List;
