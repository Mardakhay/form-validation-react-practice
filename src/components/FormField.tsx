interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label>{label}</label>
      {children}
      {error && (
        <span className="error-msg">
          ❌ {error}
        </span>
      )}
    </div>
  );
}
