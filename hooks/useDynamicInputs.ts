import { useState } from "react";
import { useFieldArray } from "react-hook-form";

export const useDynamicInputs = ({
  defaultFieldSet,
  control,
  name,
  count = 1,
}: {
  defaultFieldSet: {};
  control: any;
  name: string;
  count?: number;
}) => {
  const [fieldSetsCount, setFieldSetsCount] = useState(count);
  const { fields, append, remove } = useFieldArray({
    name: name,
    control: control,
  });

  const handleAddFields = () => {
    if (fieldSetsCount < 3) {
      setFieldSetsCount((prevCount) => prevCount + 1);
      append(defaultFieldSet);
    }
  };
  const handleRemoveFields = () => {
    if (fieldSetsCount > 1) {
      // Asegúrate de no eliminar todos los campos
      setFieldSetsCount((prevCount) => prevCount - 1);
      remove(fields.length - 1); // Elimina el último conjunto de campos
    }
  };
  return {
    fields,
    handleAddFields,
    handleRemoveFields,
    fieldSetsCount,
  };
};
// import { useState, useEffect } from "react";

// export const useDynamicInputs = ({
//   defaultFieldSet,
// }: {
//   defaultFieldSet: {};
// }) => {
//   const createObject = () => {
//     return defaultFieldSet;
//   };

//   const [fieldSetsCount, setFieldSetsCount] = useState(1);
//   const [fieldSets, setFieldSets] = useState([createObject()]);

//   useEffect(() => {
//     const updatedFieldSets = Array.from({ length: fieldSetsCount }, () =>
//       createObject()
//     );
//     setFieldSets(updatedFieldSets);
//   }, [fieldSetsCount]);

//   const handleAddFields = () => {
//     if (fieldSetsCount < 3) {
//       setFieldSetsCount((prevCount) => prevCount + 1);
//     }
//   };

//   const data = fieldSets.slice(0, fieldSetsCount);

//   return {
//     data,
//     handleAddFields,
//     fieldSets,
//     fieldSetsCount,
//   };
// };
