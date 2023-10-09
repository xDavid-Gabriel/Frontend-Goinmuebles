"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectFinancialDataValidation } from "@/lib/validations/gestor/juridica/nuevo-proyecto/renta";
import { selectOptions } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      // Rentabilidad por alquiler
      rental_profitability_property_price: "", // Precio del inmueble
      rental_profitability_sale_value: "", // Valor de venta
      rental_profitability_requested_financing_amount: "", // Monto del financiamiento solicitado
      rental_profitability_initial_fee: "", // Cuota inicial
      rental_profitability_proposal: "", // Propuesta de rentabilidad por alquiler
      rental_profitability_return_period: "", // Plazo de retorno
      rental_profitability_gross_monthly_rent: "", // Alquiler mensual bruto
      rental_profitability_net_monthly_rent: "", // Alquiler mensual neto
      rental_profitability_total_return_amount: "", // Monto total de retorno

      // Rentabilidad por ganancia o plusvalia
      gain_profitability_property_price: "", // Precio del inmueble
      gain_profitability_sale_value: "", // Valor de venta
      gain_profitability_requested_financing_amount: "", // Monto del financiamiento solicitado
      gain_profitability_initial_fee: "", // Cuota inicial
      gain_profitability_proposal: "", // Propuesta de rentabilidad por alquiler
      gain_profitability_return_period: "", // Plazo de retorno
      gain_profitability_gross_monthly_rent: "", // Alquiler mensual bruto
      gain_profitability_sum_of_both_rents: "", // Suma de renta de ambos

      // Tiempo de gracias para remodelación
      remodeling_grace_period_time: "", // Tiempo para remodelación
      remodeling_grace_period_months: "", // Meses
      remodeling_grace_period_days: "", // Días
      remodeling_grace_period_property_purchase_value: "", // Valor de compra de la propiedad
      remodeling_grace_period_property_sale_value: "", // Valor de venta de la propiedad

      remodeling_budget_to_remodel: "", // Presupuesto para remodelar
      remodeling_execution_time: "", // Tiempo de ejecución de la remodelación
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
          <TypographyH3 className="col-span-12">
            3.1. Rentabilidad por alquiler
          </TypographyH3>
          {/* Input Precio del inmueble*/}
          <FormField
            control={form.control}
            name="rental_profitability_property_price"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Precio del inmueble</FormLabel>
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
            name="rental_profitability_sale_value"
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
          {/* Input Monto del financiamiento solicitado */}
          <FormField
            control={form.control}
            name="rental_profitability_requested_financing_amount"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Monto del financiamiento solicitado</FormLabel>
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
            name="rental_profitability_initial_fee"
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
          {/* Input Propuesta de rentabilidad por alquiler */}
          <FormField
            control={form.control}
            name="rental_profitability_proposal"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Propuesta de rentabilidad por alquiler</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="%" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de Plazo de retorno  */}
          <FormField
            control={form.control}
            name="rental_profitability_return_period"
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
            name="rental_profitability_will_remodel"
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
          {/* Input Alquiler mensual bruto */}
          <FormField
            control={form.control}
            name="rental_profitability_gross_monthly_rent"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Alquiler mensual bruto</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="US$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Alquiler mensual neto */}
          <FormField
            control={form.control}
            name="rental_profitability_net_monthly_rent"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Alquiler mensual neto</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="US$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Monto total de retorno */}
          <FormField
            control={form.control}
            name="rental_profitability_total_return_amount"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Monto total de retorno</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="US$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Rentabilidad por ganancia o plusvalia */}
          <TypographyH3 className="col-span-12">
            3.2. Rentabilidad por ganancia o plusvalia
          </TypographyH3>
          {/* Input Precio del inmueble*/}
          <FormField
            control={form.control}
            name="gain_profitability_property_price"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Precio del inmueble</FormLabel>
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
            name="gain_profitability_sale_value"
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
          {/* Input Monto del financiamiento solicitado */}
          <FormField
            control={form.control}
            name="gain_profitability_requested_financing_amount"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Monto del financiamiento solicitado</FormLabel>
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
            name="gain_profitability_initial_fee"
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
          {/* Input Propuesta de rentabilidad por alquiler */}
          <FormField
            control={form.control}
            name="gain_profitability_proposal"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Propuesta de rentabilidad por alquiler</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="%" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Combo de Plazo de retorno  */}
          <FormField
            control={form.control}
            name="gain_profitability_return_period"
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

          {/* Input Alquiler mensual bruto */}
          <FormField
            control={form.control}
            name="gain_profitability_gross_monthly_rent"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Alquiler mensual bruto</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="US$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Suma de renta de ambos */}
          <FormField
            control={form.control}
            name="gain_profitability_sum_of_both_rents"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Suma de renta de ambos</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="US$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tiempo de gracias para remodelación */}
          <TypographyH3 className="col-span-12">
            3.3. Tiempo de gracias para remodelación
          </TypographyH3>
          {/* Input Tiempo para remodelación */}
          <FormField
            control={form.control}
            name="remodeling_grace_period_time"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Tiempo para remodelación</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Tiempo para remodelación"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Meses */}
          <FormField
            control={form.control}
            name="remodeling_grace_period_months"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Meses</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="Meses" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Días */}
          <FormField
            control={form.control}
            name="remodeling_grace_period_days"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Días</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="Días" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Valor de compra de la propiedad */}
          <FormField
            control={form.control}
            name="remodeling_grace_period_property_purchase_value"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Valor de compra de la propiedad</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Valor de compra de la propiedad"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Valor de venta de la propiedad (aprox) */}
          <FormField
            control={form.control}
            name="remodeling_grace_period_property_sale_value"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                <FormLabel>Valor de venta de la propiedad (aprox)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Valor de venta de la propiedad"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Radio group */}
          <FormField
            control={form.control}
            name="remodeling_grace_period_will_remodel"
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
            name="remodeling_budget_to_remodel"
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
          {/* Input Tiempo de ejecución de la remodelación */}
          <FormField
            control={form.control}
            name="remodeling_execution_time"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                <FormLabel>Tiempo de ejecución de la remodelación</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="n. (días)" />
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
