import { Department } from "./department-model";

export interface SubDepartment {
    subDepartmentId: number;
    subDepartmentName: String;
    subDepartmentCode: String;
    department: Department;
}