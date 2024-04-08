import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  isSubmit: boolean;
}

const SubmitButton = ({ isSubmit }: Props) => {
  return (
    <Button
      className="hover-gradient mt-4 min-h-[46px] min-w-[140px] rounded-full px-4 py-3 text-base !text-light-900 shadow-lg shadow-slate-400 active:shadow-md dark:shadow-none"
      type="submit"
      disabled={isSubmit}
    >
      {isSubmit ? "در حال ثبت..." : "ثبت"}
    </Button>
  );
};

export default SubmitButton;
