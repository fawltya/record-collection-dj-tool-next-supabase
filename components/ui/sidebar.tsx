import { Button } from "./button";
import { ModeToggle } from "./dark-theme-toggle";
import { useTheme } from "next-themes";
import { TypographyH1 } from "./typography/h1";

export default function Sidebar() {
  return (
    <>
      <div className="flex h-full flex-col px-3 py-4 md:px-2 gap-4">
        <TypographyH1 className="px-5">Record Collection</TypographyH1>
        <Button className="">Button 1</Button>
        <Button>Button 2</Button>
        <ModeToggle />
      </div>
    </>
  );
}
