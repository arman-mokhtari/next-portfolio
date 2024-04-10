import Divider from "@/common/Divider";
interface Prop {
  heading: string;
  text: string;
}
const TitleHeading = ({ heading, text }: Prop) => {
  return (
    <div className="text-dark200_light800 mb-10 flex flex-col gap-2 text-center">
      <h1 className="text-2xl font-bold">{heading}</h1>
      <Divider otherClass="border-blue-600 flex self-center dark:border-blue-600 border-t-4 w-1/5" />
      <h2 className="text-lg">{text}</h2>
    </div>
  );
};

export default TitleHeading;
