import { ModeToggle } from "./dark-theme-toggle";
import LoggedInOut from "./logged-in-out";

export default function Footer() {
  return (
    <div className="flex flex-row w-full justify-between px-6 py-3 fixed bottom-0 bg-white dark:bg-stone-950">
      <ModeToggle />
      <LoggedInOut />
    </div>
  );
}
