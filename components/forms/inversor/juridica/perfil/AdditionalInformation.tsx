"use client";
import { BasicLoading, BasicModal, TypographyH2 } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces";
import { AdditionalInformationValidation } from "@/lib/validations/inversor/juridica/perfil";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { ENV } from "@/utils";
import { useData, useLoading, useToggle } from "@/hooks";
import { UserGestorApi } from "@/server";
import { useRouter } from "next/navigation";
interface IMedium {
  medio_interes: string;
  nombre_medio_interes: string;
}
interface Props {
  user: IUser;
}

const userGestorApiCtrl = new UserGestorApi();
export const AdditionalInformation = ({ user }: Props) => {
  const router = useRouter();

  const { state, toggle } = useToggle();
  const { isLoading, startLoading, endLoading } = useLoading();
  // Tipo de interes
  const { data: halfInterest, isLoading: isLoadingHalfInterest } = useData<
    { id: number; nombres: string }[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.HALF_INTEREST}`);

  const form = useForm<z.infer<typeof AdditionalInformationValidation>>({
    resolver: zodResolver(AdditionalInformationValidation),

    defaultValues: {
      /* ¿Cómo se enteró de */
      how_did_you_hear_about: user?.user.medio_interes
        ? user?.user.medio_interes
        : "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AdditionalInformationValidation>
  ) => {
    const valuesApi = {
      ...user.user,
      medio_interes: values.how_did_you_hear_about,
    };

    startLoading();
    await userGestorApiCtrl.putMedium(
      user.user.codigo_usuario?.toString()!,
      valuesApi
    );
    endLoading();
    //Hooks que cambia de estado para activar el modal
    toggle();
    router.refresh();
  };

  return (
    <>
      <BasicModal
        title="🌟 ¡Información almacenada con éxito! 🌟"
        description={<>Tus datos se han guardado correctamente</>}
        open={state}
        setOpen={toggle}
      />
      <TypographyH2
        variant="primary-100"
        className={`${user.rol === "Gestor" ? "text-tomato/80" : "text-teal"}`}
      >
        5. Información adicional
      </TypographyH2>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-5 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Combo de tipo de inmueble */}
          <FormField
            control={form.control}
            name="how_did_you_hear_about"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 col-span-12 xl:col-span-9">
                <FormLabel>¿Cómo se enteró de GOINMUEBLES?</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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

                  <SelectContent className="h-[150px]">
                    {halfInterest?.map((halfInterest) => (
                      <SelectItem
                        key={halfInterest.id}
                        value={`${halfInterest.id}`}
                        className="focus:bg-gray62/20"
                      >
                        {halfInterest.nombres}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="primary-teal"
            className="w-fit ml-auto col-span-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <BasicLoading name="Enviando..." className="flex-row gap-3" />
            ) : (
              "Guardar y enviar"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
