const Divider = ({ otherClass }: any) => {
  return (
    <hr
      className={`theme-border-color mx-4 my-3 h-px border-t-2 bg-transparent ${otherClass}`}
    />
  );
};

export default Divider;
