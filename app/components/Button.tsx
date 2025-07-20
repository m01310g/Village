import clsx from "clsx";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondaryColor" | "secondaryMono" | "tertiary";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showDot?: boolean;
}

const Button = ({
  size = "md",
  color = "primary",
  disabled = false,
  children,
  onClick,
  showDot = false,
}: ButtonProps) => {
  const sizeClasses = {
    sm: "inline-flex items-center justify-center h-8 px-[0.875rem] py-[0.5625rem] rounded-[4px] text-title-4",
    md: "w-[10.4688rem] h-[2.5rem] px-5 py-3 rounded-[8px] text-title-3",
    lg: "h-[2.8125rem] w-full px-2 py-3 rounded-[8px] text-title-3",
  };

  const colorClasses = {
    primary: "bg-background-brand text-text-onprimary hover:bg-sky-600",
    secondaryColor:
      "bg-background-primary text-text-brand border border-border-brand hover:bg-background-brandSecondary",
    secondaryMono:
      "bg-background-primary text-text-secondary border border-neutral-400 hover:bg-neutral-50",
    tertiary:
      "bg-background-primary text-text-secondary border border-neutral-400",
  };

  const disabledColorClasses = {
    primary: "bg-neutral-300 text-text-onprimary cursor-not-allowed",
    secondaryColor:
      "bg-background-primary text-text-disabled border border-border-disabled cursor-not-allowed",
    secondaryMono: "",
    tertiary:
      "bg-background-primary text-text-disabled border border-border-disabled cursor-not-allowed",
  };

  return (
    <button
      className={clsx(
        "flex items-center justify-center",
        sizeClasses[size],
        disabled ? disabledColorClasses[color] : colorClasses[color],
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="relative flex items-center justify-center">
        <span className="inline-block">{children}</span>
        {showDot && (
          <span className="absolute -right-2 top-0.5 h-[4px] w-[4px] rounded-full bg-border-danger" />
        )}
      </span>
    </button>
  );
};

export default Button;
