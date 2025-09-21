import { createContext } from "react";
import { algorithms, type Algorithms } from "../constants/algorithms.ts";

type configType = { algorithm: Algorithms; setAlgorithm: (algorithm: Algorithms) => void };

export const ConfigContext = createContext<configType>({
  algorithm: algorithms.QuickSort,
} as configType);



