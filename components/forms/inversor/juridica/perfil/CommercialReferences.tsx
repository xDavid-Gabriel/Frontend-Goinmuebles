"use client";
import React from "react";
import {
  BasicLoading,
  BasicModal,
  ButtonPlusMinus,
  TypographyH2,
  TypographyH3,
} from "@/components/shared";
import { CommercialReferencesValidation } from "@/lib/validations/inversor/juridica/perfil";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDynamicInputs, useLoading, useToggle } from "@/hooks";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { UserInversorApi } from "@/api";
import { IUser } from "@/interfaces";
export interface ICommercialReferences {
  id: number;
  codigo_usuario: string;
  datos_referencias: DatosReferencia[];
  error: boolean;
}

export interface DatosReferencia {
  empresa: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  telefono: string;
}
interface Props {
  user: IUser;
  commercialReferencesData: any;
}
const userInversorApiCtrl = new UserInversorApi();
export const CommercialReferences = ({
  user,
  commercialReferencesData,
}: Props) => {
  const router = useRouter();
  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();

  const defaultCommercialReferences = {
    company: "",
    names: "",
    last_names: "",
    position: "",
    contact_phone: "",
  };

  const form = useForm<z.infer<typeof CommercialReferencesValidation>>({
    resolver: zodResolver(CommercialReferencesValidation),

    defaultValues: {
      /* Referencias comerciales*/
      commercial_references: commercialReferencesData?.datos_referencias?.length
        ? commercialReferencesData?.datos_referencias.map((item: any) => {
            return {
              company: item.empresa || "",
              names: item.nombres || "",
              last_names: item.apellidos || "",
              position: item.cargo || "",
              contact_phone: item.telefono || "",
            };
          })
        : [defaultCommercialReferences],
    },
  });
  const { fields, handleAddFields, fieldSetsCount, handleRemoveFields } =
    useDynamicInputs({
      defaultFieldSet: defaultCommercialReferences,
      name: "commercial_references",
      control: form.control,
      count: commercialReferencesData?.datos_referencias.length || 1,
    });

  const onSubmit = async (
    values: z.infer<typeof CommercialReferencesValidation>
  ) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario,
      // user: user.user.id,
      datos_referencias: values.commercial_references.map((item) => {
        return {
          empresa: item.company,
          nombres: item.names,
          apellidos: item.last_names,
          cargo: item.position,
          telefono: item.contact_phone,
        };
      }),
    };
    startLoading();

    if (commercialReferencesData.error) {
      await userInversorApiCtrl.postCommercialReferences(valuesApi);
    } else {
      await userInversorApiCtrl.putCommercialReferences(
        valuesApi,
        commercialReferencesData.id
      );
    }

    endLoading();
    //Hooks que cambia de estado para activar el modal
    toggle();
    router.refresh();
  };

  return (
    <>
      <BasicModal
        title="🌟 ¡Información almacenada con éxito! 🌟"
        description={<>Tus datos se han guardado correctamente</>}
        open={state}
        setOpen={toggle}
      />
      <TypographyH2 variant="primary-100" className="text-teal">
        4. Referencias Comerciales
      </TypographyH2>

      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fields.map((_, index) => (
            <React.Fragment key={index}>
              {/* Input Empresa*/}
              <TypographyH3 className="col-span-12">
                Referencias Comerciales({index + 1})
              </TypographyH3>
              <FormField
                control={form.control}
                name={`commercial_references[${index}].company` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input Nombres*/}
              <FormField
                control={form.control}
                name={`commercial_references[${index}].names` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Nombres" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input Apellidos*/}
              <FormField
                control={form.control}
                name={`commercial_references[${index}].last_names` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Apellidos" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input Cargo*/}
              <FormField
                control={form.control}
                name={`commercial_references[${index}].position` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Cargo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input Teléfono de contacto*/}
              <FormField
                control={form.control}
                name={`commercial_references[${index}].contact_phone` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
                    <FormLabel>Teléfono de contacto</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Teléfono de contacto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-12 sm:col-span-4"></div>
            </React.Fragment>
          ))}
          <ButtonPlusMinus
            fieldSetsCount={fieldSetsCount}
            handleAddFields={handleAddFields}
            handleRemoveFields={handleRemoveFields}
            variant="bg-teal"
          />

          <Button
            type="submit"
            variant="primary-teal"
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
    </>
  );
};
