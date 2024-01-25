/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intCategory } from "../interfaces/intProject";
const api = useApi();
const CATEGORY_ENDPOINT = "category";

export async function getCategories() {
  return handleApiCall(async () => await api.get(`categories`));
}

export async function addCategory(data: intCategory) {
  return handleApiCall(async () => await api.post(CATEGORY_ENDPOINT, data));
}

export async function deleteCategory(idCategory: number | undefined) {
  return handleApiCall(async () => await api.delete(`${CATEGORY_ENDPOINT}/${idCategory}`));
}
