import { useState } from "react";
import QuickSort from "@kefir266/algorithms/sort/QuickSort";
import "./App.css";
import AlgorithmConfig from "./components/AlgorithmConfig";
import { generateRandomArray, wait } from "./lib/index";
import ArrayGraph from "./components/ArrayGraph";

const MAX_ARRAY_VALUE = 1000;
let quickSort = new QuickSort([]);

function App() {
  const [arr, setArr] = useState(quickSort);
  const [finished, setFinished] = useState(false);
  let delay = 1;

  const handleGenerateArray = (numberElements: number) => {
    const newArray: [] = generateRandomArray(
      numberElements,
      0,
      MAX_ARRAY_VALUE,
    );
    quickSort = new QuickSort(newArray);
    setArr(quickSort);
    quickSort.onSwap(async function () {
      setArr([...quickSort]);
      await wait(delay); // Simulate a delay for visualization
    });
    quickSort.onFinished(() => {
      setFinished(true);
    });
  };

  const handleStartSorting = (d: number) => {
    delay = d;
    setFinished(false);
    if (arr instanceof QuickSort) {
      arr.sort((a, b) => a.value - b.value);
    }
  };

  const handlePauseSorting = () => {
    quickSort.pause();
  }

  const handleResumerSorting = (d: number) => {
    delay = d;
    quickSort.resume();
  }

  return (
    <div className="App h-full">
      <AlgorithmConfig
        className="config h-2/5"
        finished={finished}
        onGenerateArray={handleGenerateArray}
        onStartSorting={handleStartSorting}
        onPauseSorting={handlePauseSorting}
        onResumeSorting={handleResumerSorting}
      />
      <ArrayGraph className="graph h-3/5" array={arr} />
    </div>
  );
}

export default App;
