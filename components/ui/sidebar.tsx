"use client";
import { TypographyH1 } from "./typography/h1";
import useMediaQuery from "@/utils/useMediaQuery";

export default function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const desktopRotateLogo = {
    transform: "rotate(-90deg)",
    transformOrigin: "center",
    whiteSpace: "nowrap",
  };
  return (
    <div
      className="flex w-full md:w-20 flex-col items-center justify-center h-full uppercase pt-6"
      style={isMobile ? {} : desktopRotateLogo}
    >
      <TypographyH1 className="">Record_Collection</TypographyH1>
    </div>
  );
}
