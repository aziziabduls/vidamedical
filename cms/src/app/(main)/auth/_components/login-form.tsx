"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { loginAdmin } from "@/lib/api";

const formSchema = z.object({
  email: z.email({ message: "Masukkan alamat email yang valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export function LoginForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      const res = await loginAdmin(data.email, data.password);
      toast.add({
        title: `Selamat datang, ${res.user.name}`,
        type: "success",
      });
      router.replace("/dashboard/default");
    } catch (error) {
      toast.add({
        title: "Login gagal",
        description: error instanceof Error ? error.message : "Email atau password salah.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">Email Admin</FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                placeholder="admin@vidamedical.id"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit" disabled={submitting}>
        {submitting ? "Memproses..." : "Masuk ke Dashboard"}
      </Button>
    </form>
  );
}
