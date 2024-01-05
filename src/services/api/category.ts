/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intCategory } from "../interfaces/intProject";
const api = useApi();
const CATEGORY_ENDPOINT = "category";
const CATEGORIES_ENDPOINT = "categories";

export async function getCategories() {
    try {
        const {data} = await api.get(CATEGORIES_ENDPOINT);
        return data.data;
    } catch (error) {
        return error
    }
}
  
  export async function addCategory(data: intCategory) {
    return handleApiCall(() => api.post(CATEGORY_ENDPOINT, data));
  }
  
  export async function deleteCategory(idCategory: number | undefined) {
    return handleApiCall(() => api.delete(`${CATEGORY_ENDPOINT}/${idCategory}`));
  }
