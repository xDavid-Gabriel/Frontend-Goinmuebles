"use client";
import {
  Accordion as LibraryAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const data = [
  {
    id: 1,
    title: "GANANCIA DE CAPITAL",
    description:
      "Negocio de Compra Inmobiliaria para una Venta/Recaudamos capital con el respaldo de los inversionistas para adquirir una propiedad con alto potencial de rentabilidad; luego, vendemos la propiedad y la ganancia es repartida a todos los inversionistas de acuerdo a su aporte./¿Te interesa esta modalidad de inversión?",
  },
  {
    id: 2,
    title: "FLUJO DE EFECTIVO",
    description:
      "Negocio de Inversión para Alquilar Propiedades/Recaudamos capital con el respaldo de los inversionistas para adquirir una propiedad con alto potencial de rentabilidad; luego, acondicionamos el inmueble y lo ponemos a Renta Corta y/o Renta Larga, las rentas a recibir son repartidas entre todos los inversionistas de acuerdo a su aporte./¿Te interesa esta modalidad de inversión?",
  },
  // {
  //   id: 3,
  //   title: "MIXTO",
  //   description:
  //     "Negocio de Compra Inmobiliaria para una Venta/Recaudamos capital con el respaldo de los inversionistas para adquirir una propiedad con alto potencial de rentabilidad; luego, vendemos la propiedad y la ganancia es repartida a todos los inversionistas de acuerdo a su aporte./¿Te interesa esta modalidad de inversión? ",
  // },
];

export const Accordion = () => {
  return (
    <LibraryAccordion
      type="single"
      collapsible
      className="flex flex-col gap-5 sm:gap-10"
      defaultValue="item-1"
    >
      {data.map((data) => {
        const descriptionSplit = data.description.split("/");

        return (
          <AccordionItem
            value={`item-${data.id}`}
            key={data.id}
            className="border-[2px] border-tomato rounded-[50px]"
          >
            <AccordionTrigger className="font-display font-bold text-blue-green px-5 sm:text-[20px] sm:px-10 lg:text-[28px]">
              {data.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-5 sm:px-10 flex flex-col gap-4 pb-10">
                {descriptionSplit.map((description) => (
                  <p key={description}>{description}</p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </LibraryAccordion>
  );
};
