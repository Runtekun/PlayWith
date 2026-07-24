import { AlertCircle, CheckCircle2 } from "lucide-react";

type FlashMessageProps = {
  type: "success" | "error";
  message: string;
};

export function FlashMessage({ type, message }: FlashMessageProps) {
  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      role="status"
      className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white ${
        isSuccess ? "bg-secondary" : "bg-primary"
      }`}
    >
      <Icon size={16} strokeWidth={2.5} />
      {message}
    </div>
  );
}
