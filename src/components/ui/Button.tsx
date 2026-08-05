import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  isLoading?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-background shadow-soft hover:scale-[0.98] hover:shadow-lift",
  secondary:
    "border-secondary bg-background text-secondary hover:bg-surface hover:scale-[0.98]",
};

export function Button({
  className,
  children,
  variant = "primary",
  icon,
  isLoading = false,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-14 items-center justify-center gap-button-gap rounded-button border px-card-gap text-small font-semibold transition-premium focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? <Loader2 aria-hidden="true" className="size-5 animate-spin" /> : icon}
      <span>{children}</span>
    </button>
  );
}
