// import TextTyped from "@/components/home/TextAnimate";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const banner = "https://cdn.workfolio.ir/images/portfolio/home/dev.png";
  return (
    <div className="h-screen">
      {/* <TextTyped /> */}
      <Image
        className="imp-static overflow-hidden object-cover object-top"
        alt="طراحی وبسایت و خدمات وب"
        src={banner}
        placeholder="blur"
        blurDataURL={banner}
        quality={100}
        priority
        fill
        sizes="100vw"
      />
      <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
    </div>
  );
}
