"use client";
import { BasicLoading, BasicModal, TypographyH2 } from "@/components/shared";
import { PersonalDataValidation } from "@/lib/validations/inversor/juridica/perfil";
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
import { useRouter } from "next/navigation";
import { useData, useLoading, useToggle } from "@/hooks";
import { UserInversorApi } from "@/server";

interface Props {
  user: IUser;
}
const userInversorApiCtrl = new UserInversorApi();
export const PersonalData = ({ user }: Props) => {
  const { data: lineOfBusiness, isLoading: isLoadingLineOfBusiness } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.ECONOMIC_ACTIVITY}`);
  const router = useRouter();
  const { isLoading, startLoading, endLoading } = useLoading();
  const { state, toggle } = useToggle();
  const form = useForm<z.infer<typeof PersonalDataValidation>>({
    resolver: zodResolver(PersonalDataValidation),

    defaultValues: {
      // Denominación Social
      social_denomination: user?.user.razon_social
        ? user?.user.razon_social
        : "",
      // R.U.C
      ruc: user?.user.numero_ruc ? user?.user.numero_ruc : "",
      // N° Partida registral
      registry_entry_number: user?.user.num_partida_registral
        ? user?.user.num_partida_registral
        : "",
      // Fecha de constitución
      constitution_date: user?.user.fecha_constitucion
        ? user?.user.fecha_constitucion
        : "",
      // Domicilio Fiscal
      fiscal_address: user?.user.direccion ? user?.user.direccion : "",
      // Departamento
      department: user?.user.departamento_empresa_id
        ? user?.user.departamento_empresa_id
        : "",
      // Provincia
      province: user?.user.provincia_empresa_id
        ? user?.user.provincia_empresa_id
        : "",
      // Distrito
      district: user?.user.distrito_empresa_id
        ? user?.user.distrito_empresa_id
        : "",
      // Capital social
      social_capital: user?.user.capital_social
        ? user?.user.capital_social
        : "",
      // Monto del patrimonio
      equity_amount: user?.user.monto_patrimonio
        ? user?.user.monto_patrimonio
        : "",
      // Giro de negocio
      business_turn: user?.user.actividad_economica_id
        ? user?.user.actividad_economica_id
        : "",
      // Correo de la empresa
      company_email: user?.user.correo_electronico
        ? user?.user.correo_electronico
        : "",
      // Teléfono
      phone: user?.user.celular ? user?.user.celular : "",
      // Página web (URL)
      website_url: user?.user.sitio_web ? user?.user.sitio_web : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PersonalDataValidation>) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario,
      razon_social: values.social_denomination,
      numero_ruc: values.ruc,
      num_partida_registral: values.registry_entry_number,
      fecha_constitucion: values.constitution_date,
      direccion: values.fiscal_address,
      departamento_empresa_id: values.department,
      provincia_empresa_id: values.province,
      distrito_empresa_id: values.district,
      capital_social: +values.social_capital,
      monto_patrimonio: +values.equity_amount,
      actividad_economica_id: values.business_turn,
      correo_corporativo: values.company_email,
      telefono: values.phone,
      sitio_web: values.website_url,
    };
    startLoading();
    console.log({ valuesApi });

    await userInversorApiCtrl.putPersonalDataIj(
      user.user.codigo_usuario?.toString()!,
      valuesApi
    );

    endLoading();
    //Hooks que cambia de estado para activar el modal
    toggle();
    router.refresh();
  };
  console.log({ user });

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
        1. Datos de la empresa
      </TypographyH2>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Input Denominación Social */}
          <FormField
            control={form.control}
            name="social_denomination"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Denominación Social</FormLabel>
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
          {/* Input Ruc */}
          <FormField
            control={form.control}
            name="ruc"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-3">
                <FormLabel>R.U.C</FormLabel>
                <FormControl>
                  <Input type="text" disabled {...field} placeholder="R.U.C" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de documento de N° Partida registral */}
          <FormField
            control={form.control}
            name="registry_entry_number"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-5 lg:col-span-3">
                <FormLabel>N° Partida registral</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="N° Partida registral"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Fecha de constitución */}
          <FormField
            control={form.control}
            name="constitution_date"
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-12 xs:col-span-6 sm:col-span-7  lg:col-span-4">
                <FormLabel>Fecha de constitución</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input de Domicilio Fiscal */}
          <FormField
            control={form.control}
            name="fiscal_address"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-9 lg:col-span-8">
                <FormLabel>Domicilio Fiscal</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Domicilio Fiscal"
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

          {/* Input de Capital social*/}
          <FormField
            control={form.control}
            name="social_capital"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Capital social</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Capital social"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input de Monto del patrimonio*/}
          <FormField
            control={form.control}
            name="equity_amount"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Monto del patrimonio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Monto del patrimonio"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Combo de Giro de negocio */}
          <FormField
            control={form.control}
            name="business_turn"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Giro de negocio</FormLabel>

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
                    {lineOfBusiness?.map((years) => (
                      <SelectItem
                        key={years.id}
                        value={`${years.id}`}
                        className="focus:bg-gray62/20"
                      >
                        {years.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* capital_social
monto_patrimonio */}

          {/* Input de Correo de la empresa*/}
          <FormField
            control={form.control}
            name="company_email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Correo de la empresa</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled
                    {...field}
                    placeholder="Correo de la empresa"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input de Teléfono*/}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled
                    {...field}
                    placeholder="Teléfono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input de Página web (URL)*/}
          <FormField
            control={form.control}
            name="website_url"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4">
                <FormLabel>Página web (URL)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Página web (URL)"
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
