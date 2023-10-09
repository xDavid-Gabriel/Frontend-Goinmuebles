"use client";
import React from "react";
import { IUser } from "@/interfaces";
import { useStateAuthContext } from "@/context";
import { AttachmentsValidation } from "@/lib/validations/gestor/natural/perfil";
import { AttachmentsApi } from "@/server";
import { FileUpload } from "@/components/forms";
import { fileInputsGestorNatural, hasValidData } from "@/utils";

const attachmentsCtrl = new AttachmentsApi();
export const Attachments = () => {
  const { user } = useStateAuthContext();

  const fileFieldsData = {
    dni_manager: hasValidData(user.user.adjuntar_documento_representante),
    dni_spouse: hasValidData(user.user.adjuntar_documento_conyuge),
    payment_receipts_1: hasValidData(user.user.boleta_1),
    payment_receipts_2: hasValidData(user.user.boleta_2),
    payment_receipts_3: hasValidData(user.user.boleta_3),
    utility_bill_copy: hasValidData(user.user.recibo_servicios),
    property_records: hasValidData(user.user.partida_registrales_propiedades),
    additional_documentation: hasValidData(user.user.presentacion_empresa),
  };

  const apiSubmitFunction = async (user: IUser, values: any) => {
    // tu función de envío aquí...
    await attachmentsCtrl.postArchivesGestorNatural(user, values);
  };
  return (
    <FileUpload
      fileFields={fileFieldsData}
      validationSchema={AttachmentsValidation}
      onSubmitApi={apiSubmitFunction}
      title="5. Archivos adjuntos (requeridos)"
      fileInputs={fileInputsGestorNatural}
    />
  );
};
