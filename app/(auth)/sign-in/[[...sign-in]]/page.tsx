import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-66px)]">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
