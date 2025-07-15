"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { router } from "@/lib/router";
import authService, { User } from "@/lib/services/auth.service";
import useAuth from "@/lib/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email().toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
});

const resetPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
});

const resetPasswordConfirmSchema = z.object({
  email: z.string().email().toLowerCase(),
  code: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const config = {
  login: {
    schema: loginSchema,
    onSubmit: async (
      data: z.infer<typeof loginSchema>,
      register: UseFormReturn<typeof loginSchema>,
      setUser: (user: User | null) => void,
    ) => {
      const [error, user] = await authService.login(data.email, data.password);

      if (error) {
        register.setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        setUser(user);
        router.replace("/");
      }
    },
    primaryButtonText: "Login",
    primaryButtonTextLoading: "Logging in...",
    title: "Login",
    link: {
      label: "Forgot password?",
      href: "/reset-password",
    },
  },
  register: {
    schema: registerSchema,
    onSubmit: async (data: z.infer<typeof registerSchema>) => {
      await authService.register(data);
    },
    primaryButtonText: "Register",
    primaryButtonTextLoading: "Registering...",
    title: "Register",
    link: {
      label: "Already have an account?",
      href: "/login",
    },
  },
  "reset-password": {
    schema: resetPasswordSchema,
    onSubmit: async (
      data: z.infer<typeof resetPasswordSchema>,
      register: UseFormReturn<typeof resetPasswordSchema>,
    ) => {
      const [error] = await authService.resetPassword(data.email);

      if (error) {
        register.setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        router.replace(`/confirm-reset-password?email=${data.email}`);
      }
    },
    primaryButtonText: "Reset Password",
    primaryButtonTextLoading: "Resetting Password...",
    title: "Reset Password",
    link: {
      label: "Remember Password?",
      href: "/login",
    },
  },
  "confirm-reset-password": {
    schema: resetPasswordConfirmSchema,
    onSubmit: async (
      data: z.infer<typeof resetPasswordConfirmSchema>,
      register: UseFormReturn<typeof resetPasswordConfirmSchema>,
    ) => {
      if (data.newPassword !== data.confirmPassword) {
        register.setError("root", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      const [error] = await authService.verifyResetPasswordWithOtp(
        data.email,
        data.code,
        data.newPassword,
      );

      if (error) {
        register.setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.success("Password reset successfully");
        router.replace("/login");
      }
    },
    primaryButtonText: "Reset Password",
    primaryButtonTextLoading: "Reseting Password...",
    title: "Reset Password",
    link: {
      label: "Remember Password?",
      href: "/login",
    },
  },
};
const AuthForm = () => {
  const { setUser } = useAuth();
  const pathname = usePathname();
  const [email] = useQueryState("email");
  const mode = pathname.slice(1);
  const {
    schema,
    onSubmit,
    primaryButtonText,
    primaryButtonTextLoading,
    title,
    link,
  } = config[mode as keyof typeof config];

  const register = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email ?? "",
    },
  });
  return (
    <Form {...register}>
      <form
        onSubmit={register.handleSubmit((e) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSubmit(e as any, register as any, setUser),
        )}
        className="space-y-6 bg-white p-6 rounded-sm border-secondary-200"
      >
        <p className="text-black font-semibold text-sm">{title}</p>
        <FormInput name="name" label="Name" schema={schema} />
        <FormInput
          name="email"
          label="Email"
          schema={schema}
          disabled={!!email && mode === "confirm-reset-password"}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          schema={schema}
        />
        <FormInput
          name="newPassword"
          label="New Password"
          type="password"
          schema={schema}
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          schema={schema}
        />

        <FormInput name="code" label="OTP" type="otp" schema={schema} />

        {register.formState.errors.root ? (
          <FormMessage className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
            {register.formState.errors.root.message}
          </FormMessage>
        ) : null}

        <Button
          type="submit"
          disabled={register.formState.isSubmitting}
          className="mt-4 w-full"
        >
          {register.formState.isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          {register.formState.isSubmitting
            ? primaryButtonTextLoading
            : primaryButtonText}
        </Button>

        {link && (
          <div className="text-sm text-center">
            <Link
              href={link.href}
              type="button"
              className="font-medium text-secondary-500 hover:text-secondary-600"
            >
              {link.label}
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
};

const FormInput = ({
  name,
  placeholder,
  type,
  label,
  schema,
  defaultValue,
  disabled,
}: {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  schema:
    | typeof loginSchema
    | typeof registerSchema
    | typeof resetPasswordSchema
    | typeof resetPasswordConfirmSchema;
  defaultValue?: string;
  disabled?: boolean;
}) => {
  if (!(name in schema.shape)) {
    return null;
  }

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <FormControl>
            {type === "otp" ? (
              <div>
                <label className="block uppercase text-xs font-semibold text-gray-400 mb-1">
                  {label}
                </label>
                <InputOTP
                  containerClassName="justify-center-safe"
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            ) : (
              <Input
                {...field}
                placeholder={placeholder}
                type={type}
                defaultValue={defaultValue}
                disabled={disabled}
              />
            )}
          </FormControl>
          <FormMessage className="mt-1 text-sm text-red-600 dark:text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default AuthForm;
