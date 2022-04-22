import { PayloadAction } from "@reduxjs/toolkit";
import { SubDepartmentActionTypes } from "./actions";
import { SubDepartment } from "../../models";

const initialState: SubDepartment[] = require("./initial-state.json");

const subDepartmentReducer = (state: SubDepartment[] = initialState, action: PayloadAction<SubDepartment[], SubDepartmentActionTypes>) => {
    switch(action.type) {
        case SubDepartmentActionTypes.CHANGE_SUB_DEPARTMENTS:
            return action.payload;
        default:
            return state;
    }
}

export default subDepartmentReducer;