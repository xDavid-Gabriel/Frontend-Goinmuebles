"use client";
import {
  BasicLoading,
  BasicModal,
  TypographyH2,
  TypographyH3,
} from "@/components/shared";
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
import { RealEstateProjectDataValidation } from "@/lib/validations/gestor/natural/nuevo-proyecto/venta-plusvalia";
import { useStateProjectContext } from "@/context/project";
import axios from "axios";
import { useLoading, useToggle } from "@/hooks";
import { ENV } from "@/utils";
interface Props {
  user: IUser;
  tipoInversionVenta: number;
}
export const RealEstateProjectData = ({ user, tipoInversionVenta }: Props) => {
  const { isLoading, startLoading, endLoading } = useLoading();
  const { state: stateWarning, toggle: toogleWarning } = useToggle();
  const { state: stateSucces, toggle: toogleSucces } = useToggle();
  const { incrementFormCountVenta, formsVenta, setIdProyecto } =
    useStateProjectContext();

  const form = useForm<z.infer<typeof RealEstateProjectDataValidation>>({
    resolver: zodResolver(RealEstateProjectDataValidation),

    defaultValues: {
      department: "", // Departamento
      province: "", // Provincia
      district: "", // Distrito
      address: "", // Dirreción
      title: "", // Titulo
      reference: "", // Referencia
      real_estate_business_summary: "", // Resumen del negocio inmobiliario
      real_estate_market_study: "", // Estudio del mercado inmobiliario
    },
  });
  console.log(user);

  const onSubmit = async (
    values: z.infer<typeof RealEstateProjectDataValidation>
  ) => {
    toogleWarning();
  };
  return (
    <>
      <BasicModal
        title="⚠️ ¡Advertencia de Envío de Formulario! ⚠️"
        description={
          <>
            Asegúrese de revisar todos los datos ingresados en el formulario
            antes de enviar. Una vez que los datos sean enviados, no podrán ser
            modificados. Es importante garantizar la precisión y veracidad de la
            información para evitar inconvenientes en el futuro.
          </>
        }
        btnCancel={true}
        open={stateWarning}
        setOpen={toogleWarning}
        onRedirection={async () => {
          const valueApi = {
            /* Código del usuario */
            codigo_usuario: user.user.codigo_usuario,
            /* Tipo de inversión: Venta - Plusvalía o Renta */
            tipo_inversion_id: tipoInversionVenta,
            /* Título del proyecto inmobiliario */
            titulo: form.getValues("title"),
            /* Ubicación y referencia */
            id_departamento_propiedad: form.getValues("department"), // Departamento
            id_provincia_propiedad: form.getValues("province"), // Provincia
            id_distrito_propiedad: form.getValues("district"), // Distrito
            direccion: form.getValues("address"), // Dirección
            referencia: form.getValues("reference"), // Referencia
            /* Resumen del negocio */
            resumen_negocio: form.getValues("real_estate_business_summary"),
            /* Estudio de Mercado Inmobiliario */
            estudio_mercado: form.getValues("real_estate_market_study"), // Estudio del mercado inmobiliario
          };
          try {
            startLoading();

            // Realiza la solicitud POST a una URL específica (reemplaza 'URL_API' con la URL correcta)

            const { data } = await axios.post(
              `${ENV.API_URL}/inmuebles`,
              valueApi
            );
            setIdProyecto(data.inmueble.id);
            endLoading();
            incrementFormCountVenta("datos_del_proyecto_inmobiliario");
            // Llama a la función toggle para activar el modal
            toogleSucces();
          } catch (error) {
            // Manejo de errores, por ejemplo, mostrar un mensaje de error o registrar el error
            console.error("Error al realizar la solicitud POST:", error);
          }
        }}
      />
      <BasicModal
        title="🌟 ¡Información almacenada con éxito! 🌟"
        description={<>Tus datos se han guardado correctamente</>}
        open={stateSucces}
        setOpen={toogleSucces}
      />
      <TypographyH2
        variant="primary-100"
        className={`${user.rol === "Gestor" ? "text-tomato/80" : "text-teal"}`}
      >
        1. Datos del Proyecto Inmobiliario
      </TypographyH2>
      <div
        className={`px-2 sm:px-4 ${
          formsVenta.datos_del_proyecto_inmobiliario
            ? "opacity-50 pointer-events-none cursor-not-allowed"
            : ""
        }`}
      >
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
            {/* Input Titulo  */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-8">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Título" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Correo electrónico */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Dirección" />
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
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
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
              variant="primary-red-100"
              className="w-fit ml-auto col-span-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <BasicLoading name="Enviando..." className="flex-row gap-3" />
              ) : (
                "Guardar y enviar"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
