import { Button } from "./button";
import { ModeToggle } from "./dark-theme-toggle";
import { TypographyH1 } from "./typography/h1";
import LoggedInOut from "./logged-in-out";
const transform = `rotate(90deg)`;

export default function Sidebar() {
  return (
    <>
      <div
        className="flex w-20 flex-col gap-4"
        style={{ width: "100px", transform, transformOrigin: "left" }}
      >
        <TypographyH1>Record Collection</TypographyH1>
      </div>
    </>
  );
}
