import axios from "axios";
import { Category } from "../models";

const baseURL = "/api/v1/categories";

/**
* GET all categories
*/
const getCategories = (): Promise<Category[]> => {
    return axios.get<Category[]>(baseURL).then(res => res.data)
}

const CategoryService = {
    getCategories
}

export default CategoryService;