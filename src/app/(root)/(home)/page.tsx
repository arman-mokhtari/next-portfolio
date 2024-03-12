import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen">
      <UserButton />
      <h1 className="font-bold">سلام روزبخیر</h1>
    </div>
  );
}
