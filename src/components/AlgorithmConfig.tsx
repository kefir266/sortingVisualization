import { type JSX, useState, useEffect } from "react";
import { useLocalstorageState } from "../hooks/useLocalstorageState";
import { algorithms } from "../constants/algorithms";
import styles from "./AlgorithmConfig.module.css";
import { useConfig } from "../hooks/useConfig.ts";

enum Status {
  Started = "Started",
  Paused = "Paused",
  Stopped = "Stopped",
}

export default function AlgorithmConfig({
  finished,
  onGenerateArray,
  onStartSorting,
  onPauseSorting,
  onResumeSorting,
  className,
}: {
  finished: boolean;
  onGenerateArray: (numberOfElements: number) => void;
  onStartSorting: (delay: number) => void;
  onPauseSorting: () => void;
  onResumeSorting: (delay: number) => void;
  className?: string;
}): JSX.Element {
  const [status, setStatus] = useState(Status.Stopped);
  const { algorithm, setAlgorithm } = useConfig();

  // TODO move it to configContext
  const [numberOfElements, setNumberOfElements] = useLocalstorageState(
    "numberOfElements",
    10,
  );
  // TODO move it to configContext
  const [delay, setDelay] = useLocalstorageState("delay", 1);

  useEffect(() => {
    if (finished) {
      setStatus(Status.Stopped);
    }
  }, [finished]);

  const handleSubmit = () => {
    onGenerateArray(+numberOfElements);
  };

  const handleStartPauseSorting = (delay: number) => {
    switch (status) {
      // Start
      case Status.Stopped: {
        onStartSorting(delay);
        setStatus(Status.Started);
        break;
      }

      // Pause
      case Status.Started: {
        onPauseSorting();
        setStatus(Status.Paused);
        break;
      }

      // Resume
      case Status.Paused: {
        onResumeSorting(delay);
        setStatus(Status.Started);
        break;
      }

      default: {
        onPauseSorting();
        setStatus(Status.Stopped);
        break;
      }
    }
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
            className="ml-0 w-1/2 min-w-fit bg-cyan-500 disabled:cursor-not-allowed disabled:bg-cyan-200"
            onClick={handleSubmit}
            disabled={status !== Status.Stopped}
          >
            Generate
          </button>
          <button
            className="mr-0 w-1/2 min-w-fit bg-amber-500"
            onClick={() => handleStartPauseSorting(delay)}
          >
            {status === Status.Stopped
              ? "Start"
              : status === Status.Started
                ? "Pause"
                : status === Status.Paused
                  ? "Resume"
                  : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
}
