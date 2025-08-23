
export default function ElementBar({ height }: { height: number }) {
  const style = {
    height: `${height}%`,
  };

  return <div className="flex-1 flex-col-reverse min-w-[1px] m-[1px] bg-blue-900" style={style}></div>;
}
