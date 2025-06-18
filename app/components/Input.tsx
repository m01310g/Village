import clsx from "clsx";

interface InputProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  maxLength?: number;
  disabled?: boolean;
}

const Input = ({
  label,
  required = false,
  value,
  onChange,
  placeholder = "",
  description,
  errorMessage,
  maxLength,
  disabled = false,
}: InputProps) => {
  const hasError = Boolean(errorMessage);

  return (
    <div className="flex flex-col gap-3">
      <label className="text-title-3 text-text-primary">
        {label}
        {required && <span className="text-text-danger">*</span>}
      </label>
      <div className="flex flex-col gap-2">
        <input
          name="input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={clsx(
            "text-body-2 border-border-secondary h-[45px] w-[343px] rounded-[4px] border bg-background-primary p-3 placeholder:text-neutral-400 focus:outline-none",
            hasError && "border-border-danger text-text-danger",
            disabled
              ? "cursor-not-allowed bg-background-secondary text-neutral-400"
              : "text-neutral-900",
          )}
          disabled={disabled}
        />
        <div className="text-caption-3 flex justify-between">
          {(description || errorMessage) && (
            <p
              className={clsx(hasError ? "text-text-danger" : "text-text-info")}
            >
              {hasError ? errorMessage : description}
            </p>
          )}
          {maxLength !== undefined && (
            <p className="text-neutral-400">
              {value.length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
