import type { JSX } from "react";
import { useLocalstorageState } from "../hooks/useLocalstorageState";
import { algorithms } from "../constants/algorithms";
import styles from "./AlgorithmConfig.module.css";

export default function AlgorithmConfig({
  onGenerateArray,
  onStartSorting,
  className,
}: {
  onGenerateArray: (arg0: number) => void;
  onStartSorting: (arg0: number) => void;
  className?: string;
}): JSX.Element {
  const [algorithm, setAlgorithm] = useLocalstorageState(
    "algorithm",
    algorithms.quickSort,
  );
  const [numberOfElements, setNumberOfElements] = useLocalstorageState(
    "numberOfElements",
    10,
  );
  const [delay, setDelay] = useLocalstorageState("delay", 1);

  const handleSubmit = () => {
    onGenerateArray(numberOfElements);
  };

  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className="mx-auto w-3/4 max-w-2xl rounded border border-gray-300 p-4">
        <div className={styles.row}>
          <label className={styles.label}>Select Algorithm:</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="rounded border border-gray-300 p-2"
          >
            {Object.keys(algorithms).map((key) => (
              <option value={key} key={key}>
                {algorithms[key]}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Numbers of elements:</label>
          <input
            className={styles.input}
            type="text"
            value={numberOfElements}
            onChange={(e) => setNumberOfElements(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Delay in ms:</label>
          <input
            className={styles.input}
            type="text"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <button
            className="ml-0 w-1/2 min-w-fit bg-cyan-500"
            onClick={handleSubmit}
          >
            Generate
          </button>
          <button
            className="mr-0 w-1/2 min-w-fit bg-amber-500"
            onClick={() => onStartSorting(delay)}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
