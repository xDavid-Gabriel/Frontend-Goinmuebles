"use client";
import React from "react";
import { IUser } from "@/interfaces";
import { useStateAuthContext } from "@/context";
import { AttachmentsValidation } from "@/lib/validations/gestor/natural/nuevo-proyecto/venta-plusvalia";
import { AttachmentsApi } from "@/server";
import { FileUpload } from "@/components/forms";
import { fileInputsGnNewProjectVenta, hasValidData } from "@/utils";

const attachmentsCtrl = new AttachmentsApi();
export const Attachments = () => {
  const { user } = useStateAuthContext();

  const fileFieldsData = {
    dni_owners_copy: hasValidData(user.user.adjuntar_documento_representante),
    property_registry: hasValidData(user.user.adjuntar_documento_conyuge),
    cri_certificate: hasValidData(user.user.boleta_1),
    hr_tax_year: hasValidData(user.user.boleta_2),
    urban_parameters: hasValidData(user.user.boleta_3),
    pu_tax_year: hasValidData(user.user.recibo_servicios),
    guarantor_documentation: hasValidData(
      user.user.partida_registrales_propiedades
    ),
  };

  const apiSubmitFunction = async (user: IUser, values: any) => {
    console.log(values);

    // tu función de envío aquí...
    //await attachmentsCtrl.postArchivesGestorNatural(user, values);
  };
  return (
    <FileUpload
      fileFields={fileFieldsData}
      validationSchema={AttachmentsValidation}
      onSubmitApi={apiSubmitFunction}
      title="4. Archivos adjuntos (requeridos)"
      fileInputs={fileInputsGnNewProjectVenta}
      total={7}
    />
  );
};
