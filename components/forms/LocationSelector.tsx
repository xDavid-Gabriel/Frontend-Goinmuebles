"use client";
import { LocationApi } from "@/api";
import {
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
import { useData } from "@/hooks";
import { IDepartments, IDistrict, IProvince } from "@/interfaces";
import { useEffect, useState } from "react";
import { BasicLoading } from "@/components/shared";
import { ENV } from "@/utils";
import { useStateAuthContext } from "@/context";
import axios from "axios";
interface Props {
  form: any;
  nameDepartment?: string;
  nameProvince?: string;
  nameDistrict?: string;
  // variant: "primary-red" | "primary-teal" | "primary-normal";
  classNameFormItem?: string;
  classNameFormLabel?: string;
  classNameSelectTrigger?: string;
  classNameSelectItem?: string;
}

const locationCtrl = new LocationApi();
// export const LocationSelector = ({
//   form,
//   nameDepartment = "department",
//   nameProvince = "province",
//   nameDistrict = "district",
//   classNameFormItem,
//   classNameFormLabel,
//   classNameSelectTrigger,
//   classNameSelectItem,
// }: Props) => {
//   const { user } = useStateAuthContext();

//   //Traer los departamentos
//   const { data: departmentData, isLoading: isLoadingDept } = useData<
//     IDepartments[]
//   >(`${locationCtrl.getDepartment()}`);

//   //Id de la provincia
//   const [provinceId, setProvinceId] = useState(0);

//   //Capturamos el id de las provincias mediante lo que se selecciono y lo almacenamos en "provinceId"
//   const provId = provinceId < 10 ? `0${provinceId}` : `${provinceId}`;

//   //Al tenerlos podremos hacer el llamado a la api para traer la data de provincias de acuerdo al id que se selecciono
//   const { data: provinceData, isLoading: isLoadingProvince } = useData<
//     IProvince[]
//   >(`${locationCtrl.getProvince(provId)}`);

//   //Segun la provincia que se selecciono lo almacenamos el id en "districtId" cosa que podremos hacer la llamada a los distritos
//   const [districtId, setDistrictId] = useState(0);

//   //Validamos una logica de id ya que desde la api viene mal al traer el id si la longitud es mayor a 4 se le agregara un 0 si pasa se le pomdra el id normal
//   const distId =
//     districtId.toString().length < 4 ? `0${districtId}` : `${districtId}`;

//   // Una vez capturada el id de "districtId" correctamente podremos traer su data
//   const { data: districtData, isLoading: isLoadingDistrict } = useData<
//     IDistrict[]
//   >(`${locationCtrl.getDistrict(provId, distId)}`);

//   const handleDepartmentChange = (selectedDepartment: string) => {
//     setProvinceId(+selectedDepartment);
//     form.setValue(nameProvince, "");
//     form.setValue(nameDistrict, "");
//   };

//   const handleProvinceChange = (selectedProvince: string) => {
//     setDistrictId(+selectedProvince);
//     form.setValue(nameDistrict, "");
//   };

//   return (
//     <>
//       {/* Combo departamento */}
//       <FormField
//         control={form.control}
//         name={nameDepartment}
//         render={({ field }) => {
//           return (
//             <FormItem
//               className={`flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 ${classNameFormItem}`}
//             >
//               <FormLabel className={`font-bold ${classNameFormLabel}`}>
//                 Departamento
//               </FormLabel>

//               <Select
//                 onValueChange={(value) => {
//                   handleDepartmentChange(value);
//                   field.onChange(value);
//                 }}
//                 defaultValue={field.value}
//                 value={field.value}
//               >
//                 <FormControl className="p-[13px_18px] rounded-[20px]">
//                   <SelectTrigger
//                     className={`font-josefin border-[2px] ${classNameSelectTrigger}`}
//                   >
//                     {field.value ? (
//                       <SelectValue placeholder="Selecciona" />
//                     ) : (
//                       "Selecciona"
//                     )}
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent className="h-[150px]">
//                   {isLoadingDept ? (
//                     <BasicLoading />
//                   ) : (
//                     departmentData?.map((item) => (
//                       <SelectItem
//                         value={`${item.id < 10 ? `0${item.id}` : item.id}`}
//                         key={item.id}
//                         className={`${classNameSelectItem}`}
//                       >
//                         {item.nombre}
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           );
//         }}
//       />
//       {/* Combo provincia */}
//       <FormField
//         control={form.control}
//         name={nameProvince}
//         render={({ field }) => {
//           return (
//             <FormItem
//               className={`flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 ${classNameFormItem}`}
//             >
//               <FormLabel className={`font-bold ${classNameFormLabel}`}>
//                 Provincia
//               </FormLabel>

//               <Select
//                 onValueChange={(value) => {
//                   handleProvinceChange(value);
//                   field.onChange(value);
//                 }}
//                 defaultValue={field.value}
//                 value={field.value}
//                 disabled={provinceId > 0 ? false : true}
//               >
//                 <FormControl className="p-[13px_18px] rounded-[20px]">
//                   <SelectTrigger
//                     className={`font-josefin border-[2px] ${classNameSelectTrigger}`}
//                   >
//                     {field.value ? (
//                       <SelectValue placeholder="Selecciona" />
//                     ) : (
//                       "Selecciona"
//                     )}
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent className="h-[150px]">
//                   {isLoadingProvince ? (
//                     <BasicLoading />
//                   ) : (
//                     provinceData?.map((provincia) => (
//                       <SelectItem
//                         value={`${
//                           provincia.id.toString().length < 4
//                             ? `0${provincia.id}`
//                             : provincia.id
//                         }`}
//                         key={provincia.id}
//                         className={`${classNameSelectItem}`}
//                       >
//                         {provincia.nombre}
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           );
//         }}
//       />
//       {/* Combo distrito */}
//       <FormField
//         control={form.control}
//         name={nameDistrict}
//         render={({ field }) => (
//           <FormItem
//             className={`flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 ${classNameFormItem}`}
//           >
//             <FormLabel className={`font-bold ${classNameFormLabel}`}>
//               Distrito
//             </FormLabel>

//             <Select
//               onValueChange={field.onChange}
//               defaultValue={field.value}
//               value={field.value}
//               disabled={districtId > 0 ? false : true}
//             >
//               <FormControl className="p-[13px_18px] rounded-[20px]">
//                 <SelectTrigger
//                   className={`font-josefin border-[2px] ${classNameSelectTrigger}`}
//                 >
//                   {field.value ? (
//                     <SelectValue placeholder="Selecciona" />
//                   ) : (
//                     "Selecciona"
//                   )}
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent className="h-[150px]">
//                 {isLoadingDistrict ? (
//                   <BasicLoading />
//                 ) : (
//                   districtData?.map((distrito) => (
//                     <SelectItem
//                       value={`${
//                         distrito.id.toString().length < 6
//                           ? `0${distrito.id}`
//                           : distrito.id
//                       }`}
//                       key={distrito.id}
//                       className={`${classNameSelectItem}`}
//                     >
//                       {distrito.nombre}
//                     </SelectItem>
//                   ))
//                 )}
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </>
//   );
// };

export const LocationSelector = ({
  form,
  nameDepartment = "department",
  nameProvince = "province",
  nameDistrict = "district",
  classNameFormItem,
  classNameFormLabel,
  classNameSelectTrigger,
  classNameSelectItem,
}: Props) => {
  const { user } = useStateAuthContext();

  //Traer los departamentos
  const { data: departmentData, isLoading: isLoadingDept } = useData<
    IDepartments[]
  >(`${locationCtrl.getDepartment()}`);

  //Id de la provincia
  const [provinceId, setProvinceId] = useState(0);

  //Al tenerlos podremos hacer el llamado a la api para traer la data de provincias de acuerdo al id que se selecciono
  const { data: provinceData, isLoading: isLoadingProvince } = useData<
    IProvince[]
  >(
    `${locationCtrl.getProvince(
      `${
        form.getValues(nameDepartment)
          ? form.getValues(nameDepartment)
          : provinceId
      }`
    )}`
  );

  //Segun la provincia que se selecciono lo almacenamos el id en "districtId" cosa que podremos hacer la llamada a los distritos
  const [districtId, setDistrictId] = useState(0);

  // Una vez capturada el id de "districtId" correctamente podremos traer su data
  const { data: districtData, isLoading: isLoadingDistrict } = useData<
    IDistrict[]
  >(
    `${locationCtrl.getDistrict(
      `${
        form.getValues(nameDepartment)
          ? form.getValues(nameDepartment)
          : provinceId
      }`,
      `${
        form.getValues(nameProvince) ? form.getValues(nameProvince) : districtId
      }`
    )}`
  );

  const handleDepartmentChange = (selectedDepartment: string) => {
    setProvinceId(+selectedDepartment);
    form.setValue(nameProvince, "");
    form.setValue(nameDistrict, "");
  };

  const handleProvinceChange = (selectedProvince: string) => {
    setDistrictId(+selectedProvince);
    form.setValue(nameDistrict, "");
  };

  // // Estados para datos y estados de carga
  // const [departmentData, setDepartmentData] = useState<IDepartments[]>([]);
  // const [provinceData, setProvinceData] = useState<IProvince[]>([]);
  // const [districtData, setDistrictData] = useState<IDistrict[]>([]);
  // const [isLoadingDept, setIsLoadingDept] = useState<boolean>(false);
  // const [isLoadingProvince, setIsLoadingProvince] = useState<boolean>(false);
  // const [isLoadingDistrict, setIsLoadingDistrict] = useState<boolean>(false);

  // // Estados para los IDs seleccionados
  // const [provinceId, setProvinceId] = useState<string>("");
  // const [districtId, setDistrictId] = useState<string>("");

  // const handleDepartmentChange = (selectedDepartment: string) => {
  //   setProvinceId(selectedDepartment);
  //   // Restablecer los valores de provincia y distrito al cambiar el departamento
  //   form.setValue(nameProvince, "");
  //   form.setValue(nameDistrict, "");
  // };

  // const handleProvinceChange = (selectedProvince: string) => {
  //   setDistrictId(selectedProvince);
  //   // Restablecer el valor del distrito al cambiar la provincia
  //   form.setValue(nameDistrict, "");
  // };
  // useEffect(() => {
  //   // Función para obtener departamentos
  //   const fetchDepartments = async () => {
  //     try {
  //       const { data } = await axios.get(locationCtrl.getDepartment());
  //       setDepartmentData(data);
  //       setProvinceId(form.getValues(nameDepartment));
  //       setDistrictId(form.getValues(nameProvince));
  //     } catch (error) {
  //       console.error("Error fetching departments:", error);
  //     }
  //   };

  //   fetchDepartments();
  // }, []);

  // useEffect(() => {
  //   // Función para obtener provincias basado en departmentId
  //   const fetchProvinces = async () => {
  //     if (provinceId.length === 0) return;

  //     setIsLoadingProvince(true);
  //     try {
  //       const { data } = await axios.get(locationCtrl.getProvince(provinceId));

  //       setProvinceData(data);
  //     } catch (error) {
  //       console.error("Error fetching provinces:", error);
  //     }
  //     setIsLoadingProvince(false);
  //   };

  //   fetchProvinces();
  // }, [provinceId]);

  // useEffect(() => {
  //   // Función para obtener distritos basado en provinceId
  //   const fetchDistricts = async () => {
  //     if (districtId.length === 0) return;

  //     setIsLoadingDistrict(true);
  //     try {
  //       const { data } = await axios.get(
  //         locationCtrl.getDistrict(provinceId, districtId)
  //       );

  //       setDistrictData(data);
  //     } catch (error) {
  //       console.error("Error fetching districts:", error);
  //     }
  //     setIsLoadingDistrict(false);
  //   };

  //   fetchDistricts();
  // }, [districtId, provinceId]);

  return (
    <>
      {/* Combo departamento */}
      <FormField
        control={form.control}
        name={nameDepartment}
        render={({ field }) => {
          // useEffect(() => {
          //   const getProvince = async () => {
          //     if (field.value.length === 0) return;
          //     try {
          //       const { data } = await axios.get(
          //         locationCtrl.getProvince(field.value)
          //       );

          //       setProvinceData(data);
          //     } catch (error) {
          //       console.error("Error fetching provinces:", error);
          //     }
          //   };
          //   getProvince();
          //   // setProvinceId(field.value);
          // }, []);
          return (
            <FormItem
              className={`flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 ${classNameFormItem}`}
            >
              <FormLabel className={`font-bold ${classNameFormLabel}`}>
                Departamento
              </FormLabel>

              <Select
                onValueChange={(value) => {
                  handleDepartmentChange(value);
                  field.onChange(value);
                }}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl className="p-[13px_18px] rounded-[20px]">
                  <SelectTrigger
                    className={`font-josefin border-[2px] ${classNameSelectTrigger}`}
                  >
                    {field.value ? (
                      <SelectValue placeholder="Selecciona" />
                    ) : (
                      "Selecciona"
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-[150px]">
                  {isLoadingDept ? (
                    <BasicLoading />
                  ) : (
                    departmentData?.map((item) => (
                      <SelectItem
                        value={`${item.id}`}
                        key={item.id}
                        className={`${classNameSelectItem}`}
                      >
                        {item.nombre}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      {/* Combo provincia */}
      <FormField
        control={form.control}
        name={nameProvince}
        render={({ field }) => {
          // useEffect(() => {
          //   const getDistrict = async () => {
          //     if (field.value.length === 0) return;
          //     try {
          //       // const { data } = await axios.get(
          //       //   locationCtrl.getProvince(field.value)
          //       // );
          //       const { data } = await axios.get(
          //         locationCtrl.getDistrict(
          //           form.getValues(nameDepartment),
          //           field.value
          //         )
          //       );
          //       setDistrictData(data);
          //     } catch (error) {
          //       console.error("Error fetching districts:", error);
          //     }
          //   };
          //   getDistrict();
          //   // setProvinceId(field.value);
          // }, []);

          return (
            <FormItem
              className={`flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 ${classNameFormItem}`}
            >
              <FormLabel className={`font-bold ${classNameFormLabel}`}>
                Provincia
              </FormLabel>

              <Select
                onValueChange={(value) => {
                  handleProvinceChange(value);
                  field.onChange(value);
                }}
                defaultValue={provinceId.toString()}
                value={field.value}
                disabled={provinceId.toString().length > 0 ? false : true}
              >
                <FormControl className="p-[13px_18px] rounded-[20px]">
                  <SelectTrigger
                    className={`font-josefin border-[2px] ${classNameSelectTrigger}`}
                  >
                    {field.value ? (
                      <SelectValue placeholder="Selecciona" />
                    ) : (
                      "Selecciona"
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-[150px]">
                  {isLoadingProvince ? (
                    <BasicLoading />
                  ) : (
                    provinceData?.map((provincia) => (
                      <SelectItem
                        value={`${provincia.id}`}
                        key={provincia.id}
                        className={`${classNameSelectItem}`}
                      >
                        {provincia.nombre}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      {/* Combo distrito */}
      <FormField
        control={form.control}
        name={nameDistrict}
        render={({ field }) => {
          return (
            <FormItem
              className={`flex w-full flex-col gap-1 col-span-12 xs:col-span-6 sm:col-span-4 ${classNameFormItem}`}
            >
              <FormLabel className={`font-bold ${classNameFormLabel}`}>
                Distrito
              </FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={districtId.toString().length > 0 ? false : true}
              >
                <FormControl className="p-[13px_18px] rounded-[20px]">
                  <SelectTrigger
                    className={`font-josefin border-[2px] ${classNameSelectTrigger}`}
                  >
                    {field.value ? (
                      <SelectValue placeholder="Selecciona" />
                    ) : (
                      "Selecciona"
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-[150px]">
                  {isLoadingDistrict ? (
                    <BasicLoading />
                  ) : (
                    districtData?.map((distrito) => (
                      <SelectItem
                        value={`${distrito.id}`}
                        key={distrito.id}
                        className={`${classNameSelectItem}`}
                      >
                        {distrito.nombre}
                      </SelectItem>
                    ))
                  )}
                  {/* {districtData?.map((distrito) => (
                    <SelectItem
                      value={`${distrito.id}`}
                      key={distrito.id}
                      className={`${classNameSelectItem}`}
                    >
                      {distrito.nombre}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
};
