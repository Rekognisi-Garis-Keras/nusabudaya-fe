import apiClient from "../apiClient"
import { endpoints } from "../endpoint"

export const provinceService = {
  getAll: async () => {
    const { data } = await apiClient.get(endpoints.provinces.getAll);
    return data.data;
  },
  
  getBySlug: async (slug) => {  
    const { data } = await apiClient.get(endpoints.provinces.getBySlug(slug));
    return data.data;
  }
}