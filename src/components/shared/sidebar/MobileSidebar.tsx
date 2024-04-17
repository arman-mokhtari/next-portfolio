import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import ProfileImage from "@/common/ProfileImage";
import Divider from "@/common/Divider";
import SidebarSocial from "../SocialIcons";
import SignButtons from "./SignButtons";
import AdminDashboardLink from "./AdminDashboardLink";
import MobileNavContent from "./MobileNavContent";
import { ScrollArea } from "@/components/ui/scroll-area";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger
        className="fixed right-5 top-5 z-10 cursor-pointer rounded-full bg-slate-300 p-1.5 shadow-lg shadow-gray-300 hover:bg-slate-400 active:shadow-md dark:bg-slate-400 dark:shadow-none dark:hover:bg-slate-300 lg:hidden"
        asChild
      >
        <div className="flex size-10 flex-col items-center justify-center gap-1.5 rounded-full">
          {Array.from({ length: 3 }, (_, i) => (
            <span
              key={i}
              className="w-[80%] border-b-[2.4px] border-slate-600 "
            />
          ))}
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sidebar-background custom-scrollbar z-50 flex h-full w-[350px] flex-col justify-between overflow-y-auto border-none px-0 py-2 shadow-2xl lg:hidden"
      >
        <div>
          <ProfileImage />
          <Divider />

          <ScrollArea dir="rtl" className="h-80 w-full">
            <SheetClose asChild>
              <div>
                <MobileNavContent />
                <AdminDashboardLink />
              </div>
            </SheetClose>
          </ScrollArea>
        </div>

        <div>
          <SignedOut>
            <SheetClose asChild>
              <SignButtons />
            </SheetClose>
          </SignedOut>
          <Divider />
          <SidebarSocial />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;
