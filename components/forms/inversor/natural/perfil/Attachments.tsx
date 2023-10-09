"use client";
import React from "react";
import { IUser } from "@/interfaces";
import { useStateAuthContext } from "@/context";
import { AttachmentsValidation } from "@/lib/validations/inversor/natural/perfil";
import { AttachmentsApi } from "@/server";
import { FileUpload } from "@/components/forms";
import { fileInputsInversorNatural, hasValidData } from "@/utils";

const attachmentsCtrl = new AttachmentsApi();
export const Attachments = () => {
  const { user } = useStateAuthContext();

  const fileFieldsData = {
    dni_investor: hasValidData(user.user.adjuntar_documento_representante),
    dni_spouse: hasValidData(user.user.adjuntar_documento_conyuge),
  };

  const apiSubmitFunction = async (user: IUser, values: any) => {
    // tu función de envío aquí...
    await attachmentsCtrl.postArchivesInversorNatural(user, values);
  };
  return (
    <FileUpload
      fileFields={fileFieldsData}
      validationSchema={AttachmentsValidation}
      onSubmitApi={apiSubmitFunction}
      title="4. Archivos adjuntos (requeridos)"
      fileInputs={fileInputsInversorNatural}
      total={2}
    />
  );
};
