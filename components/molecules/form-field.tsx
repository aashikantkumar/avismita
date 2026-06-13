import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isTextarea?: boolean;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export function FormField({ label, isTextarea, textareaProps, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{label}</Label>
      {isTextarea ? (
        <Textarea {...textareaProps} suppressHydrationWarning />
      ) : (
        <Input {...props} suppressHydrationWarning />
      )}
    </div>
  );
}
