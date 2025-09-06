import { RxCheckCircled } from "react-icons/rx";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="my-2 mt-4 flex items-center rounded-md border-green-600 bg-green-100 p-3 text-sm text-green-600">
      <div className="mx-auto flex items-center justify-center text-center">
        <RxCheckCircled className="mr-2 h-5 w-5 text-green-600" />
        <p>{message}</p>
      </div>
    </div>
  );
};
