import clsx from "clsx";
import ErrorMessage from "~/components/Input/Error";

interface LabelProps {
  label?: string;
  error?: string;
  name?: string;
}

const Label = ({ label, error, name }: LabelProps) => {
  return (
    <div className="flex items-center mb-2 justify-between w-full">
      {label ? (
        <label htmlFor={name} className={clsx("text-sm", error ? "text-red9" : "text-black")}>
          {label}
        </label>
      ) : null}
      {error ? <ErrorMessage error={error} /> : null}
    </div>
  );
};

export default Label;
