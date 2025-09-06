// components\shared\form-error.tsx
import { FiAlertTriangle } from "react-icons/fi";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="my-2 mt-4 flex items-center rounded-md border-red-600 bg-red-100 p-3 text-sm text-red-600">
      <div className="mx-auto flex items-center justify-center text-center">
        <FiAlertTriangle className="mr-2 h-5 w-5 text-red-600" />
        <p>{message}</p>
      </div>
    </div>
  );
};
