import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {cn} from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string,
  label?: string,
  type?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void; 
  onFocus?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  label,
  type,
  placeholder,
  required,
  disabled,
  errors,
  className,  
  defaultValue = "",
  onBlur,
  onFocus,
}, ref) => {
  const {pending} = useFormStatus()

  return (
    <div className="space-y-2">
      <div className="space-y-1">
       {label ? (
        <Label htmlFor={id}
          className="text-xs font-semibold text-neutral-700"
        >
          {label}
        </Label>
       ): null} 
       <Input
        onBlur={onBlur}
        defaultValue={defaultValue}
        required={required}
        disabled={pending|| disabled}
        name={id}
        id={id}
        ref={ref}
        placeholder={placeholder}
        type={type}
        className={cn(
          "text-sm px-2 py-1 h-7",
          className,
        )}
        onFocus={onFocus}
        aria-describedby={`${id}-error`}
       />
      </div>
      <FormErrors 
        id={id}
        errors={errors}
      />
    </div>
  )
});

FormInput.displayName = "FormInput";
