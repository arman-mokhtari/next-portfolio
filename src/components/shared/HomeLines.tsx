const HomeLines = () => {
  return (
    <div className="">
      {["15%", "38%", "63%", "85%"].map((value, i) => (
        <span
          key={i}
          className={`absolute h-screen w-[0.8px] bg-slate-200 dark:bg-slate-900`}
          style={{ left: `${value}` }}
        />
      ))}
    </div>
  );
};

export default HomeLines;
