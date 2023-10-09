"use client";

import { TypographyH3 } from "@/components/shared";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaPlus } from "react-icons/fa";
import { isBase64Image } from "@/lib/utils";

interface PropImagesVideoProps {
  fileFields: any;
  validationSchema: any;
  fileInputs: {
    id: number;
    label: string;
    images: { id: number; photo_text: string; fileId: string }[];
  }[];
  youtube?: boolean;
}
export const PropImagesVideo = ({
  fileFields,
  validationSchema,
  fileInputs,
  youtube = true,
}: PropImagesVideoProps) => {
  const [files, setFiles] = useState<{ [key: string]: File }>({});

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: fileFields,
  });
  const onSubmit = async (values: z.infer<typeof validationSchema>) => {
    /*Proceso de compilado para archivos File*/
    // Definimos un array con los nombres de los campos de las imágenes

    const allImages = fileInputs.flatMap((fileImage) => fileImage.images);
    const imageFields = allImages.map((valuesInput) => valuesInput.photo_text);
    // const imageFields = [
    //   "interior_photo_text_1",
    //   "interior_photo_text_2",
    //   "interior_photo_text_3",
    //   "exterior_photo_text_1",
    //   "exterior_photo_text_2",
    //   "exterior_photo_text_3",
    // ];
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
      <TypographyH3 className="text-tomato">
        2.2. Imágenes y vídeo del inmueble
      </TypographyH3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fileInputs.map((file) => (
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
                                handleImage(e, field.onChange, image.photo_text)
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
          {/* Input Enlace de Youtube  */}
          {/* {youtube && (
            <FormField
              control={form.control}
              name="youtube_link"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 sm:w-[70%]">
                  <FormLabel>Enlace de Youtube</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enlace de Youtube"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}

          <div className="flex justify-end">
            <Button type="submit" variant="primary-red-100">
              Guardar y enviar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
