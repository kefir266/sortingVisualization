import { useEffect, useState } from "react";
import "./App.css";
import AlgorithmConfig from "./components/AlgorithmConfig";
import { generateRandomArray, wait } from "./lib";
import ArrayGraph from "./components/ArrayGraph";
import createSortArray, { type SortArray } from "./lib/sortFabric.ts";
import { useConfig } from "./hooks/useConfig.ts";
import type {TypeOfArrayElements} from "./types";

const MAX_ARRAY_VALUE = 1000;

let sortArray: SortArray<TypeOfArrayElements>;

function App() {
  const { algorithm } = useConfig();
  const [arr, setArr] = useState<Array<TypeOfArrayElements>>(
    createSortArray(algorithm, []),
  );
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    sortArray = createSortArray(algorithm, arr);
    setArr(sortArray);
  }, [algorithm]);

  let delay = 1;

  const handleGenerateArray = (numberElements: number) => {
    const newArray: TypeOfArrayElements[] = generateRandomArray(
      numberElements,
      0,
      MAX_ARRAY_VALUE,
    );
    sortArray = createSortArray(algorithm, newArray);
    setArr(sortArray);
    sortArray.onSwap(async function () {
      setArr([...sortArray]);
      await wait(delay); // Simulate a delay for visualization
    });
    sortArray.onFinished(() => {
      setFinished(true);
    });
  };

  const handleStartSorting = (d: number) => {
    delay = d;
    setFinished(false);
    sortArray.sort((a, b) => a.value - b.value);
  };

  const handlePauseSorting = () => {
    sortArray.pause();
  };

  const handleResumerSorting = (d: number) => {
    delay = d;
    sortArray.resume();
  };

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
