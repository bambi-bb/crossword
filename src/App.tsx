//npm run dev
//npm run build
//npm run deploy
import "./App.css"; // Import your CSS file
import CrosswordBoxCSV from "./components/CrosswordBoxCSV";

function App() {
  return (
    <>
      <h1 className="crossword-title">KorsandeOrd.se</h1>
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
