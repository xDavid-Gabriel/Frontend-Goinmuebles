"use client";
import { TypographyH2, TypographyH3 } from "@/components/shared";
import { IUser } from "@/interfaces";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LocationSelector } from "@/components/forms";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RealEstateProjectDataValidation } from "@/lib/validations/gestor/juridica/nuevo-proyecto/venta-plusvalia";
interface Props {
  user: IUser;
}
export const RealEstateProjectData = ({ user }: Props) => {
  const form = useForm<z.infer<typeof RealEstateProjectDataValidation>>({
    resolver: zodResolver(RealEstateProjectDataValidation),

    defaultValues: {
      department: "", // Departamento
      province: "", // Provincia
      district: "", // Distrito
      email: "", // Correo electrónico
      postal_code: "", // Código postal
      reference: "", // Referencia
      real_estate_business_summary: "", // Resumen del negocio inmobiliario
      real_estate_market_study: "", // Estudio del mercado inmobiliario
    },
  });
  const onSubmit = async (
    values: z.infer<typeof RealEstateProjectDataValidation>
  ) => {
    console.log({ values });
  };
  return (
    <>
      <TypographyH2
        variant="primary-100"
        className={`${user.rol === "Gestor" ? "text-tomato/80" : "text-teal"}`}
      >
        1. Datos del Proyecto Inmobiliario
      </TypographyH2>
      <div className="px-2 sm:px-4">
        <TypographyH3
          className={`${user.rol === "Gestor" ? "text-tomato" : "text-teal"}`}
        >
          1.2. Ubicación y referencia
        </TypographyH3>
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <LocationSelector
              form={form}
              classNameFormLabel="text-gray62"
              classNameSelectTrigger="border-gray62"
              classNameSelectItem="focus:bg-gray62/20"
            />
            {/* Input Correo electrónico */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-7">
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Correo electrónico"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Código postal  */}
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-5">
                  <FormLabel>Código postal</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Código postal" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Referencia  */}
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-7">
                  <FormLabel>Referencia</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Referencia" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Texarea Resumen del Negocio Inmobiliario */}
            <FormField
              control={form.control}
              name="real_estate_business_summary"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12">
                  <FormLabel
                    className={`text-[16px] sm:text-[1.5rem] font-bold ${
                      user.rol === "Gestor" ? "text-tomato" : "text-teal"
                    }`}
                  >
                    1.3. Resumen del Negocio Inmobiliario
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Ten en cuenta que debes colocar 100 palabras como máximo."
                      className="resize-none rounded-[20px] border-[2px] font-josefin p-[13px_18px] border-gray62 min-h-[140px]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Texarea Estudio de Mercado Inmobiliario */}
            <FormField
              control={form.control}
              name="real_estate_market_study"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12">
                  <FormLabel
                    className={`text-[16px] sm:text-[1.5rem] font-bold ${
                      user.rol === "Gestor" ? "text-tomato" : "text-teal"
                    }`}
                  >
                    1.4. Estudio de Mercado Inmobiliario
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Ten en cuenta que debes colocar 2000 palabras como máximo."
                      className="resize-none rounded-[20px] border-[2px] font-josefin p-[13px_18px] border-gray62 min-h-[300px]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={
                user.rol === "Gestor" ? "primary-red-100" : "primary-teal"
              }
              className="w-fit ml-auto col-span-12"
            >
              Guardar y enviar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
