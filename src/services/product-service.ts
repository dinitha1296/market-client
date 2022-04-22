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
    if (pageNumber) params["page-number"] = pageNumber;
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

const ProductService = {
    getProducts,
    getProductsById
}

export default ProductService;