type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  dir?: "rtl" | "ltr";
  type?: string;
  placeholder?: string;
};

export function TextField({ label, name, defaultValue, dir = "rtl", type = "text", placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        dir={dir}
        placeholder={placeholder}
        className="glass w-full rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none placeholder:text-brand-ink-muted focus:border-brand-rose/50"
      />
    </label>
  );
}

export function TextAreaField({ label, name, defaultValue, dir = "rtl", placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        dir={dir}
        placeholder={placeholder}
        rows={3}
        className="glass w-full resize-y rounded-xl px-4 py-2.5 text-sm leading-relaxed text-brand-ink outline-none placeholder:text-brand-ink-muted focus:border-brand-rose/50"
      />
    </label>
  );
}
