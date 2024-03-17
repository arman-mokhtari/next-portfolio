const HomeLines = () => {
  return (
    <div

    // sx={{
    //     width: 1,
    //     height: "100vh",
    //     position: "absolute",
    //     top: 0,
    // }}
    >
      <div

      // sx={{
      //     width: 1,
      //     height: "100vh",
      //     position: "relative",
      // }}
      >
        {["15%", "38%", "63%", "85%"].map((value, index) => (
          <span
            key={index}
            className={`absolute h-screen w-[0.8px] bg-slate-200 dark:bg-slate-900`}
            style={{left: `${value}`}}

          />
        ))}
      </div>
    </div>
  );
};

export default HomeLines;
