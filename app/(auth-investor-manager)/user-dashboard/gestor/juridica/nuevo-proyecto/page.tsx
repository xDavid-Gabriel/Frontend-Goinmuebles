import {
  Attachments,
  ProjectFinancialData as ProjectFinancialDataVentaPlusValia,
  PropertyDescription,
  RealEstateProjectData as RealEstateProjectDataVentaPlusValia,
} from "@/components/forms/gestor/juridica/nuevo-proyecto/venta-plusvalia";
import {
  RealEstateProjectData as RealEstateProjectDataRenta,
  ProjectFinancialData as ProjectFinancialDataRenta,
} from "@/components/forms/gestor/juridica/nuevo-proyecto/renta";
import { IUser } from "@/interfaces";
import { fn } from "@/utils/functions";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH1 } from "@/components/shared";

const NewProjectJuridicaPage = async () => {
  const user: IUser = await fn.isPermitions({
    userName: "Gestor",
    userType: "juridica",
  });
  return (
    <>
      <TypographyH1
        variant="primary-100"
        className="text-tomato/80 text-center"
      >
        ¿Qué tipo de inversión inmobiliaria vas a realizar?
      </TypographyH1>
      <Tabs defaultValue="sale-capital-gain" className="my-5 flex flex-col">
        <TabsList className="mx-auto">
          <TabsTrigger
            value="sale-capital-gain"
            className="data-[state=active]:bg-tomato data-[state=active]:text-white"
          >
            Venta - Plusvalía
          </TabsTrigger>
          <TabsTrigger
            value="income"
            className="data-[state=active]:bg-tomato data-[state=active]:text-white"
          >
            Renta
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sale-capital-gain">
          <div className="flex flex-col gap-8">
            <RealEstateProjectDataVentaPlusValia user={user} />
            <PropertyDescription />
            <ProjectFinancialDataVentaPlusValia />
            <Attachments />
          </div>
        </TabsContent>
        <TabsContent value="income">
          <div className="flex flex-col gap-8">
            <RealEstateProjectDataRenta user={user} />
            <PropertyDescription imagesVideo={false} />
            <ProjectFinancialDataRenta />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default NewProjectJuridicaPage;
