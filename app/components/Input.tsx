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
    <form className="flex flex-col gap-3">
      <label className="text-title-3">
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
            "text-body-2 h-[45px] w-[343px] rounded-[4px] border border-neutral-200 bg-background-primary p-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none",
            hasError && "border-red-500 text-red-500",
            disabled && "cursor-not-allowed bg-neutral-200 text-neutral-50",
          )}
          disabled={disabled}
        />
        <div className="text-caption-3 flex justify-between">
          {(description || errorMessage) && (
            <p className={clsx(hasError ? "text-red-500" : "text-text-info")}>
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
    </form>
  );
};

export default Input;
