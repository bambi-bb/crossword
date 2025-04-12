//npm run dev
import "./App.css"; // Import your CSS file
import CrosswordBoxCSV from "./components/CrosswordBoxCSV";

function App() {
  return (
    <>
      <h1 className="crossword-title">CROSSWORD</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <CrosswordBoxCSV></CrosswordBoxCSV>
      </div>
    </>
  );
}

export default App;
