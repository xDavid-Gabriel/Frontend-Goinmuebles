export const hasValidData = (valor: string | null | undefined) => {
  return valor !== null && valor !== undefined && valor !== ""
    ? "Tengo el archivo"
    : "";
};
