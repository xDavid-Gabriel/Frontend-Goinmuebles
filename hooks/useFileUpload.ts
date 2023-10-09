import { useState } from "react";
import confetti from "canvas-confetti";

interface UseFileUploadProps {
  totalCount: number;
}

interface UseFileUploadReturn {
  files: { [key: string]: File };
  progress: number;
  handleArchive: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
    fieldName: string
  ) => void;
}

export const useFileUpload = ({
  totalCount,
}: UseFileUploadProps): UseFileUploadReturn => {
  const [files, setFiles] = useState<{ [key: string]: File }>({});
  const [progress, setProgress] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  let defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };
  const shootConfetti = () => {
    // Lógica del confeti
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  };

  // const handleArchive = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   fieldChange: (value: string) => void,
  //   fieldName: string
  // ) => {
  //   e.preventDefault();
  //   if (e.target.files && e.target.files?.length > 0) {
  //     //Viene hacer un objeto con todas la propiedades del archivo
  //     const file = e.target.files[0];

  //     if (!file.type.includes("application/pdf")) return;

  //     //Guarda el archivo mas lo que se vaya agregando
  //     setFiles({ ...files, [fieldName]: file });

  //     //Si el estado inicializa en 0 este lo aumenta en mas uno para que entre  +1 cuando la funcion se activa
  //     const newFileCount = fileCount + 1;

  //     //Actualiza el contador de archivos
  //     setFileCount(newFileCount);

  //     //Redondea el numero para progrres para que tenga numeros enteros
  //     let progress = Math.round((newFileCount / totalCount) * 100);
  //     //Si es newFileCount = a "totalCount" osea al final del archivo entonces esta al ultimo hace que el progres tenga si o si un valor de 100
  //     if (newFileCount === totalCount) {
  //       progress = 100;
  //     }
  //     //Se le va entregando para que actualize el estado mediante la subida de archivos
  //     setProgress(progress);
  //     if (progress === 100) {
  //       for (let i = 0; i < 10; i++) {
  //         setTimeout(shootConfetti, i * 100);
  //       }
  //     }
  //     //Para que pueda ir escuhando el el onChange cosa qeu cuando se envie enviara el nombre del archivo
  //     fieldChange(file.name);
  //   }
  // };

  const handleArchive = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: any) => void,
    fieldName: string
  ) => {
    e.preventDefault();
    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];

      if (!file.type.includes("application/pdf")) return;

      // Aquí verificamos si el archivo ya existía o no
      const isNewFile = !files[fieldName];
      console.log({ isNewFile });

      setFiles({ ...files, [fieldName]: file });

      let newFileCount = fileCount;
      if (isNewFile) {
        // Solo aumentamos el contador si es un archivo nuevo
        newFileCount += 1;
        setFileCount(newFileCount);
      }

      let progress = Math.round((newFileCount / totalCount) * 100);
      if (newFileCount === totalCount) {
        progress = 100;
      }
      setProgress(progress);
      if (progress === 100) {
        for (let i = 0; i < 10; i++) {
          setTimeout(shootConfetti, i * 100);
        }
      }
      fieldChange(file);
    }
  };

  return { files, progress, handleArchive };
};
