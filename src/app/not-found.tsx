import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex grow items-center justify-center bg-primary/5 p-4">
      <Card className="max-w-[500px] overflow-hidden">
        <div className="p-8">
          <div className="mb-6 flex justify-center">
            <AlertCircle
              className="h-16 w-16 text-primary"
              aria-hidden="true"
            />
          </div>
          <h1 className="mb-4 text-center text-3xl font-bold">
            Oops! Page Not Found
          </h1>
          <p className="mb-8 text-center text-muted-foreground">
            {
              "We couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist."
            }
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="transform rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition duration-300 ease-in-out hover:scale-105 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <div className="bg-muted py-4">
          <p className="text-center text-sm text-muted-foreground">
            If you think this is a mistake, please contact support.
          </p>
        </div>
      </Card>
    </div>
  );
}
