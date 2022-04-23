import React from "react";
import { DepartmentBar, SearchBar, TopNavigation } from "../components";

class Products extends React.Component<{}, {}> {

    render(): JSX.Element {
        return (
            <div>
                <TopNavigation>
                    <SearchBar></SearchBar>
                </TopNavigation>
                <DepartmentBar></DepartmentBar>
                <p>Products</p>
            </div>
        );
    }
}

export default Products;