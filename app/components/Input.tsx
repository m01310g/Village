import clsx from "clsx";

interface InputProps {
  label?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  maxLength?: number;
  disabled?: boolean;
  onCompositionStart?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionEnd?: React.CompositionEventHandler<HTMLInputElement>;
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
  onCompositionStart,
  onCompositionEnd,
}: InputProps) => {
  const hasError = Boolean(errorMessage);

  return (
    <div className="flex w-full flex-col gap-3">
      {label && (
        <label className="text-title-3 text-text-primary">
          {label}
          {required && <span className="text-text-danger">*</span>}
        </label>
      )}
      <div className="flex flex-col gap-2">
        <input
          name="input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={clsx(
            "text-body-2 h-[2.8125rem] w-full rounded-[4px] border bg-background-primary p-3 placeholder:text-neutral-400 focus:outline-none",
            hasError
              ? "border-border-danger text-text-danger"
              : disabled
                ? "border-border-secondary bg-neutral-100 text-neutral-400"
                : "border-border-secondary text-text-primary",
          )}
          disabled={disabled}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
        />
        {(description || errorMessage) && (
          <div className="text-caption-3 flex justify-between">
            <p
              className={clsx(hasError ? "text-text-danger" : "text-text-info")}
            >
              {hasError ? errorMessage : description}
            </p>
            {maxLength !== undefined && (
              <p className="text-neutral-400">
                {value.length}/{maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
