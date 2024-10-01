import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/helpers";
import { cn } from "@/lib/utils";
import { CheckCircle, Calendar, CreditCard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { amount: number };
}) {
  const amount = searchParams.amount;
  if (!amount) redirect("/");

  return (
    <div className="my-20 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/80 shadow-xl backdrop-blur-sm">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center font-medium text-gray-600">
            Thank you for your purchase. Your order has been processed.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 py-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Order Date</span>
              </div>
              <span className="text-sm text-gray-800">September 24, 2024</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Total Amount</span>
              </div>
              <span className="text-lg font-semibold text-gray-800">
                {formatPrice(amount)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Link href="/" className={cn(buttonVariants(), "w-full")}>
            Return to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
