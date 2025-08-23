import { useState } from "react";
import QuickSort from "@kefir266/algorithms/sort/QuickSort";
import "./App.css";
import AlgorithmConfig from "./components/AlgorithmConfig";
import { generateRandomArray, wait } from "./lib/index";
import ArrayGraph from "./components/ArrayGraph";

const MAX_ARRAY_VALUE = 1000;

function App() {
  const [arr, setArr] = useState(new QuickSort([]));
  let delay = 1;

  const handleGenerateArray = (numberElements: number) => {
    const newArray: [] = generateRandomArray(
      numberElements,
      0,
      MAX_ARRAY_VALUE,
    );
    const quickSort: QuickSort = new QuickSort(newArray);
    setArr(quickSort);
    quickSort.onSwap(async function () {
      setArr([...quickSort]);
      await wait(delay); // Simulate a delay for visualization
    });
  };

  const handleStartSorting = (d: number) => {
    delay = d;
    if (arr instanceof QuickSort) {
      arr.sort((a, b) => a.value - b.value);
    }
  };

  return (
    <div className="App h-full">
      <AlgorithmConfig
        className="config h-2/5"
        onGenerateArray={handleGenerateArray}
        onStartSorting={handleStartSorting}
      />
      <ArrayGraph className="graph h-3/5" array={arr} />
    </div>
  );
}

export default App;
