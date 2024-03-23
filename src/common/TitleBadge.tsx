import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
}
const TitleBadge = ({ title }: Props) => {
  return (
    <Badge className="background-slate300_slate700 mb-4 transition-none">
      <h2 className="p-1 text-xl text-blue-600">{title}</h2>
    </Badge>
  );
};

export default TitleBadge;
