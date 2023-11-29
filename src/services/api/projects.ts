/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getProjectsFromOwner(idUser:number) {
    
    try {
        const {data} = await api.get('projects?populate[app_user][fields]=id&filters[app_user][id][$eq]='+ idUser +'&populate[project_steps]=*');
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getProjectsFromUsers(idUser:number) {
    
    try {
        const {data} = await api.get('projects?populate[app_users][fields]=id&filters[app_users][id][$eq]='+ idUser +'&populate[project_steps]=*');
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getProjectById(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('projects/'+ idProject + '?populate[0]=project_steps');
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

export async function getStepById(idStep:string | undefined) {
    
    try {
        const {data} = await api.get('project-steps/'+ idStep);
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
