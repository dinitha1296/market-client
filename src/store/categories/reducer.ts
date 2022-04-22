import { PayloadAction } from "@reduxjs/toolkit";
import { CategoryActionTypes } from "./actions";
import { Category } from "../../models";

const initialState: Category[] = require("./initial-state.json");

const categoryReducer = (state: Category[] = initialState, action: PayloadAction<Category[], CategoryActionTypes>) => {
    switch(action.type) {
        case CategoryActionTypes.CHANGE_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
}

export default categoryReducer;