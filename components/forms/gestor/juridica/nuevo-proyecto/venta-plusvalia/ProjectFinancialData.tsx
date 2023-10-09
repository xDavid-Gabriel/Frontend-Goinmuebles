"use client";
import { LocationSelector } from "@/components/forms";
import { TypographyH2, TypographyH3 } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectFinancialDataValidation } from "@/lib/validations/gestor/juridica/nuevo-proyecto/venta-plusvalia";
import { selectOptions } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const remodelData = [
  {
    id: 1,
    nombre_estado: "No",
  },
  {
    id: 2,
    nombre_estado: "Si",
  },
];
export const ProjectFinancialData = () => {
  const form = useForm<z.infer<typeof ProjectFinancialDataValidation>>({
    resolver: zodResolver(ProjectFinancialDataValidation),

    defaultValues: {
      // Precio del inmueble (compra)
      property_price: "",

      // Valor de venta (aprox)
      sale_value: "",

      // Monto a financiar
      financing_amount: "",

      // Cuota inicial
      initial_fee: "",

      // Propuesta de rentabilidad
      profitability_proposal: "",

      // Plazo de retorno
      return_period: "",

      // Presupuesto para remodelar
      remodeling_budget: "",

      // Tiempo de ejecución de remodelación
      remodeling_execution_time: "",

      /* Datos del garante */
      // Nombres completos
      full_names: "",

      // Apellido completo
      last_name_complete: "",

      // Edad
      age: "",

      // Documento de identidad
      identity_document: "",

      // Número de documento
      document_number: "",

      // Estado civil
      civil_status: "",

      // Carga familiar
      family_burden: "",

      // Fecha de nacimiento
      dob: "",

      // Dirección
      address: "",

      // Departamento
      department: "",

      // Provincia
      province: "",

      // Distrito
      district: "",

      // Correo electrónico
      email: "",

      // Número de teléfono móvil
      cellphone: "",
    },
  });
  const onSubmit = async (
    values: z.infer<typeof ProjectFinancialDataValidation>
  ) => {
    console.log({ values });
  };
  return (
    <>
      <TypographyH2 variant="primary-100" className="text-tomato/80">
        3. Datos financieros del proyecto
      </TypographyH2>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Input Precio del inmueble (compra) */}
          <FormField
            control={form.control}
            name="property_price"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Precio del inmueble (compra)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Precio del inmueble (compra)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Valor de venta (aprox)*/}
          <FormField
            control={form.control}
            name="sale_value"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Valor de venta (aprox)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Valor de venta (aprox)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Monto a financiar */}
          <FormField
            control={form.control}
            name="financing_amount"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Monto a financiar</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="US$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Cuota inicial */}
          <FormField
            control={form.control}
            name="initial_fee"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Cuota inicial</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="US$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Propuesta de rentabilidad */}
          <FormField
            control={form.control}
            name="profitability_proposal"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Propuesta de rentabilidad</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="%" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de Plazo de retorno */}
          <FormField
            control={form.control}
            name="return_period"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Plazo de retorno</FormLabel>

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
          {/* Radio group */}
          <FormField
            control={form.control}
            name="will_remodel"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Va a remodelar el inmueble?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                  >
                    {remodelData?.map((remodel) => (
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
          {/* Input Presupuesto para remodelar */}
          <FormField
            control={form.control}
            name="remodeling_budget"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Presupuesto para remodelar</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="US$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Tiempo de ejecución de remodelación */}
          <FormField
            control={form.control}
            name="remodeling_execution_time"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Tiempo de ejecución de remodelación</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="n. (días)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Datos del garante */}
          <TypographyH3 className="col-span-12">Datos del garante</TypographyH3>
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
                    <SelectItem value="DNI" className="focus:bg-gray62/20">
                      DNI
                    </SelectItem>
                    <SelectItem value="CE" className="focus:bg-gray62/20">
                      CE
                    </SelectItem>
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
                  <Input type="text" {...field} placeholder="nº Documento" />
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
                    // setIsSpouse(value);
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
                    <SelectItem value="Casado" className="focus:bg-gray62/20">
                      Casado
                    </SelectItem>
                    <SelectItem
                      value="Divorciado"
                      className="focus:bg-gray62/20"
                    >
                      Divorciado
                    </SelectItem>
                    <SelectItem value="Soltero" className="focus:bg-gray62/20">
                      Soltero
                    </SelectItem>
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
                    <SelectItem value="1-hijo" className="focus:bg-gray62/20">
                      1 Hijo
                    </SelectItem>
                    <SelectItem value="2-hijos" className="focus:bg-gray62/20">
                      2 Hijos
                    </SelectItem>
                    <SelectItem value="3-hijos" className="focus:bg-gray62/20">
                      3 Hijos
                    </SelectItem>
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
                  <Input type="text" {...field} placeholder="Celular" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="primary-red-100"
            className="w-fit ml-auto col-span-12"
          >
            Guardar y enviar
          </Button>
        </form>
      </Form>
    </>
  );
};
