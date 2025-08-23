import { useState } from "react";
import QuickSort from "@kefir266/algorithms/sort/QuickSort";
import "./App.css";
import AlgorithmConfig from "./components/AlgorithmConfig";
import { generateRandomArray, wait } from "./lib/index";
import ArrayGraph from "./components/ArrayGraph";

const MAX_ARRAY_VALUE = 1000;

function App() {
  const [arr, setArr] = useState([]);
  let delay = 1;

  const handleGenerateArray = (numberElements) => {
    const newArray = generateRandomArray(numberElements, 0, MAX_ARRAY_VALUE);
    const quickSort = new QuickSort(newArray);
    setArr(quickSort);
    quickSort.onSwap(async function () {
      setArr([...quickSort]);
      await wait(delay); // Simulate a delay for visualization
    });
  };

  const handleStartSorting = (d) => {
    delay = d;
    if (arr instanceof QuickSort) {
      arr.sort((a, b) => a.value - b.value);
    }
  };

  return (
    <div className="App">
      <AlgorithmConfig
        className="config"
        onGenerateArray={handleGenerateArray}
        onStartSorting={handleStartSorting}
      />
      <ArrayGraph className="graph" array={arr} />
    </div>
  );
}

export default App;
