import React from "react"
import { TopNavigation, SearchBar, DepartmentBar } from "../../components";

const HomePage = (): JSX.Element => {
    return (
        <div>
            <TopNavigation>
                <SearchBar></SearchBar>
            </TopNavigation>
            <DepartmentBar></DepartmentBar>
        </div>
    );
}

export default HomePage;