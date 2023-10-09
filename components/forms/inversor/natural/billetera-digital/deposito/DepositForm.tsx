"use client";
import { DigitalWalletApi } from "@/server";
import { BasicModal } from "@/components/shared";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillCloudCheckFill } from "react-icons/bs";
import * as z from "zod";

export const DepositFormValidation = z.object({
  amount: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "El monto es obligatorio y debe ser un número mayor que cero",
    }),
  voucher: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo comprobante es obligatorio."
    ),
});

const digitalWalletApiCtrl = new DigitalWalletApi();
export const DepositForm = () => {
  const { user } = useStateAuthContext();
  const { state: notification, toggle: setNotification } = useToggle();
  const [messageError, setMessageError] = useState("");
  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();
  const [files, setFiles] = useState<{ [key: string]: File }>({});
  const form = useForm<z.infer<typeof DepositFormValidation>>({
    resolver: zodResolver(DepositFormValidation),

    defaultValues: {
      amount: "",
      voucher: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof DepositFormValidation>) => {
    const valuesApi = {
      amount: +values.amount,
      ballot_image: values.voucher,
    };
    try {
      startLoading();
      await digitalWalletApiCtrl.postDeposit(user, valuesApi);

      endLoading();
      form.reset();
      setFiles({});
      toggle();
    } catch (error: any) {
      setMessageError(error.response.data.errors.boleta_imagen);
      setNotification();
      setTimeout(() => {
        setMessageError("");
        setNotification();
        setFiles({});
        form.setValue("voucher", "");
        endLoading();
      }, 4500);
    }
  };

  return (
    <>
      <BasicModal
        title="🌟 ¡Transacción creada exitosamente!🌟"
        description={
          <>
            ¡Transacción realizada con éxito! Guarda cualquier referencia para
            futuras consultas. Gracias por tu confianza. Cualquier duda, estamos
            aquí para ayudarte.
          </>
        }
        open={state}
        setOpen={toggle}
      />
      {notification && (
        <Alert variant="destructive" className="bg-red-500 text-white mb-5">
          <AlertCircle className="h-4 w-4 fill-white" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{messageError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-y-12 xs:gap-x-7 mt-5 max-w-[600px] mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Input Monto*/}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Monto (US$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Ingrese monto"
                    variant="primary-teal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Comprobante */}
          <FormField
            control={form.control}
            name="voucher"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Adjuntar comprobante</FormLabel>
                <FormControl>
                  <div
                    className="rounded-[20px] border-[2px] font-josefin p-[13px_18px] border-teal flex justify-center cursor-pointer"
                    onClick={() => {
                      const inputField =
                        document.querySelector(`#file-image-1`);
                      if (inputField instanceof HTMLElement) {
                        inputField.click();
                      }
                    }}
                  >
                    {Object.keys(files).length > 0 ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <BsFillCloudCheckFill />
                        Archivo adjunto
                      </div>
                    ) : (
                      <i className="text-[24px]">
                        <AiOutlinePaperClip />
                      </i>
                    )}

                    <Input
                      id="file-image-1"
                      placeholder="Ingrese monto"
                      variant="primary-teal"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        e.preventDefault();
                        if (e.target.files && e.target.files?.length > 0) {
                          const file = e.target.files[0];
                          setFiles({ ...files, file });
                          field.onChange(file);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-12 flex justify-center">
            <Button type="submit" variant="primary-teal" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Solicitud"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
