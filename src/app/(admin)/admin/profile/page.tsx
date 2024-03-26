import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return (
  <div>

  </div>
  );
};

export default Page;
