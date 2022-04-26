import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store<ApplicationState> = configureStore({reducer: persistedReducer});
export const persistor = persistStore(store);