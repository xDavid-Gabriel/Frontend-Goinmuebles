"use client";
import {
  BasicLoading,
  BasicModal,
  TypographyH2,
  TypographyH3,
} from "@/components/shared";
import { IUser } from "@/interfaces";
import {
  CommercialReferencesValidation,
  OtherAssetsValidation,
  RealEstatePropertiesValidation,
  VehiclesValidation,
} from "@/lib/validations/gestor/natural/perfil";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ENV } from "@/utils";
import { useData, useDynamicInputs, useLoading, useToggle } from "@/hooks";
import { FaMinus, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { LocationSelector } from "@/components/forms";
import { UserGestorApi } from "@/server";
import { useRouter } from "next/navigation";

export interface IPropertyData {
  id: string;
  propiedades_inmuebles: PropiedadesInmueble[];
  vehiculos: Vehiculo[];
  otros_patrimonios: OtrosPatrimonio[];
  referencias_comerciales: ReferenciasComerciale[];
}

export interface OtrosPatrimonio {
  descripcion: string;
}

export interface PropiedadesInmueble {
  tipo_inmueble: number;
  direccion: string;
  departamento_id: string;
  provincia_id: string;
  distrito_id: string;
  valor_propiedad: string;
  numero_partida: string;
}

export interface ReferenciasComerciale {
  nombres: string;
  apellidos: string;
  celular: string;
}

export interface Vehiculo {
  marca: string;
  modelo: string;
  n_tarjeta_propiedad: string;
  anio: number;
}

interface Props {
  user: IUser;
  propertyData: IPropertyData[];
}

const userGestorApiCtrl = new UserGestorApi();
export const PatrimonialData = ({
  user,
  propertyData,
}: // equityDataGp,
// equityDataVehicles,
// equityDataPatrimonies,
// equityDataCr,
Props) => {
  const dataProperty = propertyData[0];

  const router = useRouter();
  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();
  // Tipo de inmueble (Property Type)
  const { data: propertyTypes, isLoading: isLoadingPropertyTypes } = useData<
    { id: number; nombres: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.PROPERTY_TYPES}`);
  // Propiedades Inmuebles
  const defaultRealEstateProperties = {
    property_type: "",
    address: "",
    department: "",
    province: "",
    district: "",
    valuation: "",
    electronic_p: "",
  };
  //Vehiculos
  const defaultVehicles = {
    brand: "",
    model: "",
    year_of_shooting: "",
    property_card_number: "",
  };
  //Otros patrimonios
  const defaultOtherAssets = {
    patrimonies: "",
  };
  //Referencias comerciales
  const defaultCommercialReferences = {
    names: "",
    last_names: "",
    cellphone: "",
  };

  const form = useForm<z.infer<typeof RealEstatePropertiesValidation>>({
    resolver: zodResolver(RealEstatePropertiesValidation),

    // defaultValues: {
    //   real_estate_properties: equityDataGp?.length
    //     ? equityDataGp?.map(transformToDefault)
    //     : [defaultRealEstateProperties],
    // },
    defaultValues: {
      // Propiedades Inmuebles
      real_estate_properties: dataProperty?.propiedades_inmuebles.length
        ? dataProperty?.propiedades_inmuebles.map((item) => {
            return {
              property_type: item.tipo_inmueble
                ? item.tipo_inmueble.toString()
                : "",
              address: item.direccion || "",
              department: item.departamento_id || "",
              province: item.provincia_id || "",
              district: item.distrito_id || "",
              valuation: item.valor_propiedad || "",
              electronic_p: item.numero_partida || "",
            };
          })
        : [defaultRealEstateProperties],
      //Vehiculos
      vehicles: dataProperty?.vehiculos.length
        ? dataProperty?.vehiculos.map((item) => {
            return {
              brand: item.marca || "",
              model: item.modelo || "",
              year_of_shooting: item.anio ? item.anio.toString() : "",
              property_card_number: item.n_tarjeta_propiedad
                ? item.n_tarjeta_propiedad.toString()
                : "",
            };
          })
        : [defaultVehicles],
      //Otros patrimonios
      other_assets: dataProperty?.otros_patrimonios.length
        ? dataProperty?.otros_patrimonios.map((item) => {
            return {
              patrimonies: item.descripcion || "",
            };
          })
        : [defaultOtherAssets],
      //Referencias comerciales
      commercial_references: dataProperty?.referencias_comerciales.length
        ? dataProperty?.referencias_comerciales.map((item) => {
            return {
              names: item.nombres || "",
              last_names: item.apellidos || "",
              cellphone: item.celular || "",
            };
          })
        : [defaultCommercialReferences],
    },
  });

  //Hooks Propiedades inmuebles
  const {
    fields: realEstateProperties,
    handleAddFields: handleAddFieldsProperties,
    fieldSetsCount: fieldSetsCountProperties,
    handleRemoveFields: handleRemoveFieldsProperties,
  } = useDynamicInputs({
    defaultFieldSet: defaultRealEstateProperties,
    name: "real_estate_properties",
    control: form.control,
    count: dataProperty?.propiedades_inmuebles.length || 1,
  });
  //Hooks Vehicles
  const {
    fields: vehiclesData,
    handleAddFields: handleAddFieldsVehicles,
    fieldSetsCount: fieldSetsCountVehicles,
    handleRemoveFields: handleRemoveFieldsVehicles,
  } = useDynamicInputs({
    defaultFieldSet: defaultVehicles,
    name: "vehicles",
    control: form.control,
    count: dataProperty?.vehiculos.length || 1,
  });

  //Otros patrimonios
  const {
    fields: otherAssetsData,
    handleAddFields: handleAddFieldsOtherAssets,
    fieldSetsCount: fieldSetsCountOtherAssets,
    handleRemoveFields: handleRemoveFieldsOtherAssets,
  } = useDynamicInputs({
    //
    defaultFieldSet: defaultOtherAssets,
    name: "other_assets",
    control: form.control,
    count: dataProperty?.otros_patrimonios.length || 1,
  });

  //Referencias comerciales
  const {
    fields: commercialReferencesData,
    handleAddFields: handleAddFieldsCommercial,
    fieldSetsCount: fieldSetsCountCommercial,
    handleRemoveFields: handleRemoveFieldsCommercial,
  } = useDynamicInputs({
    defaultFieldSet: defaultCommercialReferences,
    name: "commercial_references",
    control: form.control,
    count: dataProperty?.referencias_comerciales.length || 1,
  });

  const onSubmit = async (
    values: z.infer<typeof RealEstatePropertiesValidation>
  ) => {
    const valuesApi = {
      codigo_usuario: user.user.codigo_usuario,
      // user: user.user.id,
      propiedades_inmuebles: values.real_estate_properties.map((item) => {
        return {
          tipo_inmueble: item.property_type,
          direccion: item.address,
          departamento_id: item.department,
          provincia_id: item.province,
          distrito_id: item.district,
          valor_propiedad: item.valuation,
          numero_partida: item.electronic_p,
        };
      }),
      vehiculos: values.vehicles.map((item) => {
        return {
          marca: item.brand,
          modelo: item.model,
          n_tarjeta_propiedad: item.property_card_number,
          anio: item.year_of_shooting,
        };
      }),
      otros_patrimonios: values.other_assets.map((item) => {
        return {
          descripcion: item.patrimonies,
        };
      }),
      referencias_comerciales: values.commercial_references.map((item) => {
        return {
          nombres: item.names,
          apellidos: item.last_names,
          celular: item.cellphone,
        };
      }),
    };
    startLoading();

    if (propertyData.length === 0) {
      await userGestorApiCtrl.postPropertyData(valuesApi);
    } else {
      await userGestorApiCtrl.putPropertyData(
        valuesApi,
        user.user.codigo_usuario?.toString()!
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
        3. Datos patrimoniales
      </TypographyH2>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {realEstateProperties.map((_, index) => (
            <React.Fragment key={index}>
              <TypographyH3 className="col-span-12">
                Propiedades Inmuebles ({index + 1} <small>Opcional</small>)
              </TypographyH3>
              {/* Combo de tipo de inmueble */}
              <FormField
                control={form.control}
                name={`real_estate_properties[${index}].property_type` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-5">
                    <FormLabel>Tipo de inmueble</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                        {propertyTypes?.map((propertyType) => (
                          <SelectItem
                            key={propertyType.id}
                            value={`${propertyType.id}`}
                            className="focus:bg-gray62/20"
                          >
                            {propertyType.nombres}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Input Dirección */}
              <FormField
                control={form.control}
                name={`real_estate_properties[${index}].address` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-7">
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
                nameDepartment={
                  `real_estate_properties[${index}].department` as any
                }
                nameProvince={
                  `real_estate_properties[${index}].province` as any
                }
                nameDistrict={
                  `real_estate_properties[${index}].district` as any
                }
                classNameFormItem="col-span-12 xs:col-span-6 sm:col-span-4"
                classNameFormLabel="text-gray62"
                classNameSelectTrigger="border-gray62"
                classNameSelectItem="focus:bg-gray62/20"
              />
              {/* Input Valorización */}
              <FormField
                control={form.control}
                name={`real_estate_properties[${index}].valuation` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                    <FormLabel>Valorización</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Valorización"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input P.Electronica */}
              <FormField
                control={form.control}
                name={`real_estate_properties[${index}].electronic_p` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                    <FormLabel>P.Electronica</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="P.Electronica "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </React.Fragment>
          ))}
          <div className="mx-auto col-span-12 sm:mr-0 sm:ml-auto flex gap-4">
            {fieldSetsCountProperties <= 1 ? (
              ""
            ) : (
              <button
                // disabled={stateIsDisabled || equityDataGp?.length! > 0}
                className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center mx-auto col-span-12 sm:mr-0 sm:ml-auto ${
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }`}
                type="button"
                onClick={handleRemoveFieldsProperties}
              >
                <FaMinus />
              </button>
            )}

            {fieldSetsCountProperties >= 3 ? (
              ""
            ) : (
              <button
                // disabled={stateIsDisabled || equityDataGp?.length! > 0}
                className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center ${
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }`}
                type="button"
                onClick={handleAddFieldsProperties}
              >
                <FaPlus />
              </button>
            )}
          </div>

          {vehiclesData.map((_, index) => (
            <React.Fragment key={index}>
              <TypographyH3 className="col-span-12">
                Vehículos ({index + 1} <small>Opcional</small>)
              </TypographyH3>
              {/* Input Marca*/}
              <FormField
                control={form.control}
                name={`vehicles[${index}].brand` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1  col-span-12 xs:col-span-6 lg:col-span-7">
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Marca" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Input Modelo */}
              <FormField
                control={form.control}
                name={`vehicles[${index}].model` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1  col-span-12 xs:col-span-6 lg:col-span-4">
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Modelo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input Año rodaje */}
              <FormField
                control={form.control}
                name={`vehicles[${index}].year_of_shooting` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-5">
                    <FormLabel>Año rodaje</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Año rodaje"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Input N° tarjeta de propiedad*/}
              <FormField
                control={form.control}
                name={`vehicles[${index}].property_card_number` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-7 lg:col-span-4">
                    <FormLabel>N° tarjeta de propiedad</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="N° tarjeta de propiedad"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </React.Fragment>
          ))}

          <div className="mx-auto col-span-12 sm:mr-0 sm:ml-auto flex gap-4">
            {fieldSetsCountVehicles <= 1 ? (
              ""
            ) : (
              <button
                // disabled={stateIsDisabled || equityDataGp?.length! > 0}
                className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center mx-auto col-span-12 sm:mr-0 sm:ml-auto ${
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }`}
                type="button"
                onClick={handleRemoveFieldsVehicles}
              >
                <FaMinus />
              </button>
            )}

            {fieldSetsCountVehicles >= 3 ? (
              ""
            ) : (
              <button
                // disabled={stateIsDisabled || equityDataGp?.length! > 0}
                className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center ${
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }`}
                type="button"
                onClick={handleAddFieldsVehicles}
              >
                <FaPlus />
              </button>
            )}
          </div>

          {otherAssetsData.map((_, index) => (
            <React.Fragment key={index}>
              {/* Input Otros patrimonios*/}
              <TypographyH3 className="col-span-12">
                Otros patrimonios ({index + 1} <small>Opcional</small>)
              </TypographyH3>
              <FormField
                control={form.control}
                name={`other_assets[${index}].patrimonies` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-11">
                    <FormLabel>Otros patrimonios</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Otros patrimonios"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </React.Fragment>
          ))}

          <div className="mx-auto col-span-12 sm:mr-0 sm:ml-auto flex gap-4">
            {fieldSetsCountOtherAssets <= 1 ? (
              ""
            ) : (
              <button
                // disabled={stateIsDisabled || equityDataGp?.length! > 0}
                className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center mx-auto col-span-12 sm:mr-0 sm:ml-auto ${
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }`}
                type="button"
                onClick={handleRemoveFieldsOtherAssets}
              >
                <FaMinus />
              </button>
            )}

            {fieldSetsCountOtherAssets >= 3 ? (
              ""
            ) : (
              <button
                // disabled={stateIsDisabled || equityDataGp?.length! > 0}
                className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center ${
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }`}
                type="button"
                onClick={handleAddFieldsOtherAssets}
              >
                <FaPlus />
              </button>
            )}
          </div>
          {commercialReferencesData.map((_, index) => (
            <React.Fragment key={index}>
              <TypographyH3 className="col-span-12">
                Referencia comerciales({index + 1})
              </TypographyH3>
              {/* Input Names*/}
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
              {/* Input Celular*/}
              <FormField
                control={form.control}
                name={`commercial_references[${index}].cellphone` as any}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Celular" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </React.Fragment>
          ))}
          <div className="mx-auto col-span-12 sm:mr-0 sm:ml-auto flex gap-4">
            {fieldSetsCountCommercial <= 1 ? (
              ""
            ) : (
              <button
                // disabled={stateIsDisabled || equityDataGp?.length! > 0}
                className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center mx-auto col-span-12 sm:mr-0 sm:ml-auto ${
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }`}
                type="button"
                onClick={handleRemoveFieldsCommercial}
              >
                <FaMinus />
              </button>
            )}

            {fieldSetsCountCommercial >= 3 ? (
              ""
            ) : (
              <button
                // disabled={stateIsDisabled || equityDataGp?.length! > 0}
                className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center ${
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }`}
                type="button"
                onClick={handleAddFieldsCommercial}
              >
                <FaPlus />
              </button>
            )}
          </div>
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
      {/* <Vehicles user={user} equityDataVehicles={equityDataVehicles} />
      <OtherAssets user={user} equityDataPatrimonies={equityDataPatrimonies} />
      <CommercialReferences user={user} equityDataCr={equityDataCr} /> */}
    </>
  );
};

// const Vehicles = ({ user, equityDataVehicles }: Props) => {
//   const router = useRouter();
//   const { state, toggle } = useToggle();
//   const { state: stateIsDisabled, toggle: toggleIsDisabled } = useToggle();
//   const { isLoading, startLoading, endLoading } = useLoading();
//   const defaultVehicles = {
//     brand: "",
//     model: "",
//     year_of_shooting: "",
//     property_card_number: "",
//   };
//   const transformToDefault = (data: any) => ({
//     brand: data.marca || "",
//     model: data.modelo || "",
//     year_of_shooting: data.anio || "",
//     property_card_number: data.n_tarjeta_propiedad || "",
//   });
//   const form = useForm<z.infer<typeof VehiclesValidation>>({
//     resolver: zodResolver(VehiclesValidation),
//     defaultValues: {
//       vehicles: equityDataVehicles?.length
//         ? equityDataVehicles?.map(transformToDefault)
//         : [defaultVehicles],
//     },
//   });
//   const {
//     fields: vehiclesData,
//     handleAddFields,
//     fieldSetsCount,
//   } = useDynamicInputs({
//     defaultFieldSet: defaultVehicles,
//     name: "vehicles",
//     control: form.control,
//   });
//   const onSubmit = async (values: z.infer<typeof VehiclesValidation>) => {
//     const promises = values.vehicles.map((property) => {
//       const valuesApi = {
//         codigo_usuario: user.user.codigo_usuario!.toString(),
//         marca: property.brand,
//         modelo: property.model,
//         n_tarjeta_propiedad: property.property_card_number,
//         anio: +property.year_of_shooting,
//       };
//       return userGestorApiCtrl.postEquityDataVehicles(valuesApi);
//     });

//     toggleIsDisabled();
//     startLoading();
//     try {
//       await Promise.all(promises);
//       // Si todas las solicitudes tienen éxito:
//       toggle();
//       router.refresh();
//     } catch (error) {
//       console.error("Error al enviar los datos:", error);
//       // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
//     } finally {
//       endLoading();
//     }
//   };
//   return (
//     <>
//       <BasicModal
//         title="🌟 ¡Información almacenada con éxito! 🌟"
//         description={<>Tus datos se han guardado correctamente</>}
//         open={state}
//         setOpen={toggle}
//       />
//       <TypographyH3>Vehículos</TypographyH3>
//       <Form {...form}>
//         <form
//           className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
//           onSubmit={form.handleSubmit(onSubmit)}
//         >
//           {vehiclesData.map((_, index) => (
//             <React.Fragment key={index}>
//               {/* Input Marca*/}
//               <FormField
//                 control={form.control}
//                 name={`vehicles[${index}].brand` as any}
//                 render={({ field }) => (
//                   <FormItem className="flex w-full flex-col gap-1  col-span-12 xs:col-span-6 lg:col-span-7">
//                     <FormLabel>Marca</FormLabel>
//                     <FormControl>
//                       <Input type="text" {...field} placeholder="Marca" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Input Modelo */}
//               <FormField
//                 control={form.control}
//                 name={`vehicles[${index}].model` as any}
//                 render={({ field }) => (
//                   <FormItem className="flex w-full flex-col gap-1  col-span-12 xs:col-span-6 lg:col-span-4">
//                     <FormLabel>Modelo</FormLabel>
//                     <FormControl>
//                       <Input type="text" {...field} placeholder="Modelo" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Input Año rodaje */}
//               <FormField
//                 control={form.control}
//                 name={`vehicles[${index}].year_of_shooting` as any}
//                 render={({ field }) => (
//                   <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-5">
//                     <FormLabel>Año rodaje</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         placeholder="Año rodaje"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Input N° tarjeta de propiedad*/}
//               <FormField
//                 control={form.control}
//                 name={`vehicles[${index}].property_card_number` as any}
//                 render={({ field }) => (
//                   <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-7 lg:col-span-4">
//                     <FormLabel>N° tarjeta de propiedad</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         placeholder="N° tarjeta de propiedad"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </React.Fragment>
//           ))}
//           {fieldSetsCount >= 3 ? (
//             ""
//           ) : (
//             <button
//               disabled={stateIsDisabled || equityDataVehicles?.length! > 0}
//               className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center mx-auto col-span-12 sm:mr-0 sm:ml-auto ${
//                 user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
//               }`}
//               type="button"
//               onClick={handleAddFields}
//             >
//               <FaPlus />
//             </button>
//           )}

//           <Button
//             type="submit"
//             variant="primary-red-100"
//             className="w-fit ml-auto col-span-12"
//             disabled={
//               isLoading || stateIsDisabled || equityDataVehicles?.length! > 0
//             }
//           >
//             {isLoading ? (
//               <BasicLoading name="Enviando..." className="flex-row gap-3" />
//             ) : (
//               "Guardar y enviar"
//             )}
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };

// const OtherAssets = ({ user, equityDataPatrimonies }: Props) => {
//   const router = useRouter();
//   const { state, toggle } = useToggle();
//   const { state: stateIsDisabled, toggle: toggleIsDisabled } = useToggle();
//   const { isLoading, startLoading, endLoading } = useLoading();
//   const defaultOtherAssets = {
//     patrimonies: "",
//   };
//   const transformToDefault = (data: any) => ({
//     patrimonies: data.descripcion || "",
//   });
//   const form = useForm<z.infer<typeof OtherAssetsValidation>>({
//     resolver: zodResolver(OtherAssetsValidation),

//     defaultValues: {
//       other_assets: equityDataPatrimonies?.length
//         ? equityDataPatrimonies?.map(transformToDefault)
//         : [defaultOtherAssets],
//     },
//   });

//   const {
//     fields: otherAssetsData,
//     handleAddFields,
//     fieldSetsCount,
//   } = useDynamicInputs({
//     defaultFieldSet: defaultOtherAssets,
//     name: "other_assets",
//     control: form.control,
//   });
//   const onSubmit = async (values: z.infer<typeof OtherAssetsValidation>) => {
//     const promises = values.other_assets.map((property) => {
//       const valuesApi = {
//         codigo_usuario: user.user.codigo_usuario!.toString(),
//         descripcion: property.patrimonies,
//       };
//       return userGestorApiCtrl.postEquityDataPatrimonies(valuesApi);
//     });

//     toggleIsDisabled();
//     startLoading();
//     try {
//       await Promise.all(promises);
//       // Si todas las solicitudes tienen éxito:
//       toggle();
//       router.refresh();
//     } catch (error) {
//       console.error("Error al enviar los datos:", error);
//       // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
//     } finally {
//       endLoading();
//     }
//   };
//   return (
//     <>
//       <BasicModal
//         title="🌟 ¡Información almacenada con éxito! 🌟"
//         description={<>Tus datos se han guardado correctamente</>}
//         open={state}
//         setOpen={toggle}
//       />
//       <Form {...form}>
//         <form
//           className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
//           onSubmit={form.handleSubmit(onSubmit)}
//         >
//           {otherAssetsData.map((_, index) => (
//             <React.Fragment key={index}>
//               {/* Input Otros patrimonios*/}
//               <FormField
//                 control={form.control}
//                 name={`other_assets[${index}].patrimonies` as any}
//                 render={({ field }) => (
//                   <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-11">
//                     <FormLabel>Otros patrimonios</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="text"
//                         {...field}
//                         placeholder="Otros patrimonios"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </React.Fragment>
//           ))}
//           {fieldSetsCount >= 3 ? (
//             ""
//           ) : (
//             <button
//               disabled={stateIsDisabled || equityDataPatrimonies?.length! > 0}
//               className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center mx-auto col-span-12 sm:mr-0 sm:ml-auto ${
//                 user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
//               }`}
//               type="button"
//               onClick={handleAddFields}
//             >
//               <FaPlus />
//             </button>
//           )}

//           <Button
//             type="submit"
//             variant="primary-red-100"
//             className="w-fit ml-auto col-span-12"
//             disabled={
//               isLoading || stateIsDisabled || equityDataPatrimonies?.length! > 0
//             }
//           >
//             {isLoading ? (
//               <BasicLoading name="Enviando..." className="flex-row gap-3" />
//             ) : (
//               "Guardar y enviar"
//             )}
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };

// const CommercialReferences = ({ user, equityDataCr }: Props) => {
//   const router = useRouter();
//   const { state, toggle } = useToggle();
//   const { state: stateIsDisabled, toggle: toggleIsDisabled } = useToggle();
//   const { isLoading, startLoading, endLoading } = useLoading();
//   const defaultCommercialReferences = {
//     names: "",
//     last_names: "",
//     cellphone: "",
//   };

//   const transformToDefault = (data: any) => ({
//     names: data.nombres || "",
//     last_names: data.apellidos || "",
//     cellphone: data.celular || "",
//   });
//   const form = useForm<z.infer<typeof CommercialReferencesValidation>>({
//     resolver: zodResolver(CommercialReferencesValidation),

//     defaultValues: {
//       commercial_references: equityDataCr?.length
//         ? equityDataCr?.map(transformToDefault)
//         : [defaultCommercialReferences],
//     },
//   });
//   const { fields, handleAddFields, fieldSetsCount } = useDynamicInputs({
//     defaultFieldSet: defaultCommercialReferences,
//     name: "commercial_references",
//     control: form.control,
//   });

//   const onSubmit = async (
//     values: z.infer<typeof CommercialReferencesValidation>
//   ) => {
//     const promises = values.commercial_references.map((property) => {
//       const valuesApi = {
//         codigo_usuario: user.user.codigo_usuario!.toString(),
//         nombres: property.names,
//         apellidos: property.last_names,
//         celular: property.cellphone,
//       };
//       return userGestorApiCtrl.postEquityDataCr(valuesApi);
//     });

//     toggleIsDisabled();
//     startLoading();
//     try {
//       await Promise.all(promises);
//       // Si todas las solicitudes tienen éxito:
//       toggle();
//       router.refresh();
//     } catch (error) {
//       console.error("Error al enviar los datos:", error);
//       // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
//     } finally {
//       endLoading();
//     }
//   };

//   return (
//     <>
//       <BasicModal
//         title="🌟 ¡Información almacenada con éxito! 🌟"
//         description={<>Tus datos se han guardado correctamente</>}
//         open={state}
//         setOpen={toggle}
//       />
//       <Form {...form}>
//         <form
//           className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
//           onSubmit={form.handleSubmit(onSubmit)}
//         >
//           {fields.map((_, index) => (
//             <React.Fragment key={index}>
//               {/* Input Names*/}
//               <FormField
//                 control={form.control}
//                 name={`commercial_references[${index}].names` as any}
//                 render={({ field }) => (
//                   <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
//                     <FormLabel>Nombres</FormLabel>
//                     <FormControl>
//                       <Input type="text" {...field} placeholder="Nombres" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Input Apellidos*/}
//               <FormField
//                 control={form.control}
//                 name={`commercial_references[${index}].last_names` as any}
//                 render={({ field }) => (
//                   <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
//                     <FormLabel>Apellidos</FormLabel>
//                     <FormControl>
//                       <Input type="text" {...field} placeholder="Apellidos" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Input Celular*/}
//               <FormField
//                 control={form.control}
//                 name={`commercial_references[${index}].cellphone` as any}
//                 render={({ field }) => (
//                   <FormItem className="flex w-full flex-col gap-1 col-span-12 sm:col-span-4">
//                     <FormLabel>Celular</FormLabel>
//                     <FormControl>
//                       <Input type="text" {...field} placeholder="Celular" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </React.Fragment>
//           ))}
//           {fieldSetsCount >= 3 ? (
//             ""
//           ) : (
//             <button
//               disabled={stateIsDisabled || equityDataCr?.length! > 0}
//               className={`rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] self-end text-[20px] sm:text-[30px] text-white grid place-content-center mx-auto col-span-12 sm:mr-0 sm:ml-auto ${
//                 user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
//               }`}
//               type="button"
//               onClick={handleAddFields}
//             >
//               <FaPlus />
//             </button>
//           )}

//           <Button
//             type="submit"
//             variant="primary-red-100"
//             className="w-fit ml-auto col-span-12"
//             disabled={isLoading || stateIsDisabled || equityDataCr?.length! > 0}
//           >
//             {isLoading ? (
//               <BasicLoading name="Enviando..." className="flex-row gap-3" />
//             ) : (
//               "Guardar y enviar"
//             )}
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };
