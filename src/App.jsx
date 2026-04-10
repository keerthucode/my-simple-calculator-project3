import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(false);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clear = () => setInput("");

  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      const result = eval(input).toString();
      setHistory((prev) => [`${input} = ${result}`, ...prev]);
      setInput(result);
    } catch {
      setInput("Error");
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") {
        calculate();
      } else if (e.key === "Backspace") {
        backspace();
      } else if (e.key === "Escape") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [input]);

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="top-bar">
        <h2>Calculator</h2>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <input value={input} readOnly />

      <div className="buttons">
        <button onClick={clear}>C</button>
        <button onClick={backspace}>⌫</button>
        <button onClick={() => handleClick("%")}>%</button>
        <button onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button className="equal" onClick={calculate}>
          =
        </button>
      </div>

      <div className="history">
        <h3>History</h3>
        {history.map((h, i) => (
          <p key={i}>{h}</p>
        ))}
      </div>
    </div>
  );
}

export default App;