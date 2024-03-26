import { checkRole } from "@/utils/roles";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminDashboardLink = () => {
  if (checkRole("admin"))
    return (
      <Link
        href="/admin/dashboard"
        className="flex items-center justify-start gap-4 bg-transparent px-4 py-3"
      >
        <Image
          src="/assets/icons/sidebar/dashboard.svg"
          alt="پنل ادمین"
          width={20}
          height={20}
          className="sidebar-svg"
        />
        <p className="base-medium">پنل ادمین</p>
      </Link>
    );
};

export default AdminDashboardLink;
