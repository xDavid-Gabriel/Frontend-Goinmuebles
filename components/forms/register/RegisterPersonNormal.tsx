"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterPersonNormalValidation } from "@/lib/validations/register/register-person-normal";
import { Checkbox } from "@/components/ui/checkbox";

import { PasswordInputWithEye } from "@/components/forms";
import { useLoading, useToggle } from "@/hooks";
import { RegisterGestorApi, RegisterInversorApi } from "@/api";
import { useState } from "react";
import { BasicModal } from "@/components/shared";
import { useRouter } from "next/navigation";
import { IoWarningOutline } from "react-icons/io5";
import { useStateAuthContext } from "@/context";

interface Props {
  onChangeToFisica: () => void;
  styleCheckBox: string;
  userType: "gestor" | "inversor";
}

const registerInversorCtrl = new RegisterInversorApi();
const registerGestorCtrl = new RegisterGestorApi();
export const RegisterPersonNormal = ({
  onChangeToFisica,
  styleCheckBox,
  userType,
}: Props) => {
  const { login, user } = useStateAuthContext();
  const router = useRouter();
  const { state: notification, toggle: setNotification } = useToggle();
  const { state: modalSucces, toggle: setmodalSucces } = useToggle();
  const [messageError, setMessageError] = useState("");
  const { isLoading, startLoading, endLoading } = useLoading();
  const {
    isLoading: isLoadingOverlay,
    startLoading: startLoadingOverlay,
    endLoading: endLoadingOverlay,
  } = useLoading();

  const form = useForm<z.infer<typeof RegisterPersonNormalValidation>>({
    resolver: zodResolver(RegisterPersonNormalValidation),
    defaultValues: {
      names: "",
      last_name: "",
      phone: "",
      dni: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof RegisterPersonNormalValidation>
  ) => {
    try {
      const valuesApi = {
        nombres: values.names,
        apellidos: values.last_name,
        celular: values.phone,
        numero_documento: values.dni,
        correo_electronico: values.email,
        password: values.password,
        terminos_condiciones: values.acceptTerms ? 1 : 0,
      };

      startLoading();
      if (userType === "inversor") {
        const { data } = await registerInversorCtrl.sendPersonNormal(valuesApi);
        login(data.token);
      } else {
        const { data } = await registerGestorCtrl.sendPersonNormal(valuesApi);
        login(data.token);
      }
      endLoading();
      //Hooks que cambia de estado para activar el modal
      setmodalSucces();
      form.reset();
      // Redirigir
    } catch (error: any) {
      if (error) {
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
      <BasicModal
        title="🌟 ¡Gracias por tu registo! 🌟"
        description={
          <>
            Tu cuenta ha sido creada con éxito. ¡Bienvenido a nuestra
            plataforma!
          </>
        }
        open={modalSucces}
        setOpen={setmodalSucces}
        onRedirection={() => {
          startLoadingOverlay();
          if (user.rol === "Gestor" && user.user.id_persona_rol === "1") {
            router.push("/user-dashboard/gestor/natural/perfil");
          }
          if (user.rol === "Gestor" && user.user.id_persona_rol === "2") {
            router.push("/user-dashboard/gestor/juridica/perfil");
          }
          if (
            user.rol === "Inversionista" &&
            user.user.id_persona_rol === "1"
          ) {
            router.push("/user-dashboard/inversor/natural/perfil");
          }
          if (
            user.rol === "Inversionista" &&
            user.user.id_persona_rol === "2"
          ) {
            router.push("/user-dashboard/inversor/juridica/perfil");
          }
        }}
      />
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
      {notification && (
        <Alert variant="destructive" className="bg-red-500 text-white">
          <AlertCircle className="h-4 w-4 fill-white" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{messageError}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          className="grid sm:grid-cols-2 gap-7"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-3 sm:col-span-2">
            <label htmlFor="terms">Eres una persona jurídica?</label>
            <Checkbox
              id="terms"
              // checked={isChecked}
              onCheckedChange={onChangeToFisica}
              className={styleCheckBox}
            />
          </div>
          <FormField
            control={form.control}
            name="names"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Nombres Completos"
                    variant={
                      userType === "gestor" ? "primary-red" : "primary-teal"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Apellidos Completos"
                    variant={
                      userType === "gestor" ? "primary-red" : "primary-teal"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="DNI"
                    variant={
                      userType === "gestor" ? "primary-red" : "primary-teal"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Celular"
                    variant={
                      userType === "gestor" ? "primary-red" : "primary-teal"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Correo Electrónico"
                    variant={
                      userType === "gestor" ? "primary-red" : "primary-teal"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <PasswordInputWithEye
              control={form.control}
              name="password"
              variant={userType === "gestor" ? "primary-red" : "primary-teal"}
            />
            <div className="flex gap-2 mt-2">
              <IoWarningOutline className="flex-none" />
              <small>
                Para una contraseña segura, considera al menos una mayúscula,
                una minuscula y un número
              </small>
            </div>
          </div>

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 sm:col-span-2 justify-center sm:justify-end">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={styleCheckBox}
                  />
                </FormControl>
                <div className="!mt-0">
                  <a
                    href="https://www.google.com/"
                    target="_blank"
                    className="text-[15px]"
                  >
                    Aceptar términos y condiciones
                  </a>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={userType === "gestor" ? "primary-red-100" : "primary-teal"}
            className="w-fit mx-auto sm:col-span-2 sm:px-20 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "EVIANDO..." : "CONTINUAR"}
          </Button>
        </form>
      </Form>
    </>
  );
};
