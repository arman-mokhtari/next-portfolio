"use client";

import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="absolute left-5 top-5 z-10 rounded-full border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer rounded-full">
          {mode === "light" ? (
            <div className="flex flex-row gap-1 rounded-full bg-slate-300 p-2">
              <p className="active-theme">تاریک</p>
              <Image
                src="/assets/icons/moon.svg"
                width={20}
                height={20}
                alt="sun"
                className="active-theme"
              />
            </div>
          ) : (
            <div className="flex flex-row gap-1 rounded-full bg-slate-400 p-2">
              <p className="active-theme">روشن</p>
              <Image
                src="/assets/icons/sun.svg"
                width={20}
                height={20}
                alt="moon"
                className="active-theme"
              />
            </div>
          )}
        </MenubarTrigger>
        <MenubarContent className=" absolute left-[2.5rem] top-[-1.4rem] mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-800 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                className={`${mode === item.value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value ? "active-theme" : "text-dark100_light900"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
