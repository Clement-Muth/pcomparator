interface ErrorMessageProps {
  error?: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <span className="text-xs text-red9">{error}</span>;
};

export default ErrorMessage;
