import * as React from "react"
import { cn } from "@/utils/shadcn/cn"
import Image from "next/image"
import { Button } from "./button"
import { Eye, EyeClosed } from "lucide-react"
import VisiblePasswordIcon from "../elements/icons/VisiblePasswordIcon"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  withLabel?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, withLabel = true, type = "text", id, placeholder, ...props }, ref) => {

  const [visiblePassword, setVisiblePassword] = React.useState(false)
  function handleVisiblePassword(e: React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault()
    setVisiblePassword(state => !state)
  }
  return (
    <div className="relative">
      <input
        id={id}
        type={type !== "password" ? type : visiblePassword ? "text" : "password"}
        className={cn(
          "peer placeholder-transparent flex h-12 w-full rounded-md border border-input bg-gray-100 dark:bg-black/95 autofill:bg-gray-100 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
      {
        withLabel &&
        <label
          htmlFor={id}
          className="absolute -top-6 left-3 text-sm text-slate-800 peer-focus:text-primary peer-focus:-top-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 duration-200"
        >
          {placeholder}
        </label>
      }
      {
        type === "password" &&
        <span role="button" className="absolute right-7 top-4" onClick={(e) => handleVisiblePassword(e)}>
          <VisiblePasswordIcon isClosed={visiblePassword} />
        </span>
      }
    </div>

  )
}
)
Input.displayName = "Input"

export { Input }
