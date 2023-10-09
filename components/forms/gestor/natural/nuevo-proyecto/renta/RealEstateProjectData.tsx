"use client";
import { TypographyH2, TypographyH3 } from "@/components/shared";
import { IUser } from "@/interfaces";
import React, { ChangeEvent, useState } from "react";
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
import { RealEstateProjectDataValidation } from "@/lib/validations/gestor/natural/nuevo-proyecto/renta";
import { FaPlus } from "react-icons/fa";
import { filesImagesGestorRenta, selectOptions } from "@/utils";
import { isBase64Image } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const rentalTypeChoice = [
  {
    id: 1,
    nombre_estado: "Renta larga",
  },
  {
    id: 2,
    nombre_estado: "Renta corta",
  },
];
interface Props {
  user: IUser;
}
export const RealEstateProjectData = ({ user }: Props) => {
  const [rent, setRent] = useState("");
  const [files, setFiles] = useState<{ [key: string]: File }>({});
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
      interior_photo_text_1: "",
      interior_photo_text_2: "",
      interior_photo_text_3: "",
      exterior_photo_text_1: "",
      exterior_photo_text_2: "",
      exterior_photo_text_3: "",

      //Renta Larga mensual
      monthly_long_rent_next: "",
      //Garantia renta larga
      long_term_rental_guarantee: "",
      // contrato de arrendamiento
      long_term_lease_rent: "",

      // Renta corta por día
      short_term_rental_per_day: "",

      // Renta corta por semana
      short_term_rental_per_week: "",

      // Renta corta por mes
      short_term_rental_per_month: "",
    },
  });
  console.log({ rent });

  const onSubmit = async (
    values: z.infer<typeof RealEstateProjectDataValidation>
  ) => {
    const allImages = filesImagesGestorRenta.flatMap(
      (fileImage) => fileImage.images
    );
    const imageFields = allImages.map((valuesInput) => valuesInput.photo_text);
    // Iteramos sobre cada nombre de campo en el array
    imageFields.forEach((fieldName) => {
      // Obtenemos el valor del campo actual del objeto values
      // Usamos una aserción de tipo "values[fieldName as keyof typeof values]" para decirle a TypeScript que fieldName es una clave válida de values
      const blob = values[fieldName as keyof typeof values];
      // Verificamos si el valor del campo es una cadena en base64
      const hasImageChange = isBase64Image(blob);
      // Si el valor del campo es una cadena en base64, lo reemplazamos con el archivo correspondiente del estado files
      // Nuevamente, usamos una aserción de tipo para decirle a TypeScript que fieldName es una clave válida de values
      if (hasImageChange) {
        values[fieldName as keyof typeof values] = files[fieldName];
      }
    });
    console.log({ values });
  };
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
    fieldName: string
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];

      setFiles({ ...files, [fieldName]: file });

      if (!file.type.includes("image")) return;

      //Se ejecuta la funcion haciendo que el "event" con la informacion pasada pueda obtener la iamgen en base64 en forma de string se almacena en "imageDataUrl" entonce "fieldChange" escucha que cambio algo entonces pasa ese valor al nuevo value y por enede se muestra el nuevo valor
      fileReader.onload = async (event) => {
        //Tenemos la url capturada
        const imageDataUrl = event?.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      //Ejecuta y obtiene  la información de "file" que es un objeto de la imagen que el usaurio puso
      fileReader.readAsDataURL(file);
    }
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
        <TypographyH3 className="text-tomato">
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
            <TypographyH3 className="text-tomato col-span-12">
              1.2. Imágenes y video del inmueble
            </TypographyH3>
            <div className="col-span-12 flex flex-col gap-4">
              {filesImagesGestorRenta.map((file) => (
                <div className="flex flex-col gap-4" key={file.id}>
                  <strong className="text-[14px] sm:text-[1.2rem] col-span-12">
                    {file.label}
                  </strong>
                  <div className="flex justify-center lg:justify-between gap-4 flex-wrap">
                    {file.images.map((image) => (
                      <FormField
                        key={image.id}
                        control={form.control}
                        name={image.photo_text as any}
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2">
                            <FormControl>
                              <div
                                className="w-[200px] h-[200px] xs:w-[250px] xs:h-[250px] cursor-pointer rounded-[10px] overflow-hidden relative"
                                onClick={() => {
                                  const inputField = document.querySelector(
                                    `#${image.fileId}`
                                  );
                                  if (inputField instanceof HTMLElement) {
                                    inputField.click();
                                  }
                                }}
                              >
                                {field.value ? (
                                  <img
                                    src={field.value}
                                    alt="profile photo"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="border-dashed  border-[10px] border-gray62 grid place-content-center absolute inset-0">
                                    <i className="text-[60px] xs:text-[80px] text-gray62">
                                      <FaPlus />
                                    </i>
                                  </div>
                                )}

                                <Input
                                  id={image.fileId}
                                  type="file"
                                  accept="image/*"
                                  placeholder="Upload a photo"
                                  hidden
                                  onChange={(e) =>
                                    handleImage(
                                      e,
                                      field.onChange,
                                      image.photo_text
                                    )
                                  }
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* 1.3. Resumen del Negocio Inmobiliario */}
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
            {/* 1.3.1. Estudio de Mercado Inmobiliario */}

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
                    1.3.1. Estudio de Mercado Inmobiliario
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
            <TypographyH3 className="text-tomato col-span-12">
              1.4. Tipo de arrendamiento{" "}
            </TypographyH3>
            {/* Radio group */}
            <FormField
              control={form.control}
              name="rental_type_choice"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Escoga el tipo de renta</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        setRent(value);
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                      className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                    >
                      {rentalTypeChoice?.map((remodel) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={remodel.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={`${remodel.id}`}
                              className="border-tomato/80 text-tomato/80 focus-visible:ring-tomato/80"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {remodel.nombre_estado}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Si es renta larga */}
            {rent === "1" && (
              <>
                <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
                  Si es renta larga
                </h4>
                {/* Input Renta Mensual (prox) */}
                <FormField
                  control={form.control}
                  name="monthly_long_rent_next"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                      <FormLabel>Renta Mensual (prox)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Renta Mensual (prox)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Input Garantia*/}
                <FormField
                  control={form.control}
                  name="long_term_rental_guarantee"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                      <FormLabel>Garantia</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} placeholder="US$" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Combo de Contrato de arrendamiento */}
                <FormField
                  control={form.control}
                  name="long_term_lease_rent"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                      <FormLabel>Contrato de arrendamiento</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl className="p-[13px_18px] rounded-[20px]">
                          <SelectTrigger className="font-josefin border-[2px] border-gray62">
                            {field.value ? (
                              <SelectValue placeholder="Selecciona" />
                            ) : (
                              "Selecciona"
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectOptions.map((item) => (
                            <SelectItem
                              value={item.value}
                              className="focus:bg-gray62/20"
                              key={item.id}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Si es renta corta */}
            {rent === "2" && (
              <>
                <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
                  Si es renta corta
                </h4>
                {/* Input Renta por día (prox) */}
                <FormField
                  control={form.control}
                  name="short_term_rental_per_day"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                      <FormLabel>Renta por día (prox)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Renta por día (prox)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Input Renta por semana (aprox)*/}
                <FormField
                  control={form.control}
                  name="short_term_rental_per_week"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                      <FormLabel>Renta por semana (aprox)</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} placeholder="US$" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input Renta por día (prox) */}
                <FormField
                  control={form.control}
                  name="short_term_rental_per_month"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                      <FormLabel>Renta por mes (prox)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Renta por mes (prox)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

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
