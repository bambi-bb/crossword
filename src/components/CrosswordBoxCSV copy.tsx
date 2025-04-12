import { useState, useEffect, useRef } from "react";
import Crossword, {
  ThemeProvider,
  CrosswordImperative,
} from "@jaredreisinger/react-crossword";
//import Papa from "papaparse";
import useFetch from "../hooks/useFetch";
import "./CrosswordBoxCSV.css"; // Import your CSS file

function CrossWordBoxCSV() {
  const [data, setData] = useState<any[]>([]);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>(""); // Track the user input
  const [isCorrect, setIsCorrect] = useState(false);
  //const [isIncorrect, setIsIncorrect] = useState(false);
  const [theme, setTheme] = useState({
    gridBackground: "transparent",
    cellBackground: "rgb(240, 230, 230)",
    focusBackground: "rgb(100, 149, 237)",
    highlightBackground: "rgb(180, 200, 220)",
    cellBorder: "rgb(0, 0, 0)",
  }); // Default theme

  const { fetchCSVData } = useFetch();
  const crosswordRef = useRef<CrosswordImperative>(null); // Create a ref for the Crossword component

  const resetCrossword = () => {
    setTheme({
      gridBackground: "transparent",
      cellBackground: "rgb(240, 230, 230)",
      focusBackground: "rgb(100, 149, 237)",
      highlightBackground: "rgb(180, 200, 220)",
      cellBorder: "rgb(0, 0, 0)",
    }); // Reset to default theme
    if (crosswordRef.current) {
      crosswordRef.current.reset(); // Call the reset method to clear the grid
    }
    //setIsCorrect(false);
    //setIsIncorrect(false);
  };

  const filePaths = ["/1.csv", "/2.csv"];

  const fetchCrossword = (filePath: string) => {
    console.log("Fetching data from:", filePath); // Debugging: Log the selected file path
    resetCrossword();
    setCurrentFile(filePath); // Update the current file name
    fetchCSVData(filePath, (parsedData) => {
      console.log("Parsed Data:", parsedData);
      setData(parsedData); // Store the parsed CSV data
    });
  };

  const fetchRandomCrossword = () => {
    const randomFilePath =
      filePaths[Math.floor(Math.random() * filePaths.length)];
    fetchCrossword(randomFilePath); // Fetch the randomly selected file
  };

  const fetchNextCrossword = () => {
    const currentIndex = filePaths.indexOf(currentFile); // Get the index of the current file
    const nextIndex = (currentIndex + 1) % filePaths.length; // Move to the next file, wrapping around
    const nextFilePath = filePaths[nextIndex];
    fetchCrossword(nextFilePath); // Fetch the next file
  };

  const fetchPreviousCrossword = () => {
    const currentIndex = filePaths.indexOf(currentFile); // Get the index of the current file
    const previousIndex =
      (currentIndex - 1 + filePaths.length) % filePaths.length; // Move to the next file, wrapping around
    const previousFilePath = filePaths[previousIndex];
    fetchCrossword(previousFilePath); // Fetch the next file
  };

  const fetchGivenCrossword = () => {
    const givenIndex = parseInt(inputValue, 10) - 1; // Convert user input to a number
    if (isNaN(givenIndex) || givenIndex < 0 || givenIndex >= filePaths.length) {
      alert("Invalid input! Please enter a valid index."); // Handle invalid input
      return;
    }
    const givenFilePath = filePaths[givenIndex]; // Get the file path based on the input index
    fetchCrossword(givenFilePath); // Fetch the given file
    setInputValue(""); // Clear the input field after fetching
  };

  // Fetch a random crossword on the initial render
  useEffect(() => {
    fetchRandomCrossword();
  }, []);

  //useEffect(() => {
  //  setIsCorrect(false); // Reset the correctness state
  //  setIsIncorrect(false); // Reset the incorrectness state
  //}, [data]);

  const generateCrosswordData = () => {
    if (data.length === 0) {
      return { across: {}, down: {} }; // Return empty structure if data is not loaded
    }

    const across: any = {};
    const down: any = {};

    data.forEach((row) => {
      const { number, answer, clue, direction, Row, col } = row;

      const entry = {
        clue: clue,
        answer: answer,
        row: Row,
        col: col,
      };

      if (direction === "across") {
        across[number] = entry;
      } else if (direction === "down") {
        down[number] = entry;
      }
    });
    return { across, down };
  };

  const crosswordData = generateCrosswordData();

  return (
    <div className="crossword-container">
      {/* Group the input box and buttons */}
      <div className="crossword-input-buttons-container">
        {/* Input box */}
        <input
          className="input-crossword"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update input value
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchGivenCrossword(); // Fetch crossword on Enter key press
            }
          }}
          placeholder={`${filePaths.indexOf(currentFile) + 1}`}
        />

        {/* Buttons */}
        <div className="buttons-container">
          <button onClick={fetchPreviousCrossword} className="crossword-button">
            Load Previous Crossword
          </button>
          <button onClick={fetchRandomCrossword} className="crossword-button">
            Load Random Crossword
          </button>
          <button onClick={fetchNextCrossword} className="crossword-button">
            Load Next Crossword
          </button>
        </div>
      </div>

      {/* Crossword grid */}
      <div className="crossword-grid-container">
        <ThemeProvider theme={theme}>
          <Crossword
            ref={crosswordRef}
            data={crosswordData}
            acrossLabel={"Left-to-Right"}
            downLabel={"Top-to-Bottom"}
            onCrosswordComplete={() => {
              if (crosswordRef.current?.isCrosswordCorrect()) {
                setIsCorrect(true); // Set correctness state to true
                setTheme({
                  gridBackground: "rgb(220, 255, 220)", // Light green background
                  cellBackground: "rgb(200, 255, 200)",
                  focusBackground: "rgb(100, 200, 100)",
                  highlightBackground: "rgb(180, 240, 180)",
                  cellBorder: "rgb(0, 100, 0)",
                }); // Update theme for correct crossword
              } else {
                setIsCorrect(false); // Set correctness state to false
                setTheme({
                  gridBackground: "rgb(255, 233, 220)", // Light green background
                  cellBackground: "rgb(255, 213, 200)",
                  focusBackground: "rgb(200, 123, 100)",
                  highlightBackground: "rgb(240, 180, 180)",
                  cellBorder: "rgb(100, 3, 0)",
                }); // Update theme for correct crossword
              }
            }}
            onCellChange={() => {
              if (isCorrect) {
                // Prevent changes if the crossword is correct
                return;
              }
            }}
          ></Crossword>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default CrossWordBoxCSV;
