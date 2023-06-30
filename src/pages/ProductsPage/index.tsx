import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DepartmentBar, ProductItem, SearchBar, TopNavigation, PageNavigator, CartTotalButton } from "../../components";
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
        params.forEach((v, k, p) => { newParams[k] = v });
        if (pageNum > 1) {
            newParams["page"] = pageNum.toString();
        } else {
            delete newParams["page"];
        }
        setParams(newParams);
    }

    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [previousScroll, setPreviousScroll] = useState<number>(0);

    const listenToScroll = () => {
        let heightToHideFrom = 500;
        const winScroll = document.documentElement.scrollTop || 0;
        if (winScroll > heightToHideFrom && winScroll > previousScroll) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setPreviousScroll(winScroll);
    }

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return window.removeEventListener("scroll", () => {
            let heightToHideFrom = 500;
            const winScroll = document.documentElement.scrollTop || 0;
            if (winScroll > heightToHideFrom && winScroll > previousScroll) {
                isVisible && setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setPreviousScroll(winScroll);
        });
    });

    useEffect(() => {

        const newPageNumber: number | undefined = parseInt(params.get("page") || '0') || undefined;

        setPageNum(newPageNumber);

        if (params.has("search")) {

            ProductService.getProducts(params.get("search") || "", newPageNumber, 48)
                .then(extractPageInfo);

        } else if (params.has("category")) {

            ProductService.getProductsByCategoryId(parseInt(params.get("category") || "1"), newPageNumber, 48)
                .then(extractPageInfo);

        } else if (params.has("sub-department")) {

            ProductService.getProductsBySubDepartmentId(parseInt(params.get("sub-department") || "1"), newPageNumber, 48)
                .then(extractPageInfo);

        } else if (params.has("department")) {

            ProductService.getProductsByDepartmentId(parseInt(params.get("department") || "1"), newPageNumber, 48)
                .then(extractPageInfo);

        } else {

            ProductService.getProducts(undefined, newPageNumber, 48)
                .then(extractPageInfo);

        }

        document.documentElement.scrollTo({ left: 0, top: 0 });
    }, [params]);

    return (
        <div id="products-page">
            <div className="sticky-top">
                <TopNavigation>
                    <SearchBar></SearchBar>
                    <CartTotalButton></CartTotalButton>
                </TopNavigation>
                <div className={`${isVisible ? "" : "dipartment-bar-hidden "}department-bar`}>
                    <DepartmentBar visible={isVisible}></DepartmentBar>
                </div>
            </div>
            <div id="product-section-wrapper" className="products-section-wrapper" >
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