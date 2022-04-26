import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DepartmentBar, ProductItem, SearchBar, TopNavigation, PageNavigator } from "../../components";
import { Page, Product } from "../../models";
import { ProductService } from "../../services";

import "./index.css"

const ProductsPage = (): JSX.Element => {

    const [products, setProducts] = useState<Product[]>([]);

    // Undefined type is added to pageNum to match with
    const [pageNum, setPageNum] = useState<number | undefined>(undefined);

    const [totalPages, setTotalPages] = useState<number>(0);

    const [params, setParams] = useSearchParams();

    const extractPageInfo = (page: Page<Product>): void => {
        setProducts(page.content);
        setTotalPages(page.totalPages);
    } 

    const onPageChange = (pageNum: number) => {
        const newParams: any = {};
        params.forEach((v, k, p) => {newParams[k] = v});
        if (pageNum > 1) {
            newParams["page"] = pageNum.toString();
        } else {
            delete newParams["page"];
        }
        setParams(newParams);
    }

    useEffect(() => {
        setPageNum(parseInt(params.get("page") || '0') || undefined);
    }, [params]);


    useEffect(() => {
        
        if (params.has("search")) {
            
            ProductService.getProducts(params.get("search") || "", pageNum, 48)
                .then(extractPageInfo);

        } else if (params.has("category")) {

            ProductService.getProductsByCategoryId(parseInt(params.get("category") || "1"), pageNum, 48)
                .then(extractPageInfo);

        } else if (params.has("sub-department")) {
            
            ProductService.getProductsBySubDepartmentId(parseInt(params.get("sub-department") || "1"), pageNum, 48)
                .then(extractPageInfo);

        } else if (params.has("department")) {
            
            ProductService.getProductsByDepartmentId(parseInt(params.get("department") || "1"), pageNum, 48)
                .then(extractPageInfo);

        } else {

            ProductService.getProducts(undefined, pageNum, 48)
                .then(extractPageInfo);

        }
    }, [params, pageNum]);

    return (
        <div>
            <TopNavigation>
                <SearchBar></SearchBar>
            </TopNavigation>
            <DepartmentBar></DepartmentBar>
            <div className="products-section-wrapper" >
                <div className="products-section">
                    {products.map(prod => <ProductItem key={prod.productId} product={prod}></ProductItem>)}
                </div>
                <PageNavigator 
                    totalPages={totalPages} 
                    currentPage={pageNum || 1} 
                    onPageChange={onPageChange}
                    ></PageNavigator>
            </div>
        </div>
    );
}

export default ProductsPage;