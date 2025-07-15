"use client";

import { useBoolean } from "@/hooks/useBoolean";
import authService from "@/lib/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { router } from "@/lib/router";

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

const config = {
  login: {
    schema: loginSchema,
    onSubmit: async (
      data: z.infer<typeof loginSchema>,
      register: UseFormReturn<typeof loginSchema>,
    ) => {
      const [error] = await authService.login(data.email, data.password);

      if (error) {
        register.setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        router.replace("/");
      }
    },
    primaryButtonText: "Login",
    primaryButtonTextLoading: "Logging in...",
  },
  register: {
    schema: registerSchema,
    onSubmit: async (data: z.infer<typeof registerSchema>) => {
      await authService.register(data);
    },
    primaryButtonText: "Register",
    primaryButtonTextLoading: "Registering...",
  },
  resetPassword: {
    schema: resetPasswordSchema,
    onSubmit: async (data: z.infer<typeof resetPasswordSchema>) => {
      await authService.resetPassword(data.email);
    },
    primaryButtonText: "Reset Password",
    primaryButtonTextLoading: "Resetting Password...",
  },
};
const AuthForm = () => {
  const pathname = usePathname();
  const mode = pathname.slice(1);
  const { schema, onSubmit, primaryButtonText, primaryButtonTextLoading } =
    config[mode as keyof typeof config];

  const register = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <Form {...register}>
      <form
        onSubmit={register.handleSubmit((e) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSubmit(e as any, register as any),
        )}
        className="grid gap-2"
      >
        {mode === "register" && <FormInput name="name" placeholder="Name" />}
        <FormInput name="email" placeholder="Email" />
        <Password name="password" placeholder="Password" />

        {register.formState.errors.root ? (
          <FormMessage className="text-center">
            {register.formState.errors.root.message}
          </FormMessage>
        ) : null}

        <Button
          type="submit"
          disabled={register.formState.isSubmitting}
          className="mt-4"
        >
          {register.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {register.formState.isSubmitting
            ? primaryButtonTextLoading
            : primaryButtonText}
        </Button>
      </form>
    </Form>
  );
};

const FormInput = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} />
          </FormControl>
        </FormLabel>
        <FormMessage />
      </FormItem>
    )}
  />
);

const Password = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  const { value: showPassword, toggle: toggleShowPassword } = useBoolean();

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="relative w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={showPassword ? "text" : "password"}
                  className="grow"
                />
              </FormControl>
              <Button
                variant="ghost"
                onClick={toggleShowPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AuthForm;
