import { useState } from "react";
import { cn } from "~/lib/utils";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  text,
  children,
  position = "top",
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const positionClasses = {
    top: "left-1/2 -translate-x-1/2 -top-8",
    bottom: "left-1/2 -translate-x-1/2 top-full mt-2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-flex group"
      onClick={() => setOpen(!open)} // toggle en móvil
      onMouseLeave={() => setOpen(false)} // resetea en desktop
    >
      {children}
      <span
      
        className={cn(
          "absolute bg-gray-800 text-gray-200 text-xs px-2.5 py-1.5 rounded opacity-0 transition whitespace-nowrap pointer-events-none",
          positionClasses[position],
          // Hover en desktop + open en móvil
          "group-hover:opacity-100",
          open && "opacity-100"
        )}
      >
        {text}
      </span>
    </div>
  );
}
