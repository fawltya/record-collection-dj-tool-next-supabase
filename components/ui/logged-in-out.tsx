import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "./button";

export default async function LoggedInOut() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex flex-row items-center gap-2">
      <form action={signOut}>
        <Button variant="destructive" size="full" type="submit">
          Logout
        </Button>
        {/* <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"> */}
        {/* Logout */}
        {/* </button> */}
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-white"
    >
      Login
    </Link>
  );
}
