import { SubDepartment } from "./sub-department-model";

export interface Category {

    categoryId: number;
    categoryName: String;
    categoryCode: String;
    subDepartment: SubDepartment;
}