import { combineReducers } from "@reduxjs/toolkit";
import { Cart, Category, Department, SubDepartment } from "../models";
import cartReducer from "./cart/reducer";
import categoryReducer from "./categories/reducer";
import departmentReducer from "./departments/reducer";
import subDepartmentReducer from "./sub-departments/reducer";

const rootReducer = combineReducers({
    departments: departmentReducer,
    subDepartments: subDepartmentReducer,
    categories: categoryReducer,
    cart: cartReducer
});

export interface ApplicationState {
    departments: Department[];
    subDepartments: SubDepartment[];
    categories: Category[];
    cart: Cart;
}

export default rootReducer;