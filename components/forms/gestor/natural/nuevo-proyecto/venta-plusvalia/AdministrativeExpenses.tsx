"use client";
import React from "react";
import { IUser } from "@/interfaces";
import { useStateAuthContext } from "@/context";
import { AdministrativeExpensesValidation } from "@/lib/validations/gestor/natural/nuevo-proyecto/venta-plusvalia";
import { AttachmentsApi } from "@/server";
import { FileUpload } from "@/components/forms";
import { fileInputsGnNewProjectVentaGa, hasValidData } from "@/utils";

const attachmentsCtrl = new AttachmentsApi();
export const AdministrativeExpenses = () => {
  const { user } = useStateAuthContext();

  const fileFieldsData = {
    commercial_appraisal: "",
    legal_report: "",
    market_study: "",
  };

  const apiSubmitFunction = async (user: IUser, values: any) => {
    console.log(values);

    // tu función de envío aquí...
    //await attachmentsCtrl.postArchivesGestorNatural(user, values);
  };
  return (
    <FileUpload
      fileFields={fileFieldsData}
      validationSchema={AdministrativeExpensesValidation}
      onSubmitApi={apiSubmitFunction}
      title="5. Gatos administrativos"
      fileInputs={fileInputsGnNewProjectVentaGa}
      total={3}
    />
  );
};
