import { Button } from "./button";
import { ModeToggle } from "./dark-theme-toggle";
import { TypographyH1 } from "./typography/h1";
import LoggedInOut from "./logged-in-out";

export default function Sidebar() {
  return (
    <div
      className="flex w-20 flex-col items-center justify-center h-full uppercase"
      style={{
        transform: "rotate(-90deg)",
        transformOrigin: "center",
        whiteSpace: "nowrap",
      }}
    >
      <TypographyH1 className="">Record Collection</TypographyH1>
    </div>
  );
}
