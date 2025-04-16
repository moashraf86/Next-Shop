import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentConfirm() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p className="mt-4 text-lg">Thank you for your purchase.</p>
      <Button asChild variant="emphasis" className="mt-6" size="lg">
        <Link href="/" className="mt-6 px-4 py-2 text-white rounded">
          Return to Home
        </Link>
      </Button>
    </div>
  );
}
