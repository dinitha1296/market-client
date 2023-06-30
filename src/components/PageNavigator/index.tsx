import React from "react";

import "./index.css";

const PageNavigator = (props: PageNavigatorProps): JSX.Element => {

    const toPreviousPage = (): void => {
        props.onPageChange(props.currentPage - 1);
    }

    const toNextPage = (): void => {
        props.onPageChange(props.currentPage + 1);
    }

    const isSelected = (pageNumber: number): boolean => {
        return pageNumber === props.currentPage;
    }

    const getListClasses = (pageNumber: number): string => {
        return isSelected(pageNumber) ? "page-item disabled" : "page-item";
    }

    const getBtnClasses = (pageNumber: number): string => {
        return isSelected(pageNumber) ? "page-link bg-secondary text-light" : "page-link";
    }

    return (
        <nav aria-label="Page navigation example" className="pt-3 pb-3">
            {props.totalPages <= 7 &&
                <ul className="pagination justify-content-center">
                    <li className={getListClasses(1)}><button className="page-link" onClick={toPreviousPage}>Previous</button ></li>
                    {props.totalPages >= 1 && <li className={getListClasses(1)}><button className={getBtnClasses(1)} onClick={() => props.onPageChange(1)}>1</button ></li>}
                    {props.totalPages >= 2 && <li className={getListClasses(2)}><button className={getBtnClasses(2)} onClick={() => props.onPageChange(2)}>2</button ></li>}
                    {props.totalPages >= 3 && <li className={getListClasses(3)}><button className={getBtnClasses(3)} onClick={() => props.onPageChange(3)}>3</button ></li>}
                    {props.totalPages >= 4 && <li className={getListClasses(4)}><button className={getBtnClasses(4)} onClick={() => props.onPageChange(4)}>4</button ></li>}
                    {props.totalPages >= 5 && <li className={getListClasses(5)}><button className={getBtnClasses(5)} onClick={() => props.onPageChange(5)}>5</button ></li>}
                    {props.totalPages >= 6 && <li className={getListClasses(6)}><button className={getBtnClasses(6)} onClick={() => props.onPageChange(6)}>6</button ></li>}
                    {props.totalPages >= 7 && <li className={getListClasses(7)}><button className={getBtnClasses(7)} onClick={() => props.onPageChange(7)}>7</button ></li>}
                    <li className={getListClasses(props.totalPages)}><button className="page-link" onClick={toNextPage}>Next</button ></li>
                </ul>
            }

            {props.totalPages > 7 && props.currentPage > 3 && props.currentPage <= props.totalPages - 3 &&
                <ul className="pagination justify-content-center">
                    <li className="page-item"><button className="page-link" onClick={toPreviousPage}>Previous</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => props.onPageChange(1)}>1</button ></li>
                    <li className="page-item disabled"><button className="page-link">.</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => props.onPageChange(props.currentPage - 1)}>{props.currentPage - 1}</button ></li>
                    <li className="page-item disabled"><button className="page-link bg-secondary text-light">{props.currentPage}</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => props.onPageChange(props.currentPage + 1)}>{props.currentPage + 1}</button ></li>
                    <li className="page-item disabled"><button className="page-link">.</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => props.onPageChange(props.totalPages)}>{props.totalPages}</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => toNextPage()}>Next</button ></li>
                </ul>
            }

            {props.totalPages > 7 && props.currentPage <= 3 &&
                <ul className="pagination justify-content-center">
                    <li className={getListClasses(1)}><button className="page-link" onClick={toPreviousPage}>Previous</button ></li>
                    <li className={getListClasses(1)}><button className={getBtnClasses(1)} onClick={() => props.onPageChange(1)}>1</button ></li>
                    <li className={getListClasses(2)}><button className={getBtnClasses(2)} onClick={() => props.onPageChange(2)}>2</button ></li>
                    <li className={getListClasses(3)}><button className={getBtnClasses(3)} onClick={() => props.onPageChange(3)}>3</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => props.onPageChange(4)}>4</button ></li>
                    <li className="page-item disabled"><button className="page-link">.</button ></li>
                    <li className="page-item disabled"><button className="page-link">.</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => props.onPageChange(props.totalPages)}>{props.totalPages}</button ></li>
                    <li className="page-item"><button className="page-link" onClick={toNextPage}>Next</button ></li>
                </ul>
            }

            {props.totalPages > 7 && props.currentPage > props.totalPages - 3 &&
                <ul className="pagination justify-content-center">
                    <li className="page-item"><button className="page-link" onClick={toPreviousPage}>Previous</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => props.onPageChange(1)}>1</button ></li>
                    <li className="page-item"><button className="page-link">.</button ></li>
                    <li className="page-item"><button className="page-link">.</button ></li>
                    <li className="page-item"><button className="page-link" onClick={() => props.onPageChange(props.totalPages - 3)}>{props.totalPages - 3}</button ></li>
                    <li className={getListClasses(props.totalPages - 2)}><button className={getBtnClasses(props.totalPages - 2)} onClick={() => props.onPageChange(props.totalPages - 2)}>{props.totalPages - 2}</button ></li>
                    <li className={getListClasses(props.totalPages - 1)}><button className={getBtnClasses(props.totalPages - 1)} onClick={() => props.onPageChange(props.totalPages - 1)}>{props.totalPages - 1}</button ></li>
                    <li className={getListClasses(props.totalPages)}><button className={getBtnClasses(props.totalPages)} onClick={() => props.onPageChange(props.totalPages)}>{props.totalPages}</button ></li>
                    <li className={getListClasses(props.totalPages)}><button className="page-link" onClick={toNextPage}>Next</button ></li>
                </ul>
            }
        </nav>
    );
}

interface PageNavigatorProps {
    totalPages: number;
    currentPage: number;
    onPageChange(pageNumber: number): void;
}

export type { PageNavigatorProps };

export default PageNavigator;