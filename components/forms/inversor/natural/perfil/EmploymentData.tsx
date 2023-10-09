"use client";
import { BasicLoading, BasicModal, TypographyH2 } from "@/components/shared";
import { useData, useLoading, useToggle } from "@/hooks";
import { IEmploymentStatus, IUser } from "@/interfaces";
import {
  EmploymentDataValidation,
  IndependentDataValidation,
} from "@/lib/validations/inversor/natural/perfil";
import { ENV } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocationSelector } from "@/components/forms";
import { useRouter } from "next/navigation";
import { UserInversorApi } from "@/server";
interface IEmploymentData {
  id: number;
  cargos_ocupa: string;
  departamento_id: string;
  descripcion_independiente: null | string;
  direccion: string;
  distrito_id: string;
  egreso_mensual: string;
  empresa: string;
  estado_laboral: number;
  experiencia_rubro: string;
  giro_negocio: number;
  ingreso_bruto: number;
  provincia_id: string;
  ruc: string;
  telefono: string;
}

interface ActividadEconomica {
  id: number;
  nombre: string;
  fecha_registro: Date;
}

interface Departamento {
  id: string;
  nombre: string;
}

interface Distrito {
  id: string;
  nombre: string;
  provincia_id?: string;
  departamento_id: string;
}

interface EstadoLaboral {
  id: number;
  nombre: string;
}
interface Props {
  user: IUser;
  employmentData: IEmploymentData[];
}
const userInversorApiCtrl = new UserInversorApi();
export const EmploymentData = ({ user, employmentData }: Props) => {
  const dataEmployment = employmentData[0];
  const router = useRouter();
  const [isIndependent, setIsIndependent] = useState(
    dataEmployment?.estado_laboral.toString() || ""
  );
  //const [isIndependent, setIsIndependent] = useState("");
  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();
  const [isDisabled, setIsDisabled] = useState(false);
  //Estado laboral
  const { data: employmentStatus, isLoading: isLoadingEmploymentStatus } =
    useData<IEmploymentStatus[]>(
      `${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.EMPLOYMENT_STATUS}`
    );
  //Años antig.
  const { data: yearsOld, isLoading: isLoadingYearsOld } = useData<
    IEmploymentStatus[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.YEARS_OLD}`);

  const { data: lineOfBusiness, isLoading: isLoadingLineOfBusiness } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.ECONOMIC_ACTIVITY}`);

  const form = useForm<z.infer<typeof EmploymentDataValidation>>({
    resolver: zodResolver(EmploymentDataValidation),

    defaultValues: {
      employment_status: "", // Estado laboral
      work_center: dataEmployment?.empresa || "",
      years_of_seniority: dataEmployment?.experiencia_rubro || "",
      ruc: dataEmployment?.ruc || "",
      address: dataEmployment?.direccion || "",
      department: dataEmployment?.departamento_id || "",
      province: dataEmployment?.provincia_id || "",
      district: dataEmployment?.distrito_id || "",
      position_held: dataEmployment?.cargos_ocupa || "",
      company_phone: dataEmployment?.telefono || "",
      business_nature: dataEmployment?.giro_negocio.toString() || "",
      monthly_income: dataEmployment?.ingreso_bruto.toString() || "",
      monthly_expense: dataEmployment?.egreso_mensual || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof EmploymentDataValidation>) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario!.toString(),

      estado_laboral: values.employment_status,
      //Centro Laboral
      empresa: values.work_center,
      ruc: values.ruc,
      experiencia_rubro: values.years_of_seniority,
      cargos_ocupa: values.position_held,
      telefono: values.company_phone,
      direccion: values.address,
      departamento_id: values.department,
      provincia_id: values.province,
      distrito_id: values.district,
      giro_negocio: values.business_nature,
      ingreso_bruto: values.monthly_income,
      egreso_mensual: values.monthly_expense,
    };

    startLoading();
    if (employmentData.length === 0) {
      await userInversorApiCtrl.postEmploymentData(valuesApi);
    } else {
      await userInversorApiCtrl.putEmploymentData(valuesApi, dataEmployment.id);
    }
    endLoading();
    //Hooks que cambia de estado para activar el modal
    toggle();
    // setIsDisabled(true);
    router.refresh();
  };
  useEffect(() => {
    form.setValue("employment_status", isIndependent);
    if (isIndependent === "3") {
      form.reset();
    }
  }, [isIndependent, form.setValue, form.reset]);
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
        2. Datos laborales
      </TypographyH2>

      {isIndependent === "3" ? (
        <Independent
          user={user}
          setIsIndependent={setIsIndependent}
          isIndependent={isIndependent}
          employmentData={employmentData}
        />
      ) : (
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Combo de estado laboral */}
            <FormField
              control={form.control}
              name="employment_status"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Estado laboral</FormLabel>

                  <Select
                    onValueChange={(value) => {
                      setIsIndependent(value);
                      field.onChange(value);
                    }}
                    defaultValue={isIndependent}
                    value={isIndependent}
                    // disabled={isDisabled || employmentData.length > 0}
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
                      {employmentStatus?.map((employment) => (
                        <SelectItem
                          value={`${employment.id}`}
                          key={employment.id}
                          className="focus:bg-gray62/20"
                        >
                          {employment.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input centro laboral */}
            <FormField
              control={form.control}
              name="work_center"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Centro Laboral</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Centro Laboral"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input RUC*/}
            <FormField
              control={form.control}
              name="ruc"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>R.U.C</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="R.U.C" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Combo de años de antiguedad */}
            <FormField
              control={form.control}
              name="years_of_seniority"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-7 lg:col-span-4">
                  <FormLabel>Años antig.</FormLabel>

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
                      {yearsOld?.map((years) => (
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

            {/* Input  Cargo que ocupa */}
            <FormField
              control={form.control}
              name="position_held"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-5 lg:col-span-3">
                  <FormLabel>Cargo que ocupa</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Cargo que ocupa"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input  Teléfono de la empresa*/}
            <FormField
              control={form.control}
              name="company_phone"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Teléfono de la empresa</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Teléfono de la empresa"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Dirección */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-5">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Dirección" />
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
            {/* Combo de Giro de negocio */}
            <FormField
              control={form.control}
              name="business_nature"
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
            {/* Input Ingreso mensual*/}
            <FormField
              control={form.control}
              name="monthly_income"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-7 sm:col-span-6 lg:col-span-4">
                  <FormLabel>Ingreso mensual</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Ingreso mensual"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Egreso mensual*/}
            <FormField
              control={form.control}
              name="monthly_expense"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-5 lg:col-span-4">
                  <FormLabel>Egreso mensual</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Egreso mensual"
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
      )}
    </>
  );
};
interface PropsIndependent {
  user: IUser;
  setIsIndependent: React.Dispatch<React.SetStateAction<string>>;
  isIndependent: string;
  employmentData: IEmploymentData[];
}
const Independent = ({
  user,
  setIsIndependent,
  isIndependent,
  employmentData,
}: PropsIndependent) => {
  const router = useRouter();
  const dataEmployment = employmentData[0];
  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();
  const [isDisabled, setIsDisabled] = useState(false);
  const { data: employmentStatus, isLoading: isLoadingEmploymentStatus } =
    useData<IEmploymentStatus[]>(
      `${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.EMPLOYMENT_STATUS}`
    );
  const { data: yearsOld, isLoading: isLoadingYearsOld } = useData<
    IEmploymentStatus[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.YEARS_OLD}`);

  const { data: lineOfBusiness, isLoading: isLoadingLineOfBusiness } = useData<
    { id: number; nombre: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.ECONOMIC_ACTIVITY}`);

  const form = useForm<z.infer<typeof IndependentDataValidation>>({
    resolver: zodResolver(IndependentDataValidation),

    defaultValues: {
      employment_status:
        isIndependent || dataEmployment?.estado_laboral.toString(),
      independent_work_description:
        dataEmployment?.descripcion_independiente || "", // Descripción del trabajo como independiente
      ruc: dataEmployment?.ruc || "", // RUC
      industry_experience: dataEmployment?.experiencia_rubro || "", // Experiencia en el rubro
      business_turn: dataEmployment?.giro_negocio.toString() || "", // Giro del negocio
      gross_monthly_income: dataEmployment?.ingreso_bruto.toString() || "", // Ingreso mensual bruto
      gross_monthly_expense: dataEmployment?.egreso_mensual || "", // Egreso mensual bruto
    },
  });

  const onSubmit = async (
    values: z.infer<typeof IndependentDataValidation>
  ) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario?.toString(),
      estado_laboral: values.employment_status,
      descripcion_independiente: values.independent_work_description,
      ruc: values.ruc,
      experiencia_rubro: values.industry_experience,
      giro_negocio: values.business_turn,
      ingreso_bruto: values.gross_monthly_income,
      egreso_mensual: values.gross_monthly_expense,
    };

    startLoading();

    if (employmentData.length === 0) {
      await userInversorApiCtrl.postEmploymentData(valuesApi);
    } else {
      await userInversorApiCtrl.putEmploymentData(valuesApi, dataEmployment.id);
    }
    endLoading();
    //Hooks que cambia de estado para activar el modal
    toggle();
    // setIsDisabled(true);
    router.refresh();
  };

  return (
    <>
      {/* <BasicModal
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
        open={stateSendDataWarning}
        setOpen={toogleSendDataWarning}
      
      /> */}
      <BasicModal
        title="🌟 ¡Información almacenada con éxito! 🌟"
        description={<>Tus datos se han guardado correctamente</>}
        open={state}
        setOpen={toggle}
      />
      <Form {...form}>
        <form
          className={`grid grid-cols-12 gap-2 sm:gap-6 mt-5`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Combo de estado laboral */}
          <FormField
            control={form.control}
            name="employment_status"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-9 sm:col-span-5">
                <FormLabel>Estado laboral</FormLabel>

                <Select
                  onValueChange={(value) => {
                    setIsIndependent(value);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                  value={field.value}
                  //disabled={isDisabled || employmentDataIndependent.length > 0}
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
                    {employmentStatus?.map((employment) => (
                      <SelectItem
                        key={employment.id}
                        value={`${employment.id}`}
                        className="focus:bg-gray62/20"
                      >
                        {employment.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Texarea Descripción del trabajo como independiente */}
          <FormField
            control={form.control}
            name="independent_work_description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12  lg:col-span-8">
                <FormLabel>
                  Descripción del trabajo como independiente
                </FormLabel>

                <FormControl>
                  <Textarea
                    placeholder="Describa por favor"
                    className="resize-none rounded-[20px] border-[2px] font-josefin p-[13px_18px] border-gray62"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input RUC*/}
          <FormField
            control={form.control}
            name="ruc"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>R.U.C</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="R.U.C" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de Experiencia en el rubro */}
          <FormField
            control={form.control}
            name="industry_experience"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Experiencia en el rubro</FormLabel>

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
                    {yearsOld?.map((year) => (
                      <SelectItem
                        value={`${year.id}`}
                        key={year.id}
                        className="focus:bg-gray62/20"
                      >
                        {year.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de Giro del negocio */}
          <FormField
            control={form.control}
            name="business_turn"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Giro del negocio</FormLabel>

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
                    {lineOfBusiness?.map((lineOfBusiness) => (
                      <SelectItem
                        value={`${lineOfBusiness.id}`}
                        key={lineOfBusiness.id}
                        className="focus:bg-gray62/20"
                      >
                        {lineOfBusiness.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Ingreso mensual bruto*/}
          <FormField
            control={form.control}
            name="gross_monthly_income"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Ingreso mensual (bruto)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Ingreso mensual (bruto)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Egreso mensual bruto*/}
          <FormField
            control={form.control}
            name="gross_monthly_expense"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 lg:col-span-4">
                <FormLabel>Egreso mensual (bruto)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Egreso mensual (bruto)"
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
