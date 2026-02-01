import { Button } from "@/components/shadcn-ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>Hello</h1>
      <Button>Click</Button>
      <div className="my-12 flex gap-x-8">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/profile">
          <Button>Profile</Button>
        </Link>
        <Link href="/admin">
          <Button>Admin</Button>
        </Link>
      </div>
    </div>
  );
}
