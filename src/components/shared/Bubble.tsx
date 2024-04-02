interface Props {
  text: string;
  otherClasses: string;
}
const Bubble = ({ text, otherClasses }: Props) => {
  return (
    <span
      className={`speech-bubble relative mb-3 mr-2 inline-block whitespace-nowrap rounded bg-blue-600 px-2 py-[.2rem] text-sm font-semibold text-light-800 ${otherClasses}`}
    >
      {text}
    </span>
  );
};

export default Bubble;
