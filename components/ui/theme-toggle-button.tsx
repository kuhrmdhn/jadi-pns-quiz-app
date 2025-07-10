"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggleButton() {
  const [themeText, setThemeText] = useState("Mode Gelap")
  const theme = useTheme()
  useEffect(() => {
    if (theme.theme === "dark") {
      setThemeText("Mode Terang")
    } else {
      setThemeText("Mode Gelap")
    }
  }, [theme.theme])

  return (
    <Button variant="ghost" className="px-0 md:px-2 mt-5 md:m-0" onClick={() => theme.setTheme((e) => e == "dark" ? "light" : "dark")}>
      <h1 className="md:hidden">{themeText}</h1>
      <Sun className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
      <Moon className="h-[1.2rem] w-[1.2rem] block dark:hidden" />
    </Button>
  )
}
