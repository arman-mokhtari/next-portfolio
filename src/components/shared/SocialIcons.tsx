import { getAdmin } from "@/backend/libs/actions/user.action";
import { socialData } from "@/constants/socialData";
import Image from "next/image";

const SidebarSocial = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center gap-4 ">
      {socialData.map(({ ariaLabel, title, href, img, id }) => (
        <a
          key={id}
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
            key={id}
            aria-label={ariaLabel}
            className="icon-color duration-200 ease-linear hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
};

export default SidebarSocial;
