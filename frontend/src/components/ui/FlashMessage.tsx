type FlashMessageProps = {
  type: "success" | "error";
  message: string;
};

export function FlashMessage({ type, message }: FlashMessageProps) {
  const isSuccess = type === "success";

  return (
    <div
      role="status"
      className={`mb-4 rounded-xl px-4 py-2.5 text-sm font-bold ${
        isSuccess
          ? "bg-secondary/20 text-secondary"
          : "bg-primary/10 text-primary"
      }`}
    >
      {message}
    </div>
  );
}
