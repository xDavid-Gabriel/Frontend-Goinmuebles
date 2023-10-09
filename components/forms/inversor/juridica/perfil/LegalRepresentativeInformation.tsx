"use client";
import { BasicLoading, BasicModal, TypographyH2 } from "@/components/shared";
import { LegalRepresentativeInformationValidation } from "@/lib/validations/inversor/juridica/perfil";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IUser } from "@/interfaces";
import { Button } from "@/components/ui/button";

import { LocationSelector } from "@/components/forms";

import { ENV, selectOptions } from "@/utils";
import { useData, useLoading, useToggle } from "@/hooks";
import { useRouter } from "next/navigation";
import { UserInversorApi } from "@/server";
interface IRepresentante {
  id: number;
  codigo_usuario: string;
  nombres_representante: string;
  apellidos_representante: string;
  departamento_representante_id: string;
  provincia_representante_id: string;
  distrito_representante_id: string;
  direccion_representante: string;
  referencia_representante: string;
  tipo_documento_representante_id: string;
  numero_documento_representante: string;
  celular_representante: string;
  correo_electronico_representante: string;
  created_at: string;
  updated_at: string;
}
interface Props {
  user: IUser;
  representativesLegalData: IRepresentante[];
}
const userInversorApiCtrl = new UserInversorApi();
export const LegalRepresentativeInformation = ({
  user,
  representativesLegalData,
}: Props) => {
  const router = useRouter();
  const { isLoading, startLoading, endLoading } = useLoading();
  const { state, toggle } = useToggle();
  const { data: documentsData, isLoading: isDocumentsData } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.DOCUMENTS}`);
  const dataRepresentativesLegal = representativesLegalData[0];

  const form = useForm<
    z.infer<typeof LegalRepresentativeInformationValidation>
  >({
    resolver: zodResolver(LegalRepresentativeInformationValidation),

    defaultValues: {
      // Nombres Completos
      full_name: dataRepresentativesLegal?.nombres_representante || "",

      // Apellidos Completos
      full_surnames: dataRepresentativesLegal?.apellidos_representante || "",

      // Departamento
      department: dataRepresentativesLegal?.departamento_representante_id || "",

      // Provincia
      province: dataRepresentativesLegal?.provincia_representante_id || "",

      // Distrito
      district: dataRepresentativesLegal?.distrito_representante_id || "",

      // Dirección
      address: dataRepresentativesLegal?.direccion_representante || "",

      // Referencia
      reference: dataRepresentativesLegal?.referencia_representante || "",

      // Documento de identidad
      identity_document:
        dataRepresentativesLegal?.tipo_documento_representante_id || "",

      // Número de documento
      document_number:
        dataRepresentativesLegal?.numero_documento_representante || "",

      // Celular
      cellphone: dataRepresentativesLegal?.celular_representante || "",

      // Correo electrónico
      email: dataRepresentativesLegal?.correo_electronico_representante || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof LegalRepresentativeInformationValidation>
  ) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario,
      nombres_representante: values.full_name,
      apellidos_representante: values.full_surnames,
      departamento_representante_id: values.department,
      provincia_representante_id: values.province,
      distrito_representante_id: values.district,
      direccion_representante: values.address,
      referencia_representante: values.reference,
      tipo_documento_representante_id: values.identity_document,
      numero_documento_representante: values.document_number,
      celular_representante: values.cellphone,
      correo_electronico_representante: values.email,
    };
    startLoading();
    if (representativesLegalData.length === 0) {
      await userInversorApiCtrl.postRepresentativesLegal(valuesApi);
    } else {
      await userInversorApiCtrl.putRepresentativesLegal(
        valuesApi,
        dataRepresentativesLegal.id
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
      <TypographyH2
        variant="primary-100"
        className={`${user.rol === "Gestor" ? "text-tomato/80" : "text-teal"}`}
      >
        2. Datos del representante legal
      </TypographyH2>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Input Nombres completos */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Nombres Completos</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Nombres Completos"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Apellidos completos */}
          <FormField
            control={form.control}
            name="full_surnames"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Apellidos Completos</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Apellidos Completos"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LocationSelector
            form={form}
            classNameFormItem="col-span-12 xs:col-span-6 sm:col-span-4"
            classNameFormLabel="text-gray62"
            classNameSelectTrigger="border-gray62"
            classNameSelectItem="focus:bg-gray62/20"
          />

          {/* Input Dirección */}
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
          {/* Input Referencia */}
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

          {/* Combo de Documento de indentidad */}
          <FormField
            control={form.control}
            name="identity_document"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Documento de indentidad</FormLabel>

                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
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
                    {documentsData?.map((item) => (
                      <SelectItem
                        value={`${item.id}`}
                        className="focus:bg-gray62/20"
                        key={item.id}
                      >
                        {item.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input de N° documento*/}
          <FormField
            control={form.control}
            name="document_number"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>N° documento</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="N° documento" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input de Celular*/}
          <FormField
            control={form.control}
            name="cellphone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="Celular" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input de Correo electronico*/}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-10">
                <FormLabel>Correo electronico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Correo electronico"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
