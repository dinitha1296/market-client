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

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onSearch();
    }

    return (
        <div id="search" className="search-bar">
            <input onChange={onInputFiledChange} placeholder="Search products" onKeyDown={onEnter}/>
            {query &&
                <button type="button" onClick={onClear}>
                    <i className="bi bi-x"></i>
                </button>
            }
            <button onClick={onSearch}>
                <i className="bi bi-search"></i>
            </button>
        </div>
    );
}

export default SearchBar;