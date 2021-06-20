import ColleagueTable from "./components/Table";
import "./App.css";

function App() {
  return (
    <main id="task-5">
      <h1>My Colleagues</h1>
      <ColleagueTable
        headings={["Name", "Background", "Home Town"]}
        entries={[
          { Name: "Tin Anh Nguyen" },
          { Name: "Thanh Son Vo" },
          { Name: "Didrik Fleischer" },
        ]}
      />
    </main>
  );
}

export default App;
