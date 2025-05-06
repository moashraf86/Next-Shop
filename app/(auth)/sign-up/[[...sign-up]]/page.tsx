import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-66px)]">
      <SignUp
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </div>
  );
}
