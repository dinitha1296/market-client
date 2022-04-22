import React, { useEffect, useState } from "react";

import "./index.css";

type SearchBarProps = {
    searchTearm: string;
    onSearch: (query: string) => void;
}

const SearchBar = (props: SearchBarProps): JSX.Element => {

    const [query, queryChange] = useState<string>("");

    useEffect(() => {
        queryChange(props.searchTearm);
    }, [])

    const onInputFiledChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        queryChange(e.target.value);
    }

    const onClear = (): void => {
        queryChange("");
    }

    return (
        <form id="search" className="search-bar" action="javascript:void(0)">
            <input type="text" value={query} onChange={onInputFiledChange} placeholder="Search products" />
            {query &&
                <button type="button" onClick={onClear}>
                    <i className="bi bi-x"></i>
                </button>
            }
            <button form="search" type="submit" onClick={() => props.onSearch(query)}>
                <i className="bi bi-search"></i>
            </button>
        </form>
    );
}

export default SearchBar;