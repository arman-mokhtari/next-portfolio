import { ReactNode } from "react";
// import type { Metadata } from "next";
import { getAdmin } from "@/backend/libs/actions/user.action";

export async function generateMetadata() {
    try {

        const admin = await getAdmin();
        
  
      const { metaTitle, metaDesc } = admin.home;
  console.log("admin data: ",metaTitle, metaDesc)
      return {
        alternates: {
          canonical: "/",
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
      // Return a default or fallback metadata in case of an error
      return {
        title: "Fallback Title",
        description: "Fallback Description",
        keywords: [],
        twitter: {},
      };
    }
  }

// export const metadata: Metadata = {
//   title: "وبسایت شخصی",
//   description:
//     "اینجا مکانی است که من محتوا و ایده‌های خود را با دیگران به اشتراک می‌گذارم و امیدوارم که این تجربه برای دیگران نیز مفید و جذاب باشد.",
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//     },
//   },
// };

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
