import ElementBar from "./ElementBar.tsx";

export default function ArrayGraph({
  array,
  className,
}: {
  array: { key: number; value: number }[];
  className?: string;
}) {
  const maxValue = Math.max(...array.map((element) => element.value));
  return (
    <div className={`${className} flex w-full items-end`}>
      {array.map((element) => (
        <ElementBar
          height={Math.round((element.value * 100) / maxValue)}
          key={element.key}
        ></ElementBar>
      ))}
    </div>
  );
}
