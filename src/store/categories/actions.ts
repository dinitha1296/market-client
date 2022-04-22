import { PayloadAction } from "@reduxjs/toolkit"
import { Category } from "../../models"

export enum CategoryActionTypes {
    CHANGE_CATEGORIES = "categories/change"
}

export const changeCategories = (departments: Category[]): PayloadAction<Category[], CategoryActionTypes> => {
    return {
        type: CategoryActionTypes.CHANGE_CATEGORIES,
        payload: departments
    }
}