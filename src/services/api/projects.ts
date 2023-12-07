/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { intProject } from "../interfaces/intProject";
const api = useApi();

export async function getProjectsFromOwner(idUser:string |null) {
    
    try {
        const {data} = await api.get('projects?populate[user][fields]=id&filters[user][id][$eq]='+ idUser +'&populate[project_steps]=*');
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getProjectsFromUsers(idUser:string |null) {
    
    try {
        const {data} = await api.get('projects?populate[users][fields]=id&filters[users][id][$eq]='+ idUser +'&populate[project_steps]=*&populate[user]=*');
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getProjectById(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('projects/'+ idProject + '?populate[0]=project_steps&populate[1]=user');
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getProjectNameById(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('projects/'+ idProject + '?fields[0]=name');
        return data.data;
    } catch (error) {
        return error
    }
}



export async function addProjectToBDD(data:intProject) {
    const body = {data}
    try {
        const {data} = await api.post('projects', body);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function deleteProjectFromBDD(idProject: string | undefined) {
    try {
        const {data} = await api.delete('projects/' + idProject);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function modifyProjectToBDD(idProject:string|undefined, data:intProject) {
    const body = {
        data
    }
    try {
        const {data} = await api.put('projects/' + idProject, body);
        return data.data;
    } catch (error) {
        return error
    }
}






// project and step by user
//http://localhost:1337/api/projects?populate[app_user][fields]=id&filters[app_user][id][$eq]=1&populate[project_steps]=*
// project by user
// http://localhost:1337/api/projects?populate[0]=app_user&filters[app_user][id][$eq]=1&populate[1]=project_steps
// All projects with steps
// http://localhost:1337/api/projects?populate[0]=project_steps
// ID project et toute la step
// http://localhost:1337/api/projects?fields[0]=id&populate[0]=project_steps
