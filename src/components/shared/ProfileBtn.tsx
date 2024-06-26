import { SignedIn, UserButton } from "@clerk/nextjs";

const ProfileBtn = () => {
  return (
    <SignedIn>
      <div className="fixed bottom-2 left-2 z-50">
        <UserButton
          userProfileMode="modal"
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-7 w-7",
            },
            variables: {
              colorPrimary: "#ff7000",
            },
          }}
        />
      </div>
    </SignedIn>
  );
};

export default ProfileBtn;
