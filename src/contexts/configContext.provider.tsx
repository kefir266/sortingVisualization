import { type ReactNode, useState } from "react";
import { algorithms, type Algorithms } from "../constants/algorithms.ts";
import { useLocalstorageState } from "../hooks/useLocalstorageState.ts";
import { ConfigContext } from "./configContext.tsx";

export const ConfigContextProvider = ({ children }: { children: ReactNode }) => {
  const [alg, storeAlgorithm] = useLocalstorageState(
    "algorithm",
    algorithms.QuickSort,
  );
  const [algorithm, setAlg] = useState<Algorithms>(alg as Algorithms);

  const setAlgorithm = (algorithm: Algorithms) => {
    setAlg(algorithm);
    storeAlgorithm(algorithm);
  };

  return (
    <ConfigContext.Provider
      value={{
        algorithm,
        setAlgorithm,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};