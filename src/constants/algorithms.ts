export type Algorithms = "QuickSort" | "BubbleSort";

export const algorithms: {
  [key in Algorithms]: Algorithms;
} = {
  QuickSort: "QuickSort",
  BubbleSort: "BubbleSort",
};
