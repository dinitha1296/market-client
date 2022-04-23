import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import "./index.css";

const SearchBar = (): JSX.Element => {

    const [query, queryChange] = useState<string>("");

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        queryChange("");
    }, [])

    const onInputFiledChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        queryChange(e.target.value);
    }

    const onClear = (): void => {
        queryChange("");
    }

    const onSearch = (): void => {
        const encodedQuery: string = 
            (new URLSearchParams({search: query.toLowerCase()})).toString();
        navigate(`/products?${encodedQuery}`)
    }

    return (
        <form id="search" className="search-bar" action="javascript:void(0)">
            <input type="text" value={query} onChange={onInputFiledChange} placeholder="Search products" />
            {query &&
                <button type="button" onClick={onClear}>
                    <i className="bi bi-x"></i>
                </button>
            }
            <button form="search" type="submit" onClick={onSearch}>
                <i className="bi bi-search"></i>
            </button>
        </form>
    );
}

export default SearchBar;