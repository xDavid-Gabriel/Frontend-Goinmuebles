"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLoading, useToggle } from "@/hooks";
import { useState } from "react";
import { LoginValidation } from "@/lib/validations/login/login";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInputWithEye } from "@/components/forms";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LoginApi } from "@/server/login";
import { useStateAuthContext } from "@/context";

const loginCtrl = new LoginApi();

export const Login = () => {
  const { login } = useStateAuthContext();
  const router = useRouter();
  const { state: notification, toggle: setNotification } = useToggle();

  const [messageError, setMessageError] = useState("");
  const { isLoading, startLoading, endLoading } = useLoading();
  const {
    isLoading: isLoadingOverlay,
    startLoading: startLoadingOverlay,
    endLoading: endLoadingOverlay,
  } = useLoading();

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    try {
      const valuesApi = {
        correo_electronico: values.email,
        password: values.password,
      };

      startLoading();
      const { data } = await loginCtrl.sendLogin(valuesApi);
      const user = await login(data.token);

      endLoading();

      form.reset();
      startLoadingOverlay();
      // Mostrar el overlay antes de redirigir
      // Redirigir
      if (user.rol === "Gestor" && user.user.id_persona_rol === "1") {
        router.push("/user-dashboard/gestor/natural/perfil");
      }
      if (user.rol === "Gestor" && user.user.id_persona_rol === "2") {
        router.push("/user-dashboard/gestor/juridica/perfil");
      }
      if (user.rol === "Inversionista" && user.user.id_persona_rol === "1") {
        router.push("/user-dashboard/inversor/natural/perfil");
      }
      if (user.rol === "Inversionista" && user.user.id_persona_rol === "2") {
        router.push("/user-dashboard/inversor/juridica/perfil");
      }
      // Una vez que la redirección se haya completado
    } catch (error: any) {
      if (error) {
        endLoadingOverlay();
        setMessageError(error.response.data.message);
        setNotification();
        setTimeout(() => {
          setNotification();
          endLoading();
        }, 3500);
      }
    }
  };

  return (
    <>
      {notification && (
        <Alert variant="destructive" className="bg-red-500 text-white mb-5">
          <AlertCircle className="h-4 w-4 fill-white" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{messageError}</AlertDescription>
        </Alert>
      )}
      {isLoadingOverlay && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="space-y-4 flex flex-col items-center">
            <div className="animate-spin w-16 h-16 border-t-4 border-white rounded-full"></div>
            <p className="text-white font-bold text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-3xl">
              Redirigiendo al dashboard...
            </p>
          </div>
        </div>
      )}
      <Form {...form}>
        <form
          className="flex flex-col gap-7"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Usuario"
                    variant="primary-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordInputWithEye
            control={form.control}
            name="password"
            variant="primary-normal"
          />
          <Button
            type="submit"
            variant="primary-blue"
            className="w-fit px-20 rounded-none mx-auto disabled:bg-forest-green/80"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </>
  );
};
