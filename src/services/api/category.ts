/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getCategories() {
    
    try {
        const {data} = await api.get('categories');
        return data.data;
    } catch (error) {
        return error
    }
}
