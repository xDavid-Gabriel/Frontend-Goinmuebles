"use client";
import React from "react";
import { IUser } from "@/interfaces";
import { useStateAuthContext } from "@/context";
import { AttachmentsValidation } from "@/lib/validations/inversor/juridica/perfil";
import { AttachmentsApi } from "@/api";
import { FileUpload } from "@/components/forms";
import { fileInputsInversorJuridica, hasValidData } from "@/utils";

const attachmentsCtrl = new AttachmentsApi();
export const Attachments = () => {
  const { user } = useStateAuthContext();

  const fileFieldsData = {
    // DNI (Representante legal)
    legal_representative_dni: hasValidData(
      user.user.adjuntar_documento_representante
    ),
    // Vigencia de poder
    power_of_attorney_validity: hasValidData(user.user.vigencia_poder),
    // Ficha R.U.C
    ruc_record: hasValidData(user.user.ficha_ruc),
    // Partida Registral de la empresa
    company_registry_entry: hasValidData(user.user.partida_registral),
  };

  const apiSubmitFunction = async (user: IUser, values: any) => {
    // tu función de envío aquí...
    await attachmentsCtrl.postArchivesInversorJuridica(user, values);
  };
  return (
    <FileUpload
      fileFields={fileFieldsData}
      validationSchema={AttachmentsValidation}
      onSubmitApi={apiSubmitFunction}
      title="6. Archivos adjuntos (requeridos)"
      fileInputs={fileInputsInversorJuridica}
      total={4}
    />
  );
};
