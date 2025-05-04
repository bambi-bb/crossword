//npm run dev
//npm run build
//npm run deploy
import "./App.css"; // Import your CSS file
import CrosswordBoxCSV from "./components/CrosswordBoxCSV";
import { Routes, Route, Link } from "react-router-dom";
import Om from "./pages/Om";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="crossword-title">KorsandeOrd.se</h1>
            <p className="paragraph-first">
              Välkommen till <strong>KorsandeOrd.se</strong>! Tycker du om{" "}
              <strong>ordlekar</strong>, <strong>webbkryss</strong> och kluriga
              ord på svenska? Då har du kommit helt rätt. Här får du{" "}
              <strong>daglig hjärngympa</strong> genom att{" "}
              <strong>lösa korsord online</strong> helt gratis och snabbt utan
              att behöva skapa konto.
            </p>
            <h2 className="paragraph-second-title">Så fungerar det</h2>
            <p className="paragraph-second">
              Klicka på ett korsord, fyll i dina svar direkt på skärmen och se
              om du klarar utmaningen. Du kan slumpa fram nya korsord, hoppa
              mellan nivåer och spela direkt i din webbläsare utan inloggning.
              Vill du veta mer om KorsandeOrd.se klicka{" "}
              <Link to="/om">här</Link>.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "95vw",
              }}
            >
              <CrosswordBoxCSV></CrosswordBoxCSV>
            </div>
            <footer className="site-footer">
              <p>
                KorsandeOrd.se - En korsordsapp för dig som gillar webbkryss,
                ordlekar och hjärngympa online.
              </p>
            </footer>
          </>
        }
      />
      <Route path="/om" element={<Om />} />
    </Routes>
  );
}

export default App;
