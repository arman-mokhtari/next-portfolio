import Link from "next/link";

const SignButtons = () => {
  return (
    <div className="text-dark300_light700 flex items-center justify-center gap-3 text-xs">
      <Link href="/sign-in">
        <button className="outline-none">
          <p>ورود</p>
        </button>
      </Link>
      <hr className="theme-border-color h-4 border-r-2" />
      <Link href="/sign-up">
        <button className="outline-none">
          <p>ثبت نام</p>
        </button>
      </Link>
    </div>
  );
};

export default SignButtons;
