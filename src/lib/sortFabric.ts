import QuickSort from "@kefir266/algorithms/sort/QuickSort.ts";
import BubbleSort from "@kefir266/algorithms/sort/BubbleSort.ts";
import MergeSort from "@kefir266/algorithms/sort/MergeSort.ts";
import { algorithms, type Algorithms } from "../constants/algorithms.ts";

export type SortArray<T> = QuickSort<T> | BubbleSort<T> | MergeSort<T>;


export default function createSortArray<T>(algorithm: Algorithms, array: Array<T> | SortArray<T>): SortArray<T> {
  switch (algorithm) {
    case algorithms.BubbleSort:
      return new BubbleSort(array);
    case algorithms.QuickSort:
      return new QuickSort(array);
    case algorithms.MergeSort:
      return new MergeSort(array);
    default:
      throw new Error("Invalid algorithm");
  }
}
