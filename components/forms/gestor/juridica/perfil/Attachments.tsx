"use client";
import React from "react";
import { IUser } from "@/interfaces";
import { useStateAuthContext } from "@/context";
import { AttachmentsValidation } from "@/lib/validations/gestor/juridica/perfil";
import { AttachmentsApi } from "@/server";
import { FileUpload } from "@/components/forms";
import { fileInputsGestorJuridica, hasValidData } from "@/utils";

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
    // Estados Financieros (2 últimos años) 1

    financial_statements_1: hasValidData(user.user.estado_financiero_1),
    // Estados Financieros (2 últimos años) 2
    financial_statements_2: hasValidData(user.user.estado_financiero_2),
    // PDT (últimos 3 meses) 1
    pdt_1: hasValidData(user.user.pdt_1),
    // PDT (últimos 3 meses) 2
    pdt_2: hasValidData(user.user.pdt_2),
    // PDT (últimos 3 meses) 3
    pdt_3: hasValidData(user.user.pdt_3),
  };

  const apiSubmitFunction = async (user: IUser, values: any) => {
    // tu función de envío aquí...
    await attachmentsCtrl.postArchivesGestorJuridica(user, values);
  };
  return (
    <FileUpload
      fileFields={fileFieldsData}
      validationSchema={AttachmentsValidation}
      onSubmitApi={apiSubmitFunction}
      title="6. Archivos adjuntos (requeridos)"
      fileInputs={fileInputsGestorJuridica}
      total={9}
    />
  );
};
