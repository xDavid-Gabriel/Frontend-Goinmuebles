"use client";
import { BasicLoading, BasicModal, TypographyH2 } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsCloudCheck } from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
// Import react-circular-progressbar module and styles
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFileUpload, useLoading, useToggle } from "@/hooks";
import { useStateAuthContext } from "@/context/auth/AuthProvider";

const Separator = ({
  turns,
  style,
}: {
  turns: number;
  style: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${turns}turn)`,
      }}
    >
      <div style={style} />
    </div>
  );
};

const RadialSeparators = ({
  count,
  style,
}: {
  count: number;
  style: React.CSSProperties;
}) => {
  const turns = 1 / count;
  return Array.from({ length: count }, (_, index) => (
    <Separator turns={index * turns} style={style} key={index} />
  ));
};
interface FileUploadProps {
  fileFields: any;
  validationSchema: any;
  onSubmitApi: (user: IUser, values: any) => Promise<any>;
  total?: number;
  title: string;
  fileInputs: { name: string; label: string; fileId: string }[];
}
// const attachmentsCtrl = new AttachmentsApi();
export const FileUpload = ({
  fileFields,
  validationSchema,
  onSubmitApi,
  total = 8,
  title,
  fileInputs,
}: FileUploadProps) => {
  const { user, refreshUser } = useStateAuthContext();

  // const pathname = usePathname();

  // const tieneDatoValido = (valor: string | null | undefined) => {
  //   return valor !== null && valor !== undefined && valor !== ""
  //     ? "Tengo el archivo"
  //     : "";
  // };

  // const fileFields = {
  //   dni_manager: tieneDatoValido(user.user.adjuntar_documento_representante),
  //   dni_spouse: tieneDatoValido(user.user.adjuntar_documento_conyuge),
  //   payment_receipts_1: tieneDatoValido(user.user.boleta_1),
  //   payment_receipts_2: tieneDatoValido(user.user.boleta_2),
  //   payment_receipts_3: tieneDatoValido(user.user.boleta_3),
  //   utility_bill_copy: tieneDatoValido(user.user.recibo_servicios),
  //   property_records: tieneDatoValido(
  //     user.user.partida_registrales_propiedades
  //   ),
  //   additional_documentation: tieneDatoValido(user.user.presentacion_empresa),
  // };

  const allFilesPresent = Object.values(fileFields).every((value) =>
    Boolean(value)
  );

  const totalCount = total; // Cambiar esto según el componente
  const { files, progress, handleArchive } = useFileUpload({
    totalCount,
  });
  const { isLoading, startLoading, endLoading } = useLoading();
  const { state: modalSucces, toggle: setmodalSucces } = useToggle();

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),

    defaultValues: fileFields,
  });

  const onSubmit = async (values: z.infer<typeof validationSchema>) => {
    console.log(values);

    startLoading();
    await onSubmitApi(user, values);
    // const response = await attachmentsCtrl.postArchivesGestorNatural(
    //   user,
    //   values
    // );
    endLoading();
    setmodalSucces();
    refreshUser();
  };

  return (
    <>
      <BasicModal
        title="🌟 ¡Archivos subidos exitosamente! 🌟"
        description={
          <>¡Tus archivos han sido subidos con éxito a nuestra plataforma!</>
        }
        open={modalSucces}
        setOpen={setmodalSucces}
      />
      <TypographyH2
        variant="primary-100"
        className={`${user.rol === "Gestor" ? "text-tomato/80" : "text-teal"}`}
      >
        {title}
      </TypographyH2>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-5 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fileInputs.map((inputData) => (
            <FormField
              key={inputData.name}
              control={form.control}
              name={inputData.name}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl>
                    <div
                      className={`flex items-center gap-4 border-dashed border-[2px] rounded-[20px] p-[13px_18px] font-josefin
                   ${
                     fileFields[inputData.name]
                       ? "cursor-not-allowed opacity-50"
                       : "cursor-pointer"
                   }
                   ${
                     files[inputData.name] || fileFields[inputData.name]
                       ? "border-green-400"
                       : user.rol === "Gestor"
                       ? "border-tomato/80"
                       : user.rol === "Inversionista"
                       ? "border-teal"
                       : ""
                   }`}
                      onClick={() => {
                        const inputField = document.querySelector(
                          `#${inputData.fileId}`
                        );
                        if (inputField instanceof HTMLElement) {
                          inputField.click();
                        }
                      }}
                    >
                      {fileFields[inputData.name] ? (
                        ""
                      ) : (
                        <Input
                          id={inputData.fileId}
                          type="file"
                          accept="application/pdf"
                          placeholder={inputData.label}
                          hidden
                          onChange={(e) =>
                            handleArchive(e, field.onChange, inputData.name)
                          }
                        />
                      )}

                      <span className="flex items-center gap-3">
                        {files[inputData.name] || fileFields[inputData.name] ? (
                          <i className="text-2xl text-green-400">
                            <BsCloudCheck />
                          </i>
                        ) : (
                          <i
                            className={`text-2xl ${
                              user.rol === "Gestor"
                                ? "text-tomato/80"
                                : "text-teal"
                            }`}
                          >
                            <AiOutlineCloudUpload />
                          </i>
                        )}

                        {files[inputData.name] ? (
                          <span className="text-green-400">
                            {files[inputData.name].name}
                          </span>
                        ) : fileFields[inputData.name] ? (
                          <span className="text-green-400">Archivo subido</span>
                        ) : (
                          <span
                            className={
                              user.rol === "Gestor"
                                ? "text-tomato/80"
                                : "text-teal"
                            }
                          >
                            {inputData.label}
                          </span>
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="col-span-12 flex flex-col gap-5">
            <div className="max-w-[550px] w-full mx-auto grid sm:[grid-template-columns:1fr_100px] items-center gap-5">
              <Progress
                value={allFilesPresent ? 100 : progress}
                className={`border-[2px]  order-1 sm:order-[initial] ${
                  user.rol === "Gestor" ? "border-tomato/80" : "border-teal"
                }`}
                classNameIndicator={
                  user.rol === "Gestor" ? "bg-tomato/80" : "bg-teal"
                }
              />
              <div className="max-w-[100px] mx-auto sm:mx-0 sm:max-w-[initial] sm:contents">
                <CircularProgressbarWithChildren
                  value={allFilesPresent ? 100 : progress}
                  text={`${allFilesPresent ? 100 : progress}%`}
                  strokeWidth={10}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor:
                      user.rol === "Gestor"
                        ? "rgb(231, 64, 46, 0.8)"
                        : "rgb(0, 157, 140, 0.8)",
                    textColor:
                      user.rol === "Gestor"
                        ? "rgb(231, 64, 46, 0.8)"
                        : "rgb(0, 157, 140, 0.8)",
                    trailColor:
                      user.rol === "Gestor"
                        ? "rgb(231, 64, 46, 0.2)"
                        : "rgb(0, 157, 140, 0.2)",
                  })}
                >
                  <RadialSeparators
                    count={12}
                    style={{
                      background: "#fff",
                      width: "2px",
                      // This needs to be equal to props.strokeWidth
                      height: `${10}%`,
                    }}
                  />
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <span className="font-josefin">
              Para completar la evaluación deberá de cumplir con TODOS los
              archivos adjuntos requeridos. Puede visualizar el estado de cada
              uno en la sección Mis archivos.
            </span>
          </div>
          {allFilesPresent ? (
            ""
          ) : (
            <Button
              type="submit"
              variant={
                user.rol === "Gestor"
                  ? "primary-red-100"
                  : user.rol === "Inversionista"
                  ? "primary-teal"
                  : "default"
              }
              className="col-span-12 ml-auto xl:ml-0 xl:col-span-3 self-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <BasicLoading name="Enviando..." className="flex-row gap-3" />
              ) : (
                "Guardar y enviar"
              )}
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
