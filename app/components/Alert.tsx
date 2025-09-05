
import {
  InfoIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  XCircleIcon,
} from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: React.ReactNode }
> = {
  info: {
    container: "bg-blue-50 border-blue-200 text-primary-500/80",
    icon: <InfoIcon className="w-5 h-5 text-primary-500/80" />,
  },
  success: {
    container: "bg-green-50 border-green-300 text-green-800",
    icon: <CheckCircle2Icon className="w-5 h-5 text-green-600" />,
  },
  warning: {
    container: "bg-yellow-50 border-yellow-300 text-yellow-800",
    icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-600" />,
  },
  error: {
    container: "bg-red-50 border-red-300 text-red-800",
    icon: <XCircleIcon className="w-5 h-5 text-red-600" />,
  },
};

export default function Alert({ variant = "info", children }: AlertProps) {
  const { container, icon } = variantStyles[variant];

  return (
    <div
      className={`flex items-center gap-2 p-4 border rounded-lg ${container}`}
      role="alert"
    >
      {icon}
      <span className="text-sm">{children}</span>
    </div>
  );
}
