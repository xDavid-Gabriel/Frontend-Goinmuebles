export interface IDepartments {
  id: number;
  nombre: string;
}

export interface IProvince {
  id: number;
  nombre: string;
  departamento_id: string;
}

export interface IDistrict {
  id: number;
  nombre: string;
  provincia_id: string;
  departamento_id: string;
}
