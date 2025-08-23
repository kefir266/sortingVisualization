export const generateRandomArray = (length, min = 0, max = 100) => {
  if (length <= 0) {
    return [];
  }
  return Array.from({ length }, (_, ind) => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
    key: ind,
  }));
};
