"use client";
import { TypographyH2, TypographyH3 } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { ENV, filesImagesGestorVenta, selectOptions } from "@/utils";
import { useData } from "@/hooks";
import React, { useState } from "react";

import {
  Accordion as LibraryAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AiOutlineCheck } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DepartmentInputsValidation,
  HomeValidation,
  LocalInputsValidation,
  OfficeInputsValidation,
  PropImagesVideoValidation,
  TerrainInputsValidation,
} from "@/lib/validations/gestor/juridica/nuevo-proyecto/venta-plusvalia";
import { PropImagesVideo } from "@/components/forms";

const fileFieldsImages = {
  interior_photo_text_1: "",
  interior_photo_text_2: "",
  interior_photo_text_3: "",
  exterior_photo_text_1: "",
  exterior_photo_text_2: "",
  exterior_photo_text_3: "",
  patio_photo_text_1: "",
  patio_photo_text_2: "",
  patio_photo_text_3: "",
  youtube_link: "",
};
interface Props {
  imagesVideo?: boolean;
}
export const PropertyDescription = ({ imagesVideo = true }: Props) => {
  // Tipo de inmueble (Property Type)
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleItemClick = (padre: string, hijo?: string) => {
    if (padre && hijo) {
      setSelectedItem(`${padre}-${hijo}`);
    } else {
      setSelectedItem(padre);
    }
  };

  const handleValueClick = (value: string) => {
    setSelectedValue(value);
  };

  const { data: propertyTypes, isLoading: isLoadingPropertyTypes } = useData<
    {
      id: number;
      nombres: string;
      tipos_inmuebles: { id: number; nombres: string }[];
    }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.PROPERTY_TYPES}`);

  // const form = useForm<z.infer<typeof AdditionalInformationValidation>>({
  //   resolver: zodResolver(AdditionalInformationValidation),

  //   defaultValues: {
  //     /* ¿Cómo se enteró de */
  //     how_did_you_hear_about: "",
  //   },
  // });

  const [padre, hijo] = selectedItem.split("-");

  return (
    <>
      <TypographyH2 variant="primary-100" className="text-tomato/80">
        2. Descripción de la propiedad
      </TypographyH2>

      <div className="col-span-7 flex flex-col gap-2">
        <label className="font-bold text-gray62">Tipo de inmueble</label>
        <LibraryAccordion
          type="single"
          collapsible
          className="flex flex-col gap-5 sm:gap-10"
        >
          <AccordionItem
            value="item-1"
            className="border-[2px] border-gray62 rounded-[20px]"
          >
            <AccordionTrigger className="font-josefin px-[18px]">
              {selectedValue.length > 0 ? selectedValue : "Selecciona"}
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-7 flex flex-col gap-1 pb-5 h-[180px] overflow-auto">
                {propertyTypes?.map((propertyType) => (
                  <React.Fragment key={propertyType.id}>
                    {propertyType.tipos_inmuebles.length === 0 ? (
                      ""
                    ) : (
                      <strong
                        className={`flex gap-1 items-center rounded-[10px] w-fit py-1 px-4 ${
                          selectedItem === propertyType.nombres &&
                          "bg-gray62/20"
                        } 
                         ${
                           propertyType.tipos_inmuebles.length === 0 &&
                           "cursor-pointer hover:bg-gray62/20"
                         }
                        `}
                        onClick={() => {
                          if (propertyType.tipos_inmuebles.length === 0) {
                            handleItemClick(propertyType.nombres);
                            //Cambiara el valor para el select
                            handleValueClick(propertyType.nombres);
                          }
                        }}
                      >
                        {selectedItem === propertyType.nombres && (
                          <AiOutlineCheck />
                        )}

                        {propertyType.nombres}
                      </strong>
                    )}

                    {propertyType.tipos_inmuebles.length > 0 && (
                      <ul className="flex flex-col gap-1">
                        {propertyType.tipos_inmuebles.map((tipe) => (
                          <li
                            key={tipe.id}
                            className={`flex gap-1 items-center cursor-pointer hover:bg-gray62/20 rounded-[10px] w-fit py-1 px-4 ${
                              selectedItem ===
                                `${propertyType.nombres}-${tipe.nombres}` &&
                              "bg-gray62/20"
                            }`}
                            onClick={() => {
                              handleItemClick(
                                propertyType.nombres,
                                tipe.nombres
                              );
                              //Cambiara el valor para el select
                              handleValueClick(tipe.nombres);
                            }}
                          >
                            {selectedItem ===
                              `${propertyType.nombres}-${tipe.nombres}` && (
                              <AiOutlineCheck />
                            )}

                            {tipe.nombres}
                          </li>
                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </LibraryAccordion>
      </div>

      {padre === "Casa" && <HomeInputs selectedValue={selectedValue} />}
      {padre === "Terreno" && <TerrainInputs selectedValue={selectedValue} />}
      {padre === "Local" && <LocalInputs selectedValue={selectedValue} />}
      {/* {padre === "Desarrollo" && <div>Desarrollo.....</div>} */}
      {padre === "Departamento" && (
        <DepartmentInputs selectedValue={selectedValue} />
      )}
      {padre === "Oficina" && <OfficeInputs selectedValue={selectedValue} />}
      {/* {padre === "Proyecto" && <div>Proyecto.....</div>} */}
      {padre === "Otros" && <div>Seleccione otro tipo por favor...</div>}
      {imagesVideo && (
        <PropImagesVideo
          fileFields={fileFieldsImages}
          validationSchema={PropImagesVideoValidation}
          fileInputs={filesImagesGestorVenta}
        />
      )}
    </>
  );
};

type FileNameRoomFeatures =
  | "living_room"
  | "living_dining_room"
  | "living_area"
  | "kitchenette"
  | "traditional_kitchen"
  | "study"
  | "main_bedroom_with_bathroom"
  | "service_room"
  | "interior_garden"
  | "exterior_garden"
  | "roof_terrace"
  | "pool"
  | "gym"
  | "video_surveillance"
  | "electric_fence"
  | "cistern"
  | "kitchen_cabinets"
  | "jacuzzi"
  | "walk_in_closet"
  | "inventory";

const roomFeatures: {
  id: FileNameRoomFeatures;
  label: string;
}[] = [
  { id: "living_room", label: "Sala comedor" },
  { id: "living_dining_room", label: "Living comedor" },
  { id: "living_area", label: "Sala de estar" },
  { id: "kitchenette", label: "Kitchenette" },
  { id: "traditional_kitchen", label: "Cocina tradicional" },
  { id: "study", label: "Estudio" },
  { id: "main_bedroom_with_bathroom", label: "Dormitorio principal c/b" },
  { id: "service_room", label: "Cuarto de servicio" },
  { id: "interior_garden", label: "Jardín interior" },
  { id: "exterior_garden", label: "Jardín exterior" },
  { id: "roof_terrace", label: "Azotea" },
  { id: "pool", label: "Piscina" },
  { id: "gym", label: "Gimnasio" },
  { id: "video_surveillance", label: "Video vigilancia" },
  { id: "electric_fence", label: "Cerco eléctrico" },
  { id: "cistern", label: "Cisterna" },
  { id: "kitchen_cabinets", label: "Reposteros en cocina" },
  { id: "jacuzzi", label: "Jacuzzi" },
  { id: "walk_in_closet", label: "Walk in closet" },
  { id: "inventory", label: "Inventario" },
];
type FileNamePublicServices =
  | "water"
  | "electricity"
  | "kw"
  | "three_phase"
  | "single_phase";

const publicServices: {
  id: FileNamePublicServices;
  label: string;
}[] = [
  { id: "water", label: "Agua" },
  { id: "electricity", label: "Electricidad" },
  { id: "kw", label: "KW" },
  { id: "three_phase", label: "Trifásico" },
  { id: "single_phase", label: "Monofásico" },
];
type FileNameFinishes = "floors" | "windows" | "cladding";

const finishes: {
  id: FileNameFinishes;
  label: string;
}[] = [
  { id: "floors", label: "Pisos" },
  { id: "windows", label: "Ventanas" },
  { id: "cladding", label: "Revestimientos" },
];
const HomeInputs = ({ selectedValue }: { selectedValue: string }) => {
  const { data: propertyStatus, isLoading: isLoadingPropertyStatus } = useData<
    {
      id: number;
      nombre_estado: string;
    }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.PROPERTY_STATUS}`);

  const form = useForm<z.infer<typeof HomeValidation>>({
    resolver: zodResolver(HomeValidation),

    defaultValues: {
      // Área del Terreno
      area_land: "",

      // Área Construida
      area_built: "",

      // Antigüedad
      age: "",

      // Número de Pisos
      number_of_floors: "",

      // Dormitorios
      bedrooms: "",

      // Baños
      bathrooms: "",

      // Baño de Visita
      guest_bathroom: "",
      // Sala comedor
      living_room: false, // Sala comedor

      // Living comedor
      living_dining_room: false, // Living comedor

      // Sala de estar
      sitting_room: false, // Sala de estar

      // Kitchenette
      kitchenette: false, // Kitchenette

      // Cocina tradicional
      traditional_kitchen: false, // Cocina tradicional

      // Estudio
      study: false, // Estudio

      // Dormitorio principal c/b
      main_bedroom: false, // Dormitorio principal c/b

      // Cuarto de servicio
      service_room: false, // Cuarto de servicio

      // Jardín interior
      inner_garden: false, // Jardín interior

      // Jardín exterior
      outer_garden: false, // Jardín exterior

      // Azotea
      roof_terrace: false, // Azotea

      // Piscina
      pool: false, // Piscina

      // Gimnasio
      gym: false, // Gimnasio

      // Video vigilancia
      video_surveillance: false, // Video vigilancia

      // Cerco eléctrico
      electric_fence: false, // Cerco eléctrico

      // Cisterna
      cistern: false, // Cisterna

      // Reposteros en cocina
      kitchen_cabinets: false, // Reposteros en cocina

      // Jacuzzi
      jacuzzi: false, // Jacuzzi

      // Walk in closet
      walk_in_closet: false, // Walk in closet

      // Inventario
      inventory: false, // Inventario

      // Agua
      water: false, // Agua

      // Electricidad
      electricity: false, // Electricidad

      // KW
      kw: false, // KW

      // Trifásico
      three_phase: false, // Trifásico

      // Monofásico
      single_phase: false, // Monofásico

      // Pisos
      floors: false, // Pisos

      // Ventanas
      windows: false, // Ventanas

      // Revestimientos
      cladding: false, // Revestimientos
    },
  });

  const onSubmit = async (values: z.infer<typeof HomeValidation>) => {
    console.log({ values });
  };
  return (
    <>
      <TypographyH3 className="text-tomato">
        2.1. Datos de la Propiedad ({selectedValue})
      </TypographyH3>
      <div className="px-4">
        <h4 className="text-[14px] sm:text-[1.2rem] font-bold">
          {/* 2.1.1.Descripción del inmueble */}
          Descripción del inmueble
        </h4>
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="area_land"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel className="flex-none">Área Terreno</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Área Terreno"
                      />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area_built"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel className="flex-none">Área Construida</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Área Construida"
                      />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Combo de Antigüedad */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-9">
                  <FormLabel>Antigüedad</FormLabel>

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

            {/* Input Nro. pisos */}
            <FormField
              control={form.control}
              name="number_of_floors"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-3">
                  <FormLabel className="flex-none">Nro. pisos</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} placeholder="Nro. pisos" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {roomFeatures.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id as any}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {/* Combo de Dormitorios */}
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel>Dormitorios</FormLabel>

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
            {/* Combo de Baños */}
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel>Baños</FormLabel>

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
            {/* Combo de Baños de visita */}
            <FormField
              control={form.control}
              name="guest_bathroom"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel>Baños de visita</FormLabel>

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
            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Servicios Públicos
            </h4>
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {publicServices.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Acabados
            </h4>
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {finishes.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Estado
            </h4>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                    >
                      {propertyStatus?.map((property) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={property.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={`${property.id}`}
                              className="border-tomato/80 text-tomato/80 focus-visible:ring-tomato/80"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {property.nombre_estado}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-12 flex justify-end">
              <Button type="submit" variant="primary-red-100">
                Guardar y enviar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

type FileNameDescriptionOfTheLand =
  | "irregular"
  | "fence_enclosed"
  | "gate"
  | "construction";

const descriptionOfTheLand: {
  id: FileNameDescriptionOfTheLand;
  label: string;
}[] = [
  { id: "irregular", label: "Irregular" },
  { id: "fence_enclosed", label: "Cercado" },
  { id: "gate", label: "Portón" },
  { id: "construction", label: "Construcción" },
];

type FileNamePublicUtilities =
  | "water"
  | "electricity"
  | "three_phase"
  | "single_phase";
const publicUtilities: {
  id: FileNamePublicUtilities;
  label: string;
}[] = [
  { id: "water", label: "Agua" },
  { id: "electricity", label: "Electricidad" },
  { id: "three_phase", label: "Trifásico" },
  { id: "single_phase", label: "Monofásico" },
];

type FileNameUrbanHabilitation = "municipal_resolution" | "approved_blueprint";
const urbanHabilitation: {
  id: FileNameUrbanHabilitation;
  label: string;
}[] = [
  { id: "municipal_resolution", label: "Resolución municipal" },
  { id: "approved_blueprint", label: "Plano aprovado" },
];
const TerrainInputs = ({ selectedValue }: { selectedValue: string }) => {
  const form = useForm<z.infer<typeof TerrainInputsValidation>>({
    resolver: zodResolver(TerrainInputsValidation),

    defaultValues: {
      // Área
      area: "",

      // Por el frente
      front_side: "",

      // Por el fondo
      back_side: "",

      // Por la izquierda
      left_side: "",

      // Por la derecha
      right_side: "",

      // Irregular
      irregular: false,

      // Cercado
      fence_enclosed: false,

      // Portón
      gate: false,

      // Construcción
      construction: false,

      // Agua
      water: false,

      // Electricidad
      electricity: false,

      // KW
      kw: "",

      // Trifásico
      three_phase: false,

      // Monofásico
      single_phase: false,

      // Resolución municipal
      municipal_resolution: false,

      // Plano aprobado
      approved_blueprint: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof TerrainInputsValidation>) => {
    console.log({ values });
  };

  return (
    <>
      <TypographyH3 className="text-tomato">
        2.1. Datos del terreno ({selectedValue})
      </TypographyH3>
      <div className="px-4">
        <h4 className="text-[14px] sm:text-[1.2rem] font-bold">
          Descripción del terreno
        </h4>
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Área</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input type="text" {...field} placeholder="Área" />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="front_side"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Por el frente</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Área Construida"
                      />
                    </FormControl>
                    <span>M</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Por el fondo */}
            <FormField
              control={form.control}
              name="back_side"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Por el fondo</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Por el fondo"
                      />
                    </FormControl>
                    <span>M</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Por la izquierda */}
            <FormField
              control={form.control}
              name="left_side"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Por la izquierda</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Por la izquierda"
                      />
                    </FormControl>
                    <span>M</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Por la derecha */}
            <FormField
              control={form.control}
              name="right_side"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Por la derecha</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Por la derecha"
                      />
                    </FormControl>
                    <span>M</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {descriptionOfTheLand.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Sevicios Públicos
            </h4>
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {publicUtilities.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {/* Input KW */}
            <FormField
              control={form.control}
              name="kw"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">KW</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input type="text" {...field} placeholder="KW" />
                    </FormControl>
                    <span>M</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Habilitación urbana
            </h4>
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {urbanHabilitation.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="col-span-12 flex justify-end">
              <Button type="submit" variant="primary-red-100">
                Guardar y enviar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

type FileNameLocal = "machinery" | "warehouse";
const local: {
  id: FileNameLocal;
  label: string;
}[] = [
  { id: "machinery", label: "Maquinarias" },
  { id: "warehouse", label: "Almacen" },
];

type FileNamePublicUtilitiesLocal =
  | "water"
  | "electricity"
  | "three_phase"
  | "single_phase";
const publicUtilitiesLocal: {
  id: FileNamePublicUtilitiesLocal;
  label: string;
}[] = [
  { id: "water", label: "Agua" },
  { id: "electricity", label: "Electricidad" },
  { id: "three_phase", label: "Trifásico" },
  { id: "single_phase", label: "Monofásico" },
];

const LocalInputs = ({ selectedValue }: { selectedValue: string }) => {
  const form = useForm<z.infer<typeof LocalInputsValidation>>({
    resolver: zodResolver(LocalInputsValidation),

    defaultValues: {
      // Área de terreno
      land_area: "",

      // Área libre
      free_area: "",

      // Antigüedad
      age: "",

      // Número de pisos
      number_of_floors: "",

      // Ambientes
      environments: "",

      // Estacionamientos
      parking_lots: "",

      // Patio de descargas
      unloading_yard: "",

      // Baños
      bathrooms: "",

      // Maquinarias
      machinery: false,

      // Almacen
      warehouse: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof LocalInputsValidation>) => {
    console.log({ values });
  };

  return (
    <>
      <TypographyH3 className="text-tomato">
        2.1. Datos del local ({selectedValue})
      </TypographyH3>
      <div className="px-4">
        <h4 className="text-[14px] sm:text-[1.2rem] font-bold">
          Descripción de local
        </h4>
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="land_area"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Área terreno</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Área terreno"
                      />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="free_area"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Área libre</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input type="text" {...field} placeholder="Área libre" />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Combo de Antigüedad */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Antigüedad</FormLabel>

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

            {/* Input Nro. pisos */}
            <FormField
              control={form.control}
              name="number_of_floors"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Nro. pisos</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} placeholder="Nro. pisos" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Combo de Ambientes */}
            <FormField
              control={form.control}
              name="environments"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Ambientes</FormLabel>

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

            {/* Combo de Estacionamientos */}
            <FormField
              control={form.control}
              name="parking_lots"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Estacionamientos</FormLabel>

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

            {/* Combo de Patio de descargas */}
            <FormField
              control={form.control}
              name="unloading_yard"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel>Patio de descargas</FormLabel>

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

            {/* Combo de Baños */}
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel>Baños</FormLabel>

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

            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {local.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id as any}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Sevicios Públicos
            </h4>
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {publicUtilitiesLocal.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {/* Input KW */}
            <FormField
              control={form.control}
              name="kw"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">KW</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input type="text" {...field} placeholder="KW" />
                    </FormControl>
                    <span>M</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-12 flex justify-end">
              <Button type="submit" variant="primary-red-100">
                Guardar y enviar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

type FileNameBuilding =
  | "entrance_lobby"
  | "elevator"
  | "garden"
  | "pool"
  | "gym"
  | "video_surveillance"
  | "electric_fence"
  | "cistern"
  | "pets_allowed"
  | "internal_rules"
  | "kitchen_cabinets"
  | "jacuzzi"
  | "walk_in_closet"
  | "grill";

const building: {
  id: FileNameBuilding;
  label: string;
}[] = [
  { id: "entrance_lobby", label: "Lobby de ingreso" },
  { id: "elevator", label: "Ascensor" },
  { id: "garden", label: "Jardin" },
  { id: "pool", label: "Piscina" },
  { id: "gym", label: "Gimnacio" },
  { id: "video_surveillance", label: "Video vigilancia" },
  { id: "electric_fence", label: "Cerco eléctrico" },
  { id: "cistern", label: "Cisterna" },
  { id: "pets_allowed", label: "Permiten mascotas" },
  { id: "internal_rules", label: "Reglamento interno" },
  { id: "kitchen_cabinets", label: "Reposteros en cocina" },
  { id: "jacuzzi", label: "Jacuzzi" },
  { id: "walk_in_closet", label: "Walk in closet" },
  { id: "grill", label: "Parrilla" },
];

type FileNamePublicServicesDepartment =
  | "water"
  | "electricity"
  | "gas_installation";

const publicServicesDepartment: {
  id: FileNamePublicServicesDepartment;
  label: string;
}[] = [
  { id: "water", label: "Agua" },
  { id: "electricity", label: "Electricidad" },
  { id: "gas_installation", label: "Instalación de gas" },
];

type FileNameDepartmentFeatures =
  | "dining_room"
  | "living_dining_room"
  | "living_room"
  | "kitchenette"
  | "traditional_kitchen"
  | "study"
  | "terrace"
  | "main_bedroom_with_bathroom"
  | "service_room"
  | "storage"
  | "furnished"
  | "curtains"
  | "phone"
  | "cable"
  | "internet"
  | "inventory";

const departmentFeatures: {
  id: FileNameDepartmentFeatures;
  label: string;
}[] = [
  { id: "dining_room", label: "Sala comedor" },
  { id: "living_dining_room", label: "Living comedor" },
  { id: "living_room", label: "Sala de estar" },
  { id: "kitchenette", label: "Kitchenette" },
  { id: "traditional_kitchen", label: "Cocina tradicional" },
  { id: "study", label: "Estudio" },
  { id: "terrace", label: "Terraza" },
  { id: "main_bedroom_with_bathroom", label: "Dormitorio principal c/b" },
  { id: "service_room", label: "Cuarto de servicio" },
  { id: "storage", label: "Depósito" },
  { id: "furnished", label: "Amoblado" },
  { id: "curtains", label: "Cortinas" },
  { id: "phone", label: "Teléfono" },
  { id: "cable", label: "Cable" },
  { id: "internet", label: "Internet" },
  { id: "inventory", label: "Inventario" },
];
const DepartmentInputs = ({ selectedValue }: { selectedValue: string }) => {
  const form = useForm<z.infer<typeof DepartmentInputsValidation>>({
    resolver: zodResolver(DepartmentInputsValidation),

    defaultValues: {
      // Antigüedad
      age: "",

      // Nro. pisos
      number_of_floors: "",

      // Nro. dptos por pisos
      apartments_per_floor: "",

      // % Areas comunes
      common_area_percentage: "",
      // Costo de mantenimiento
      maintenance_cost: "",

      // Lobby de ingreso
      entrance_lobby: false,

      // Ascensor
      elevator: false,

      // Jardín
      garden: false,

      // Piscina
      pool: false,

      // Gimnasio
      gym: false,

      // Video vigilancia
      video_surveillance: false,

      // Cerco eléctrico
      electric_fence: false,

      // Cisterna
      cistern: false,

      // Permiten mascotas
      pets_allowed: false,

      // Reglamento interno
      internal_rules: false,

      // Reposteros en cocina
      kitchen_cabinets: false,

      // Jacuzzi
      jacuzzi: false,

      // Walk in closet
      walk_in_closet: false,

      // Parrilla
      grill: false,

      /* Servicios Publicos */
      water: false,
      electricity: false,
      gas_installation: false,
      /* Descripción del departamento */

      // Área ocupada
      occupied_area: "",

      // Área construida
      built_area: "",

      // Ubicación del departamento
      department_location: "",

      // Dormitorios
      bedrooms: "",

      // Baños
      bathrooms: "",

      // Baños de visita
      guest_bathrooms: "",

      // Estacionamiento
      parking: "",

      // Ambientes
      environments: "",

      // Sala comedor
      dining_room: false,

      // Living comedor
      living_dining_room: false,

      // Sala de estar
      living_room: false,

      // Kitchenette
      kitchenette: false,

      // Cocina tradicional
      traditional_kitchen: false,

      // Estudio
      study: false,

      // Terraza
      terrace: false,

      // Dormitorio principal c/b
      main_bedroom_with_bathroom: false,

      // Cuarto de servicio
      service_room: false,

      // Depósito
      storage: false,

      // Amoblado
      furnished: false,

      // Cortinas
      curtains: false,

      // Teléfono
      phone: false,

      // Cable
      cable: false,

      // Internet
      internet: false,

      // Inventario
      inventory: false,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof DepartmentInputsValidation>
  ) => {
    console.log({ values });
  };

  return (
    <>
      <TypographyH3 className="text-tomato">
        2.1. Datos del departamento ({selectedValue})
      </TypographyH3>
      <div className="px-4">
        <h4 className="text-[14px] sm:text-[1.2rem] font-bold">
          Descripción de edificio
        </h4>
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Combo de Antigüedad */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Antigüedad</FormLabel>

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

            {/* Input Nro. pisos */}
            <FormField
              control={form.control}
              name="number_of_floors"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Nro. pisos</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} placeholder="Nro. pisos" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Combo de Nro. dptos por pisos */}
            <FormField
              control={form.control}
              name="apartments_per_floor"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Nro. dptos por pisos</FormLabel>

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

            {/* Input % Areas comunes */}
            <FormField
              control={form.control}
              name="common_area_percentage"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">% Areas comunes</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="% Areas comunes"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Costo de mantenimiento*/}
            <FormField
              control={form.control}
              name="maintenance_cost"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">
                    Costo de mantenimiento
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Costo de mantenimiento"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {building.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id as any}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Servicios Públicos
            </h4>
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {publicServicesDepartment.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Descripción de departamento
            </h4>
            {/* Input Área ocupada */}
            <FormField
              control={form.control}
              name="occupied_area"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel className="flex-none">Área ocupada</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Área ocupada"
                      />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Área construida */}
            <FormField
              control={form.control}
              name="built_area"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel className="flex-none">Área construida</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Área construida"
                      />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Ubicación del departamento */}
            <FormField
              control={form.control}
              name="department_location"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">
                    Ubicación del departamento
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Ubicación del departamento"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Combo de Dormitorios */}
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Dormitorios</FormLabel>

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

            {/* Combo de Baños */}
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Baños</FormLabel>

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

            {/* Combo de Baños de visita */}
            <FormField
              control={form.control}
              name="guest_bathrooms"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Baños de visita</FormLabel>

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
            {/* Combo de Estacionamiento */}
            <FormField
              control={form.control}
              name="parking"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Estacionamiento</FormLabel>

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

            {/* Input Ambientes */}
            <FormField
              control={form.control}
              name="environments"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Ambientes</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} placeholder="Ambientes" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {departmentFeatures.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="col-span-12 flex justify-end">
              <Button type="submit" variant="primary-red-100">
                Guardar y enviar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

type FileNameBuildingOffice =
  | "entrance_lobby"
  | "elevator"
  | "garden"
  | "pool"
  | "gym"
  | "video_surveillance"
  | "electric_fence"
  | "cistern"
  | "pets_allowed"
  | "internal_rules"
  | "kitchen_cabinets"
  | "jacuzzi"
  | "walk_in_closet"
  | "grill";

const buildingOffice: {
  id: FileNameBuildingOffice;
  label: string;
}[] = [
  { id: "entrance_lobby", label: "Lobby de ingreso" },
  { id: "elevator", label: "Ascensor" },
  { id: "garden", label: "Jardin" },
  { id: "pool", label: "Piscina" },
  { id: "gym", label: "Gimnacio" },
  { id: "video_surveillance", label: "Video vigilancia" },
  { id: "electric_fence", label: "Cerco eléctrico" },
  { id: "cistern", label: "Cisterna" },
  { id: "pets_allowed", label: "Permiten mascotas" },
  { id: "internal_rules", label: "Reglamento interno" },
  { id: "kitchen_cabinets", label: "Reposteros en cocina" },
  { id: "jacuzzi", label: "Jacuzzi" },
  { id: "walk_in_closet", label: "Walk in closet" },
  { id: "grill", label: "Parrilla" },
];

type FileNamePublicServicesOffice =
  | "water"
  | "electricity"
  | "gas_installation";

const publicServicesOffice: {
  id: FileNamePublicServicesOffice;
  label: string;
}[] = [
  { id: "water", label: "Agua" },
  { id: "electricity", label: "Electricidad" },
  { id: "gas_installation", label: "Instalación de gas" },
];

type FileNameOffice =
  | "furnished"
  | "curtains"
  | "phone"
  | "cable"
  | "internet"
  | "inventory";

const officeFeatures: {
  id: FileNameOffice;
  label: string;
}[] = [
  { id: "furnished", label: "Amoblado" },
  { id: "curtains", label: "Cortinas" },
  { id: "phone", label: "Teléfono" },
  { id: "cable", label: "Cable" },
  { id: "internet", label: "Internet" },
  { id: "inventory", label: "Inventario" },
];
const OfficeInputs = ({ selectedValue }: { selectedValue: string }) => {
  const form = useForm<z.infer<typeof OfficeInputsValidation>>({
    resolver: zodResolver(OfficeInputsValidation),

    defaultValues: {
      // Antigüedad
      age: "",

      // Nro. pisos
      number_of_floors: "",

      // Nro. dptos por pisos
      apartments_per_floor: "",

      // % Areas comunes
      common_area_percentage: "",

      // Costo de mantenimiento
      maintenance_cost: "",

      // Lobby de ingreso
      entrance_lobby: false,

      // Ascensor
      elevator: false,

      // Jardín
      garden: false,

      // Piscina
      pool: false,

      // Gimnasio
      gym: false,

      // Video vigilancia
      video_surveillance: false,

      // Cerco eléctrico
      electric_fence: false,

      // Cisterna
      cistern: false,

      // Permiten mascotas
      pets_allowed: false,

      // Reglamento interno
      internal_rules: false,

      // Reposteros en cocina
      kitchen_cabinets: false,

      // Jacuzzi
      jacuzzi: false,

      // Walk in closet
      walk_in_closet: false,

      // Parrilla
      grill: false,

      /* Servicios Publicos */
      water: false,
      electricity: false,
      gas_installation: false,
      /* Descripción del departamento */

      // Área ocupada
      occupied_area: "",

      // Área construida
      built_area: "",

      // Ubicación del departamento
      department_location: "",

      // Ambientes
      environments: "",

      // Estacionamiento
      parking: "",

      // Amoblado
      furnished: false,

      // Cortinas
      curtains: false,

      // Teléfono
      phone: false,

      // Cable
      cable: false,

      // Internet
      internet: false,

      // Inventario
      inventory: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof OfficeInputsValidation>) => {
    console.log({ values });
  };

  return (
    <>
      <TypographyH3 className="text-tomato">
        2.1. Datos de Oficina ({selectedValue})
      </TypographyH3>
      <div className="px-4">
        <h4 className="text-[14px] sm:text-[1.2rem] font-bold">
          Descripción de edificio
        </h4>
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2 sm:gap-6 mt-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Combo de Antigüedad */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Antigüedad</FormLabel>

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

            {/* Input Nro. pisos */}
            <FormField
              control={form.control}
              name="number_of_floors"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Nro. pisos</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} placeholder="Nro. pisos" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Combo de Nro. dptos por pisos */}
            <FormField
              control={form.control}
              name="apartments_per_floor"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Nro. dptos por pisos</FormLabel>

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

            {/* Input % Areas comunes */}
            <FormField
              control={form.control}
              name="common_area_percentage"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">% Areas comunes</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="% Areas comunes"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Costo de mantenimiento*/}
            <FormField
              control={form.control}
              name="maintenance_cost"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">
                    Costo de mantenimiento
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Costo de mantenimiento"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {buildingOffice.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id as any}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Servicios Públicos
            </h4>
            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {publicServicesOffice.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <h4 className="text-[14px] sm:text-[1.2rem] font-bold col-span-12">
              Descripción de oficina
            </h4>
            {/* Input Área ocupada */}
            <FormField
              control={form.control}
              name="occupied_area"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel className="flex-none">Área ocupada</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Área ocupada"
                      />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Área construida */}
            <FormField
              control={form.control}
              name="built_area"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6">
                  <FormLabel className="flex-none">Área construida</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Área construida"
                      />
                    </FormControl>
                    <span>M²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Ubicación del departamento */}
            <FormField
              control={form.control}
              name="department_location"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">
                    Ubicación del departamento
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Ubicación del departamento"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Ambientes */}
            <FormField
              control={form.control}
              name="environments"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel className="flex-none">Ambientes</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} placeholder="Ambientes" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Combo de Estacionamientos */}
            <FormField
              control={form.control}
              name="parking"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 col-span-12 xs:col-span-6 lg:col-span-4">
                  <FormLabel>Estacionamientos</FormLabel>

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

            {/* Checkbox */}
            <div className="col-span-12 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {officeFeatures.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={feature.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="border-tomato/80 focus-visible:ring-tomato/80 data-[state=checked]:bg-tomato/80"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">{feature.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="col-span-12 flex justify-end">
              <Button type="submit" variant="primary-red-100">
                Guardar y enviar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
