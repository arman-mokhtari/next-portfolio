import { getAdmin } from "@/backend/libs/actions/user.action";
import Image from "next/image";
import SocialIconsSkeleton from "./SocialIconsSkeleton";

const SidebarSocial = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <SocialIconsSkeleton />;
  }

  const socialsArray = Object.values(admin?.socials || {});

  const displayedItems = socialsArray.filter(
    (item: any) => item.isDisplay === true
  );

  return (
    <div className="flex justify-center gap-4 ">
      {displayedItems.map(({ title, href, img }: any, i) => (
        <a
          key={i}
          title={title}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            alt={title}
            width={24}
            height={24}
            src={img}
            aria-label={title}
            className="icon-color duration-200 ease-linear hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
};

export default SidebarSocial;
