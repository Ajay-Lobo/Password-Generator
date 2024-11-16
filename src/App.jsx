import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberActive, setNumberActive] = useState(false);
  const [characterActive, setCharacterActive] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberActive) str += "0123456789";
    if (characterActive) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length+1));
    }
    setPassword(pass);
  }, [length, numberActive, characterActive, setPassword]);

  const copyToClipBoard = useCallback(() => {
     passwordRef.current.select();
    // document.execCommand("copy");
    window.navigator.clipboard.writeText(password);
  }
  , [password]);

  useEffect(() => {
    passwordGenerator()
  }, [length,numberActive,characterActive,passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-2xl text-center font-bold mb-4 text-orange-400">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full px-3 py-2 text-gray-700 bg-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-400 transition"
            placeholder="Generated password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button onClick={copyToClipBoard} className="bg-orange-500 text-white px-4 font-semibold hover:bg-orange-600 transition-all rounded-r-lg">
            Copy
          </button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center gap-x-2">
            <label className="text-orange-400 font-semibold">
              Length: {length}
            </label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer accent-orange-500 w-24"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberActive}
              id="numberInput"
              className="cursor-pointer accent-orange-500 w-5 h-5"
              onChange={() => setNumberActive((prev) => !prev)}
            />
            <label className="text-orange-400 font-semibold">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={characterActive}
              id="characterInput"
              className="cursor-pointer accent-orange-500 w-5 h-5"
              onChange={() => setCharacterActive((prev) => !prev)}
            />
            <label className="text-orange-400 font-semibold">
              Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
