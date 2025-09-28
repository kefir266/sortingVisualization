export type Algorithms = "QuickSort" | "BubbleSort" | "MergeSort";

export const algorithms: {
  [key in Algorithms]: Algorithms;
} = {
  QuickSort: "QuickSort",
  BubbleSort: "BubbleSort",
  MergeSort: "MergeSort",
};
