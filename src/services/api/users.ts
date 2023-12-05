/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getMembersByProject(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('users?populate[projects][fields]=id&filters[projects][id][$eq]=' + idProject);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getMembersByTask(idTask:number|undefined) {
    
    try {
        const {data} = await api.get('users?populate[step-tasks][fields]=id&filters[step-tasks][id][$eq]=' + idTask);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function addUserToProjectToBDD(idProject:string |undefined, idUser:number) {
    const body = {
        users: {
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
        users: {
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

export async function deleteUserToTaskToBDD(idTask:number|undefined, idUser:number|undefined) {
    const body = {
        users: {
            disconnect: [idUser]
        }
    }
    try {
        const {data} = await api.put('step-tasks/' + idTask, body);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function addUserToTaskToBDD(idTask:number|undefined, idUser:number|undefined) {
    const body = {
        app_users: {
            connect: [idUser]
        }
    }
    try {
        const {data} = await api.put('step-tasks/' + idTask, body);
        return data.data;
    } catch (error) {
        return error
    }
}


export async function getAllUsers() {
    
    try {
        const {data} = await api.get('users');
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





