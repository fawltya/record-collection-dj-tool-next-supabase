import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Index() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
