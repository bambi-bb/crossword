import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";

function CrossWordBox() {
  const crosswordData = {
    across: {
      1: {
        clue: "A fruit that is red or green",
        answer: "apple",
        row: 0,
        col: 0,
      },
      3: {
        clue: "Fruits that is green",
        answer: "pears",
        row: 2,
        col: 0,
      },
    },
    down: {
      2: {
        clue: "A yellow fruit",
        answer: "banana",
        row: 0,
        col: 2,
      },
    },
  };

  return (
    <div style={{}}>
      <div
        style={{
          width: "90%",
          maxWidth: "25em",
          height: "auto",
        }}
      >
        <ThemeProvider
          theme={{
            allowNonSquare: true,
            gridBackground: "transparent",
            cellBackground: "rgb(240, 230, 230)",
            focusBackground: "	rgb(100, 149, 237)",
            highlightBackground: "rgb(180, 200, 220)",
            cellBorder: "rgb(0, 0, 0)",
          }}
        >
          <Crossword data={crosswordData}></Crossword>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default CrossWordBox;
