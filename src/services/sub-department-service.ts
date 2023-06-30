import axios from "axios";
import { SubDepartment } from "../models";

const baseURL = "/sub-departments";

/**
* GET all sub departments
*/
const getSubDepartments = (): Promise<SubDepartment[]> => {
    return axios.get<SubDepartment[]>(baseURL).then(res => res.data)
}

const SubDepartmentService = {
    getSubDepartments
}

export default SubDepartmentService;