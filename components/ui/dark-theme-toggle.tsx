"use client";

import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const renderIcon = () => {
    if (theme === "light" || (theme === "system" && systemTheme === "light")) {
      return <SunIcon className="h-[1.2rem] w-[1.2rem] text-white" />;
    } else {
      return <MoonIcon className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {renderIcon()}
    </Button>
  );
}
