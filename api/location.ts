import { ENV } from "@/utils";

export class LocationApi {
  getDepartment() {
    return `${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.DEPARTMENT}`;
  }
  getProvince(provinceId: string) {
    return `${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.PROVINCE}/${provinceId}`;
  }
  getDistrict(provinceId: string, districtId: string) {
    return `${ENV.API_URL}/${ENV.ENDPOINTS.SELECTS.DISTRICT}/${provinceId}/${districtId}`;
  }
}
