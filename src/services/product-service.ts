import axios from "axios";
import { Product } from "../models/product-model";
import { Page } from "../models/page-model";

const baseURL: string = "api/v1/products";

/** 
 * GET all products
 * 
 * @param query - search query
 * @param pageNumber - page number of the page being requested
 * @param pageSize - number of results per page
 */
const getProducts = (query?: string, pageNumber?: number, pageSize?: number): Promise<Page<Product>> => {

    const params: any = {};
    if (query) params.query = query;
    if (pageNumber) params["page-number"] = pageNumber - 1;
    if (pageSize) params["page-size"] = pageSize;

    return axios.get<Page<Product>>(baseURL, { params: params }).then(res => res.data);
}

/**
 * GET product by product ID
 * 
 * @param id - id of the product
 */
const getProductsById = (id: number) : Promise<Product> => {
    
    return axios.get<Product>(baseURL + '/' + id).then(res => res.data);
}

/**
 * GET products by department id
 * 
 * @param id - id of the department
 * @param pageNumber - page number of the page being requested
 * @param pageSize - number of results per page
 */
const getProductsByDepartmentId = (id: number, pageNumber?: number, pageSize?: number): Promise<Page<Product>> => {

    const params: any = {'department-id': id};
    if (pageNumber) params["page-number"] = pageNumber - 1;
    if (pageSize) params["page-size"] = pageSize;

    return axios.get<Page<Product>>(baseURL, { params: params }).then(res => res.data);
}

/**
 * GET products by sub-department id
 * 
 * @param id - id of the sub-department
 * @param pageNumber - page number of the page being requested
 * @param pageSize - number of results per page
 */
 const getProductsBySubDepartmentId = (id: number, pageNumber?: number, pageSize?: number): Promise<Page<Product>> => {

    const params: any = {'sub-department-id': id};
    if (pageNumber) params["page-number"] = pageNumber - 1;
    if (pageSize) params["page-size"] = pageSize;

    return axios.get<Page<Product>>(baseURL, { params: params }).then(res => res.data);
}

/**
 * GET products by category id
 * 
 * @param id - id of the category
 * @param pageNumber - page number of the page being requested
 * @param pageSize - number of results per page
 */
 const getProductsByCategoryId = (id: number, pageNumber?: number, pageSize?: number): Promise<Page<Product>> => {

    const params: any = {'category-id': id};
    if (pageNumber) params["page-number"] = pageNumber - 1;
    if (pageSize) params["page-size"] = pageSize;

    return axios.get<Page<Product>>(baseURL, { params: params }).then(res => res.data);
}

const ProductService = {
    getProducts,
    getProductsById,
    getProductsByDepartmentId,
    getProductsBySubDepartmentId,
    getProductsByCategoryId
}

export default ProductService;