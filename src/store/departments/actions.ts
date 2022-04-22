import { PayloadAction } from "@reduxjs/toolkit"
import { Department } from "../../models"

export enum DepartmentActionTypes {
    CHANGE_DEPARTMENTS = "departments/change"
}

export const changeDepartments = (departments: Department[]): PayloadAction<Department[], DepartmentActionTypes> => {
    return {
        type: DepartmentActionTypes.CHANGE_DEPARTMENTS,
        payload: departments
    }
}