export default function InputTypeText({
  label,
  type = "text",
  name,
  value,
  placeholder = "",
  isRequired = false,
  onChange,
}: {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-primary uppercase tracking-wide text-xs font-bold mb-2"
      >
        {label}:
        {isRequired && (
          <span className="text-red-500 text-sm font-bold ml-1">*</span>
        )}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        required={isRequired}
        value={value}
        onChange={onChange}
        className="focus:shadow appearance-none border border-primary/50 focus:border-primary rounded w-full py-2 px-3 text-primary bg-elevated focus:outline-none focus:shadow-outline transition-all"
      />
    </div>
  );
}
