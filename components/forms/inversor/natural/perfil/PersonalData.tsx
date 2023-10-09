"use client";
import { BasicLoading, BasicModal, TypographyH2 } from "@/components/shared";
import {
  PersonalDataValidation,
  SpouseDataValidation,
} from "@/lib/validations/inversor/natural/perfil";
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

import { IDocuments, IFamilyBurdens, INationality, IUser } from "@/interfaces";
import { Button } from "@/components/ui/button";

import { LocationSelector } from "@/components/forms";
import { useData, useLoading, useToggle } from "@/hooks";
import { ENV } from "@/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserInversorApi } from "@/api";
export interface ISpouseUser {
  id: number;
  codigo_usuario: string;
  nombres: string;
  apellidos: string;
  tipo_documento: string;
  numero_documento: string;
  ruc: null;
  email: string;
  celular: string;
  fecha_nacimiento: Date;
  edad: null;
  estado_civil: null;
  departamento_id: string;
  provincia_id: string;
  distrito_id: string;
  created_at: Date;
  updated_at: Date;
  departamento: Departamento;
  provincia: Distrito;
  distrito: Distrito;
}

export interface Departamento {
  id: string;
  nombre: string;
}

export interface Distrito {
  id: string;
  nombre: string;
  provincia_id?: string;
  departamento_id: string;
}
interface Props {
  user: IUser;
  spouseUserData: ISpouseUser[];
}
const userInversorApiCtrl = new UserInversorApi();
export const PersonalData = ({ user, spouseUserData }: Props) => {
  const router = useRouter();
  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();
  const { data: documentsData, isLoading: isDocumentsData } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.DOCUMENTS}`);

  const { data: maritalStatusData, isLoading: isMaritalStatusData } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.MARITALSTATUS}`);

  const { data: familyBurdensData, isLoading: isFamilyBurdensData } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.FAMILY_BURDENS}`);

  const [isSpouse, setIsSpouse] = useState(user.user.estado_civil || "");
  const form = useForm<z.infer<typeof PersonalDataValidation>>({
    resolver: zodResolver(PersonalDataValidation),

    defaultValues: {
      full_names: user?.user.nombres ? user?.user.nombres : "",
      last_name_complete: user?.user.apellidos ? user?.user.apellidos : "",
      age: user.user.edad ? user.user.edad : "",
      identity_document: user?.user.numero_documento ? "1" : "2",
      document_number: user?.user.numero_documento
        ? user?.user.numero_documento
        : "",
      // civil_status:
      //   user?.user.estado_civil !== null ? user?.user.estado_civil : "Soltero",
      civil_status: user.user.estado_civil ? user.user.estado_civil : "",
      family_burden: user.user.cargas_familiar ? user.user.cargas_familiar : "",
      dob: user.user.fecha_nacimiento
        ? user.user.fecha_nacimiento.toString()
        : "",
      address: user.user.direccion ? user.user.direccion : "",
      department: user.user.departamento_id ? user.user.departamento_id : "",
      province: user.user.provincia_id ? user.user.provincia_id : "",
      district: user.user.distrito_id ? user.user.distrito_id : "",
      email: user?.user.correo_electronico ? user?.user.correo_electronico : "",
      cellphone: user?.user.celular ? user?.user.celular : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PersonalDataValidation>) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario!.toString(),
      id_persona_rol: user.user.id_persona_rol!,
      nombres: values.full_names,
      apellidos: values.last_name_complete,
      edad: values.age,
      // id
      tipo_documento_representante_id: values.identity_document,
      numero_documento: values.document_number,
      // id:
      estado_civil: values.civil_status,
      // id
      cargas_familiar: values.family_burden,
      fecha_nacimiento: values.dob,
      direccion: values.address,
      departamento_id: values.department,
      provincia_id: values.province,
      distrito_id: values.district,
      correo_electronico: values.email,
      celular: values.cellphone,
    };
    startLoading();
    await userInversorApiCtrl.putPersonalData(
      user.user.codigo_usuario?.toString()!,
      valuesApi
    );
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
        1. Datos personales
      </TypographyH2>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Input Nombres completos */}
          <FormField
            control={form.control}
            name="full_names"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Nombres Completos</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Nombres Completos"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Apellidos completos */}
          <FormField
            control={form.control}
            name="last_name_complete"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Apellidos Completos</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Apellidos Completos"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Edad */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-3">
                <FormLabel>Edad</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="Edad" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de documento de identidad */}
          <FormField
            control={form.control}
            name="identity_document"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-9 sm:col-span-4 lg:col-span-3">
                <FormLabel>Documento de identidad</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled
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
                    {documentsData?.map((document) => (
                      <SelectItem
                        value={document.id.toString()}
                        className="focus:bg-gray62/20"
                        key={document.id}
                      >
                        {document.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input numero de documento */}
          <FormField
            control={form.control}
            name="document_number"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-5 lg:col-span-3">
                <FormLabel>nº Documento</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="nº Documento"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de estado civil */}
          <FormField
            control={form.control}
            name="civil_status"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-7 sm:col-span-4 lg:col-span-3">
                <FormLabel>Estado Civil</FormLabel>

                <Select
                  onValueChange={(value) => {
                    setIsSpouse(value);
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
                    {maritalStatusData?.map((marital) => (
                      <SelectItem
                        value={`${marital.id}`}
                        className="focus:bg-gray62/20"
                        key={marital.id}
                      >
                        {marital.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de carga familiar */}
          <FormField
            control={form.control}
            name="family_burden"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-3">
                <FormLabel>Carga familiar</FormLabel>

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
                    {familyBurdensData?.map((family) => (
                      <SelectItem
                        value={`${family.id}`}
                        className="focus:bg-gray62/20"
                        key={family.id}
                      >
                        {family.nombre}
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
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Domicilio */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-5">
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
            classNameFormItem="col-span-12 xs:col-span-6 sm:col-span-4"
            classNameFormLabel="text-gray62"
            classNameSelectTrigger="border-gray62"
            classNameSelectItem="focus:bg-gray62/20"
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-6">
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled
                    {...field}
                    placeholder="Correo electrónico"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cellphone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-6">
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Celular"
                    disabled
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
      {isSpouse === "2" && (
        <SpouseData user={user} spouseUserData={spouseUserData} />
      )}
    </>
  );
};

// Datos del cónyuge
const SpouseData = ({ user, spouseUserData }: Props) => {
  const spouseUser = spouseUserData[0];

  const router = useRouter();
  const { isLoading, startLoading, endLoading } = useLoading();
  const { state, toggle } = useToggle();
  // const { data: familyBurdens, isLoading: isLoadingFamilyBurdens } = useData<
  //   IFamilyBurdens[]
  // >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.FAMILY_BURDENS}`);

  const { data: documents, isLoading: isLoadingDocuments } = useData<
    IDocuments[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.DOCUMENTS}`);

  // const { data: spouseUser, isLoading: isLoadingSpouseUser } =
  //   useData<ISpouseUser>(
  //     `${ENV.API_URL}/${ENV.ENDPOINTS.SPOUSE_USER}/${user.user.codigo_usuario}`
  //   );

  // const { data: nationality, isLoading: isLoadingNationality } = useData<
  //   INationality[]
  // >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.NATIONALITY}`);

  const form = useForm<z.infer<typeof SpouseDataValidation>>({
    resolver: zodResolver(SpouseDataValidation),
    // full_names: user?.user.nombres ? user?.user.nombres : "",
    // last_name_complete: user?.user.apellidos ? user?.user.apellidos : "",
    defaultValues: {
      full_names: spouseUser?.nombres || "",
      last_name_complete: spouseUser?.apellidos || "",
      identity_document: spouseUser?.tipo_documento
        ? spouseUser?.tipo_documento.toString()
        : "",
      document_number: spouseUser?.numero_documento || "",
      dob: spouseUser?.fecha_nacimiento
        ? spouseUser?.fecha_nacimiento.toString()
        : "",
      department: spouseUser?.departamento_id || "",
      province: spouseUser?.provincia_id || "",
      district: spouseUser?.distrito_id || "",
      email: spouseUser?.email || "",
      cellphone: spouseUser?.celular || "",
    },
  });
  console.log({ spouseUser });

  const onSubmit = async (values: z.infer<typeof SpouseDataValidation>) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario,
      nombres: values.full_names,
      apellidos: values.last_name_complete,
      tipo_documento: values.identity_document,
      numero_documento: values.document_number,
      fecha_nacimiento: values.dob,
      departamento_id: values.department,
      provincia_id: values.province,
      distrito_id: values.district,
      email: values.email,
      celular: values.cellphone,
    };
    startLoading();
    if (spouseUserData.length === 0) {
      await userInversorApiCtrl.postSpouseData(valuesApi);
    } else {
      await userInversorApiCtrl.putSpouseData(valuesApi, spouseUser.id);
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
      <h3
        className={`text-[16px] sm:text-[25px] font-bold ${
          user.rol === "Gestor" ? "text-tomato/80" : "text-teal"
        }`}
      >
        Datos del cónyuge
      </h3>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Input Nombres completos */}
          <FormField
            control={form.control}
            name="full_names"
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
            name="last_name_complete"
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
          {/* Combo de documento de identidad */}
          <FormField
            control={form.control}
            name="identity_document"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-7 lg:col-span-4">
                <FormLabel>Documento de identidad</FormLabel>

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
                    {documents?.map((document) => (
                      <SelectItem
                        key={document.id}
                        value={`${document.id}`}
                        className="focus:bg-gray62/20"
                      >
                        {document.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input numero de documento */}
          <FormField
            control={form.control}
            name="document_number"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-5 lg:col-span-4">
                <FormLabel>nº Documento</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="nº Documento" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Fecha de nacimiento */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-4">
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de nacionalidad */}
          {/* <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-3">
                <FormLabel>Nacionalidad</FormLabel>

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

                  <SelectContent className="h-[150px]">
                    {nationality?.map((nationality) => (
                      <SelectItem
                        key={nationality.id}
                        value={nationality.nombre}
                        className="focus:bg-gray62/20"
                      >
                        {nationality.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* Input Domicilio */}
          {/* <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Domicilio</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="Domicilio" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <LocationSelector
            form={form}
            classNameFormItem="col-span-12 xs:col-span-6 sm:col-span-4"
            classNameFormLabel="text-gray62"
            classNameSelectTrigger="border-gray62"
            classNameSelectItem="focus:bg-gray62/20"
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
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
          <FormField
            control={form.control}
            name="cellphone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="Celular" />
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
