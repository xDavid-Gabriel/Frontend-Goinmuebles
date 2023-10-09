"use client";
import {
  BasicLoading,
  BasicModal,
  ButtonPlusMinus,
  TypographyH2,
  TypographyH3,
} from "@/components/shared";
import { ShareholderDataValidation } from "@/lib/validations/gestor/juridica/perfil";
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
import { useData, useDynamicInputs, useLoading, useToggle } from "@/hooks";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { UserGestorApi } from "@/server";
export interface IShareholderData {
  id?: number;
  codigo_usuario: string;
  datos_accionistas: DatosAccionista[];
  error?: boolean;
}

export interface DatosAccionista {
  nombres_completos: string;
  apellidos_completos: string;
  id_tipo_documento_identidad: number;
  numero_documento_identidad: string;
  id_nacionalidad: number;
  fecha_nacimiento: Date;
  domicilio: string;
  id_departamento: string;
  id_provincia: string;
  id_distrito: string;
  correo_electronico: string;
  id_profesion: number;
  cargo_empresa: string;
  porcentaje_participacion: number;
}

interface Props {
  user: IUser;
  shareholderDataApi: IShareholderData;
}
const userGestorApiCtrl = new UserGestorApi();
export const ShareholderData = ({ user, shareholderDataApi }: Props) => {
  const router = useRouter();
  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();
  const { data: nationalityData, isLoading: isNationalityDataData } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.NATIONALITY}`);

  const { data: documentsData, isLoading: isDocumentsData } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.DOCUMENTS}`);

  const { data: professionData, isLoading: isProfessionData } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.PROFESSION}`);
  const defaultShareholderData = {
    // Nombres completos del accionista
    full_names: "",

    // Apellidos completos del accionista
    full_last_names: "",

    // Documento de identidad del accionista
    identity_document: "",

    // Número del documento de identidad del accionista
    document_number: "",

    // Nacionalidad del accionista
    nationality: "",

    // Fecha de nacimiento del accionista
    birth_date: "",

    // Domicilio del accionista
    address: "",

    // Departamento del domicilio del accionista
    department: "",

    // Provincia del domicilio del accionista
    province: "",

    // Distrito del domicilio del accionista
    district: "",

    // Correo electrónico del accionista
    email: "",

    // Profesión del accionista
    profession: "",

    // Cargo que ocupa el accionista en la empresa
    company_position: "",

    // Porcentaje de participación del accionista en la empresa
    participation_percentage: "",
  };
  const form = useForm<z.infer<typeof ShareholderDataValidation>>({
    resolver: zodResolver(ShareholderDataValidation),

    defaultValues: {
      shareholder_data: shareholderDataApi?.datos_accionistas?.length
        ? shareholderDataApi?.datos_accionistas.map((item) => {
            return {
              // Nombres completos del accionista
              full_names: item.nombres_completos || "",

              // Apellidos completos del accionista
              full_last_names: item.apellidos_completos || "",

              // Documento de identidad del accionista
              identity_document:
                item.id_tipo_documento_identidad.toString() || "",

              // Número del documento de identidad del accionista
              document_number: item.numero_documento_identidad || "",

              // Nacionalidad del accionista
              nationality: item.id_nacionalidad.toString() || "",

              // Fecha de nacimiento del accionista
              birth_date: item.fecha_nacimiento.toString() || "",

              // Domicilio del accionista
              address: item.domicilio || "",

              // Departamento del domicilio del accionista
              department: item.id_departamento
                ? item.id_departamento.toString()
                : "",

              // Provincia del domicilio del accionista
              province: item.id_provincia ? item.id_provincia.toString() : "",

              // Distrito del domicilio del accionista
              district: item.id_distrito ? item.id_distrito.toString() : "",

              // Correo electrónico del accionista
              email: item.correo_electronico || "",

              // Profesión del accionista
              profession: item.id_profesion.toString() || "",

              // Cargo que ocupa el accionista en la empresa
              company_position: item.cargo_empresa || "",

              // Porcentaje de participación del accionista en la empresa
              participation_percentage:
                item.porcentaje_participacion.toString() || "",
            };
          })
        : [defaultShareholderData],
    },
  });
  const {
    fields: shareholderData,
    handleAddFields,
    fieldSetsCount,
    handleRemoveFields,
  } = useDynamicInputs({
    defaultFieldSet: defaultShareholderData,
    name: "shareholder_data",
    control: form.control,
    count: shareholderDataApi?.datos_accionistas.length || 1,
  });

  const onSubmit = async (
    values: z.infer<typeof ShareholderDataValidation>
  ) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario,
      // user: user.user.id,
      datos_accionistas: values.shareholder_data.map((item) => {
        return {
          nombres_completos: item.full_names,
          apellidos_completos: item.full_last_names,
          id_tipo_documento_identidad: item.identity_document,
          numero_documento_identidad: item.document_number,
          id_nacionalidad: item.nationality,
          fecha_nacimiento: item.birth_date,
          domicilio: item.address,
          id_departamento: item.department,
          id_provincia: item.province,
          id_distrito: item.district,
          correo_electronico: item.email,
          id_profesion: item.profession,
          cargo_empresa: item.company_position,
          porcentaje_participacion: item.participation_percentage,
        };
      }),
    };
    startLoading();

    if (shareholderDataApi.error) {
      await userGestorApiCtrl.postShareholderData(valuesApi);
    } else {
      await userGestorApiCtrl.putShareholderData(
        valuesApi,
        shareholderDataApi.id!
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
        3. Datos de los accionistas
      </TypographyH2>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {shareholderData.map((_, index) => (
            <React.Fragment key={index}>
              {/* Input Nombres completos */}
              <TypographyH3 className="col-span-12">
                Datos de los accionistas({index + 1})
              </TypographyH3>
              <FormField
                control={form.control}
                name={`shareholder_data[${index}].full_names` as any}
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
                name={`shareholder_data[${index}].full_last_names` as any}
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
              {/* Combo de Documento de indentidad */}
              <FormField
                control={form.control}
                name={`shareholder_data[${index}].identity_document` as any}
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
                name={`shareholder_data[${index}].document_number` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                    <FormLabel>N° documento</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="N° documento"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Combo de Nacionalidad */}
              <FormField
                control={form.control}
                name={`shareholder_data[${index}].nationality` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                    <FormLabel>Nacionalidad</FormLabel>

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
                      <SelectContent className="h-[150px]">
                        {nationalityData?.map((item) => (
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
              {/* Input Fecha de nacimiento */}
              <FormField
                control={form.control}
                name={`shareholder_data[${index}].birth_date` as any}
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-12 xs:col-span-6 sm:col-span-7  lg:col-span-4">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input de Domicilio */}
              <FormField
                control={form.control}
                name={`shareholder_data[${index}].address` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-9 lg:col-span-8">
                    <FormLabel>Domicilio</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Domicilio" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LocationSelector
                form={form}
                nameDepartment={`shareholder_data[${index}].department` as any}
                nameProvince={`shareholder_data[${index}].province` as any}
                nameDistrict={`shareholder_data[${index}].district` as any}
                classNameFormItem="col-span-12 xs:col-span-6 sm:col-span-4"
                classNameFormLabel="text-gray62"
                classNameSelectTrigger="border-gray62"
                classNameSelectItem="focus:bg-gray62/20"
              />

              {/* Input de Correo electronico*/}
              <FormField
                control={form.control}
                name={`shareholder_data[${index}].email` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-8">
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
              {/* Input Profesión */}
              <FormField
                control={form.control}
                name={`shareholder_data[${index}].profession` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                    <FormLabel>Profesión</FormLabel>
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
                      <SelectContent className="h-[150px]">
                        {professionData?.map((item) => (
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

              {/* Input de Cargo de la empresa*/}
              <FormField
                control={form.control}
                name={`shareholder_data[${index}].company_position` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                    <FormLabel>Cargo de la empresa</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Cargo de la empresa"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Combo de Porcentaje de participación */}
              <FormField
                control={form.control}
                name={
                  `shareholder_data[${index}].participation_percentage` as any
                }
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                    <FormLabel>Porcentaje de participación</FormLabel>

                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Porcentaje de participación"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </React.Fragment>
          ))}

          <ButtonPlusMinus
            fieldSetsCount={fieldSetsCount}
            handleAddFields={handleAddFields}
            handleRemoveFields={handleRemoveFields}
            variant="bg-tomato/80"
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
    </>
  );
};
