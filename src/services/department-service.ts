import axios from "axios";
import { Department } from "../models";

const baseURL = "/departments";

/**
* GET all departments
*/
const getDepartments = (): Promise<Department[]> => {
    return axios.get<Department[]>(baseURL).then(res => res.data)
}

const DepartmentService = {
    getDepartments
}

export default DepartmentService;