"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactUsAtValidation } from "@/lib/validations/contact-us-at";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ContactUsAtApi } from "@/server";
import { Button } from "@/components/ui/button";
import { BasicModal } from "@/components/shared";
import { useLoading, useToggle } from "@/hooks";

const contactUsAtCtrl = new ContactUsAtApi();

export const ContactUsAt = () => {
  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();

  const form = useForm<z.infer<typeof ContactUsAtValidation>>({
    resolver: zodResolver(ContactUsAtValidation),
    defaultValues: {
      name_and_surname: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactUsAtValidation>) => {
    startLoading();
    await contactUsAtCtrl.sendContactUsAt(values);
    endLoading();
    //Hooks que cambia de estado para activar el modal
    toggle();
    form.reset();
  };
  return (
    <>
      <BasicModal
        title="🌟 ¡Gracias por tu mensaje! 🌟"
        description={
          <>
            Nos complace informarte que hemos recibido tu solicitud con éxito.
            Nuestro equipo está revisando tu mensaje y se pondrá en contacto
            contigo a la brevedad. <br /> <br /> Apreciamos tu paciencia y
            valoramos la oportunidad de poder atenderte. <br /> <br /> ¡Hasta
            pronto!
          </>
        }
        open={state}
        setOpen={toggle}
      />
      <Form {...form}>
        <form
          className="flex flex-col gap-7"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name_and_surname"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Nombre y Apellido"
                    variant="primary-normal"
                    className="text-center"
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
                    type="number"
                    {...field}
                    placeholder="Teléfono"
                    variant="primary-normal"
                    className="text-center"
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
                    placeholder="E-mail"
                    variant="primary-normal"
                    className="text-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="primary-red"
            className="w-fit px-20 rounded-none mx-auto disabled:bg-tomato/80"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </>
  );
};
