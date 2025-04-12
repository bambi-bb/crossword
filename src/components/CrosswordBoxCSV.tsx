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
  const [isIncorrect, setIsIncorrect] = useState(false);

  const { fetchCSVData } = useFetch();
  const crosswordRef = useRef<CrosswordImperative>(null); // Create a ref for the Crossword component

  const resetCrossword = () => {
    if (crosswordRef.current) {
      crosswordRef.current.reset(); // Call the reset method to clear the grid
    }
    setIsCorrect(false);
    setIsIncorrect(false);
  };

  const filePaths = ["/1.csv", "/2.csv", "/3.csv"]; // Array of file paths

  const fetchCrossword = (filePath: string) => {
    console.log("Fetching data from:", filePath); // Debugging: Log the selected file path
    resetCrossword();
    setIsCorrect(false); // Reset the correctness state
    setIsIncorrect(false); // Reset the incorrectness state
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

  useEffect(() => {
    setIsCorrect(false); // Reset the correctness state
    setIsIncorrect(false); // Reset the incorrectness state
  }, [data]);

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
    <div className="crossword-wrapper">
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
            <button
              onClick={fetchPreviousCrossword}
              className="crossword-button"
            >
              Previous
            </button>
            <button onClick={fetchRandomCrossword} className="crossword-button">
              Random
            </button>
            <button onClick={fetchNextCrossword} className="crossword-button">
              Next
            </button>
          </div>
        </div>

        {/* Crossword grid */}
        <div className="crossword-grid-container">
          <ThemeProvider
            theme={{
              gridBackground: "rgb(0, 0, 0)",
              cellBackground: "#f1faee",
              focusBackground: "#457b9d",
              highlightBackground: "#a8dadc",
              cellBorder: "rgb(0, 0, 0)",
              textColor: "rgb(0, 0, 0)",
              numberColor: "rgba(0, 0, 0, 1)",
            }}
          >
            <Crossword
              key={currentFile} // Ensures full re-mount on file change
              ref={crosswordRef}
              data={crosswordData}
              acrossLabel={"Across:"}
              downLabel={"Down"}
              onCrosswordComplete={() => {
                if (crosswordRef.current?.isCrosswordCorrect()) {
                  setIsCorrect(true); // Set correct state if the crossword is correct
                  setIsIncorrect(false); // Reset incorrect state
                } else {
                  setIsCorrect(false); // Reset correct state
                  setIsIncorrect(true); // Set incorrect state
                }
              }}
              onCellChange={() => {
                setIsCorrect(false); // Reset correct state on cell change
                setIsIncorrect(false); // Reset incorrect state on cell change
              }}
            ></Crossword>
            {/* Status messages */}
            {isCorrect && <h1 className="status-message correct">Correct!</h1>}
            {isIncorrect && (
              <h1 className="status-message incorrect">Incorrect!</h1>
            )}
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default CrossWordBoxCSV;
