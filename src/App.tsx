import React from "react";
import "./App.css";
import { evaluate } from "mathjs"; // mathjs is a library I brought in to help with the calculations

const App: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [results, setResults] = React.useState<string | number>("0");

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operators = ["/", "x", "-", "+"];

  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    const operator = input.split("").find((item) => ["x"].includes(item));

    try {
      let value;
      if (operator === "x") {
        value = evaluate(input.replace("x", "*"));
      } else {
        value = evaluate(input);
      }
      setResults(value.toString()); // want to make sure we have a string
    } catch (error) {
      console.log(error); // so I can just see the error for now
      setResults("Error");
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="input">{input}</div>
          <div className="result">{results}</div>
        </div>
        <div className="buttons">
          {numbers.map((number) => (
            <button key={number} onClick={() => handleButtonClick(number)}>
              {number}
            </button>
          ))}
          <button onClick={() => handleButtonClick("0")}>0</button>
          {operators.map((operator) => (
            <button
              key={operator}
              className="operatorButton"
              onClick={() => handleButtonClick(operator)}
            >
              {operator}
            </button>
          ))}
          <button
            onClick={() => {
              setInput("");
              setResults("0");
            }}
          >
            C
          </button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
