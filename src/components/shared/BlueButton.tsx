import { MouseEventHandler } from "react";
import { Button } from "../ui/button";
interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
}
const BlueButton = ({ onClick, text }: Props) => {
  return (
    <Button
      className="my-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500  focus:z-10 dark:bg-blue-800 dark:hover:bg-blue-700"
      onClick={onClick}
      type="button"
    >
      {text}
    </Button>
  );
};

export default BlueButton;
