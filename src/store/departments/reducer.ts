import { PayloadAction } from "@reduxjs/toolkit";
import { DepartmentActionTypes } from "./actions";
import { Department } from "../../models";

const initialState: Department[] = require("./initial-state.json");

const departmentReducer = (state: Department[] = initialState, action: PayloadAction<Department[], DepartmentActionTypes>) => {
    switch(action.type) {
        case DepartmentActionTypes.CHANGE_DEPARTMENTS:
            return action.payload;
        default:
            return state;
    }
}

export default departmentReducer;