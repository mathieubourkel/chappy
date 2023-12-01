/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getMembersByProject(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('app-users?populate[projects][fields]=id&filters[projects][id][$eq]=' + idProject);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function addUserToProjectToBDD(idProject:string |undefined, idUser:number) {
    const body = {
        app_users: {
            connect: [idUser]
        }
    }
    try {
        const {data} = await api.put('projects/' + idProject, body);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function deleteUserToProjectToBDD(idProject:string |undefined, idUser:number) {
    const body = {
        app_users: {
            disconnect: [idUser]
        }
    }
    try {
        const {data} = await api.put('projects/' + idProject, body);
        return data.data;
    } catch (error) {
        return error
    }
}


export async function getAllUsers() {
    
    try {
        const {data} = await api.get('app-users');
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getAllCompanies() {
    
    try {
        const {data} = await api.get('companies');
        return data.data;
    } catch (error) {
        return error
    }
}





