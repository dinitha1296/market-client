import React from "react"
import { TopNavigation, ProductItem, SearchBar, DepartmentBar } from "../components";
import { Category, Department, Product, SubDepartment } from "../models";
import { CategoryService, DepartmentService, SubDepartmentService } from "../services";

type HomeState = {
    products: Product[];
    departments: Department[];
    subDepartments: SubDepartment[];
    categories: Category[];
    searchTerm: string;
}

class Home extends React.Component<{}, HomeState> {

    state: Readonly<HomeState> = {
        products: [],
        departments: [],
        subDepartments: [],
        categories: [],
        searchTerm: ""
    }

    componentDidMount = () => {
        // TODO : Error handling
        DepartmentService.getDepartments()
            .then((departments: Department[]) => this.setState({...this.state, departments}))
            .catch(e => console.log(e));
        SubDepartmentService.getSubDepartments()
            .then((subDepartments: SubDepartment[]) => this.setState({...this.state, subDepartments}))
            .catch(e => console.log(e));
        CategoryService.getCategories()
            .then((categories: Category[]) => this.setState({...this.state, categories}))
            .catch(e => console.log(e));
    } 

    onSearch = (query: string): void => { 
        this.setState({...this.state, searchTerm: query});
        console.log("search");
    }

    render(): JSX.Element {
        return (
            <div>
                <TopNavigation>
                    <SearchBar searchTearm="" onSearch={this.onSearch}></SearchBar>
                </TopNavigation>
                <DepartmentBar></DepartmentBar>
                <p>{this.state.searchTerm}</p>
                <p>{this.state.products.length}</p>
                {this.state.products.map(product => <ProductItem product={product} />)}
            </div>
        );
    }
}

export default Home;