"use client";

import { DigitalWalletApi } from "@/api";
import { BasicModal } from "@/components/shared";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStateAuthContext } from "@/context";
import { useLoading, useToggle } from "@/hooks";
import { ENV } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
export const RetreatFormValidation = z.object({
  amount: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "El monto es obligatorio y debe ser un número mayor que cero",
    }),
  verification_code: z
    .string()
    .nonempty("El código de verificación es obligatorio"),
});

const digitalWalletApiCtrl = new DigitalWalletApi();
export const RetreatForm = () => {
  const { user } = useStateAuthContext();
  const { state: isCod, toggle: setIsCod } = useToggle();
  const { state, toggle } = useToggle();
  const { state: stateRetreat, toggle: toggleRetreat } = useToggle();
  const [messageError, setMessageError] = useState("");
  const { isLoading, startLoading, endLoading } = useLoading();
  const {
    isLoading: isLoadingRetreat,
    startLoading: startLoadingRetreat,
    endLoading: endLoadingRetreat,
  } = useLoading();
  const form = useForm<z.infer<typeof RetreatFormValidation>>({
    resolver: zodResolver(RetreatFormValidation),

    defaultValues: {
      amount: "",
      verification_code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RetreatFormValidation>) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario!.toString(),
      monto: +values.amount,
      codigo: values.verification_code,
    };
    try {
      startLoadingRetreat();
      await digitalWalletApiCtrl.postRetreat(valuesApi);
      endLoadingRetreat();
      form.reset();
      toggleRetreat();
    } catch (error: any) {
      setMessageError(error.response.data.message);

      setTimeout(() => {
        setMessageError("");
        endLoadingRetreat();
      }, 3500);
    }
    console.log({ valuesApi });
  };

  const handleButtonClick = async () => {
    try {
      startLoading();
      await axios.post(
        `${ENV.API_URL}/${ENV.ENDPOINTS.GENERATE_CODE}/${user.user.codigo_usuario}`
      );
      endLoading();
      toggle();
      // Haz algo con la respuesta si es necesario
    } catch (error) {
      console.error("Error al enviar el POST:", error);
    }
  };
  return (
    <>
      <BasicModal
        title="🌟 ¡Codigo Generado! 🌟"
        description={
          <>
            {" "}
            El código ha sido enviado a su correo electrónico{" "}
            <strong>{user.user.correo_electronico}</strong> Por favor, revíselo.
          </>
        }
        open={state}
        setOpen={toggle}
        onRedirection={() => setIsCod()}
      />

      <BasicModal
        title="🌟 ¡Retiro registrado! Esperando aprobación.🌟"
        description={
          <>
            ¡Buenas noticias! Hemos registrado con éxito tu solicitud de retiro.
            Ahora, nuestro equipo revisará la información proporcionada para
            garantizar que todo esté en orden. Una vez que el proceso de
            revisión haya concluido, recibirás una notificación sobre el estado
            de tu solicitud. Te agradecemos por tu paciencia y comprensión
            mientras trabajamos en validar tu retiro. Estamos comprometidos en
            procesar todas las solicitudes con la máxima eficiencia y seguridad
            posible. Mantente atento a las actualizaciones.
          </>
        }
        open={stateRetreat}
        setOpen={toggleRetreat}
      />
      <Form {...form}>
        <form
          className="grid gap-3 sm:gap-7 sm:grid-cols-2 max-w-[280px] sm:max-w-[680px] mx-auto mb-14"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Input Monto*/}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center border-2 border-teal py-10 px-4 sm:px-8 md:px-[80px]">
                <FormLabel className="text-sm md:text-base lg:text-[20px]">
                  Monto
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Ingrese monto"
                    className="outline-none w-full disabled:opacity-50 disabled:disabled:cursor-not-allowed rounded-[10px] border-[3px] font-josefin p-[5px_10px] border-teal text-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input  Código de Verificación*/}
          <FormField
            control={form.control}
            name="verification_code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center border-2 border-teal py-10 px-4 sm:px-8 md:px-[80px]">
                <FormLabel className="text-sm md:text-base lg:text-[20px] whitespace-nowrap">
                  Código de Verificación
                </FormLabel>
                <FormControl>
                  {isCod ? (
                    <Input
                      type="text"
                      {...field}
                      placeholder="Ingrese código"
                      className="outline-none w-full rounded-[10px] border-[3px] font-josefin p-[5px_10px] border-teal text-center"
                    />
                  ) : (
                    <button
                      type="button"
                      className="outline-none w-full rounded-[10px] border-[3px] font-josefin p-[5px_10px] border-teal text-center bg-teal text-white hover:bg-teal/80 disabled:opacity-50"
                      onClick={handleButtonClick}
                      disabled={isLoading}
                    >
                      {isLoading ? "Enviando..." : "Generar código"}
                    </button>
                  )}
                </FormControl>
                {messageError.length > 0 ? (
                  <span className="text-sm font-medium text-red-400 dark:text-red-900">
                    {messageError}
                  </span>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center col-span-2">
            <Button
              type="submit"
              variant="primary-teal"
              disabled={isLoadingRetreat}
            >
              {isLoadingRetreat ? "Enviando..." : "SOLICITAR RETIRO"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
