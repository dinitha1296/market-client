import { combineReducers } from "@reduxjs/toolkit";
import { Category, Department, SubDepartment } from "../models";
import categoryReducer from "./categories/reducer";
import departmentReducer from "./departments/reducer";
import subDepartmentReducer from "./sub-departments/reducer";

const rootReducer = combineReducers({
    departments: departmentReducer,
    subDepartments: subDepartmentReducer,
    categories: categoryReducer
});

export interface ApplicationState {
    departments: Department[];
    subDepartments: SubDepartment[];
    categories: Category[];
}

export default rootReducer;