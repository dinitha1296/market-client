import { PayloadAction } from "@reduxjs/toolkit"
import { SubDepartment } from "../../models"

export enum SubDepartmentActionTypes {
    CHANGE_SUB_DEPARTMENTS = "subDepartments/change"
}

export const changeDepartments = (subDepartments: SubDepartment[]): PayloadAction<SubDepartment[], SubDepartmentActionTypes> => {
    return {
        type: SubDepartmentActionTypes.CHANGE_SUB_DEPARTMENTS,
        payload: subDepartments
    }
}