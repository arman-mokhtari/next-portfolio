import { ReactNode } from "react";
import { getAdmin } from "@/backend/libs/actions/user.action";

export async function generateMetadata() {
  try {
    const admin = await getAdmin();

    const { metaTitle, metaDesc } = admin.activities;

    return {
      alternates: {
        canonical: "/activities",
      },
      title: metaTitle,
      description: metaDesc,
      twitter: {
        title: metaTitle,
        description: metaDesc,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Fallback Title",
      description: "Fallback Description",
      twitter: {},
    };
  }
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
