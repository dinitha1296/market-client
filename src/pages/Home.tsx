import React from "react"
import { TopNavigation, SearchBar, DepartmentBar } from "../components";

class Home extends React.Component<{}, {}> {

    componentDidMount = () => {
        // TODO : Mover results to redux store and handle errors
        // DepartmentService.getDepartments()
        //     .then((departments: Department[]) => this.setState({...this.state, departments}))
        //     .catch(e => console.log(e));
        // SubDepartmentService.getSubDepartments()
        //     .then((subDepartments: SubDepartment[]) => this.setState({...this.state, subDepartments}))
        //     .catch(e => console.log(e));
        // CategoryService.getCategories()
        //     .then((categories: Category[]) => this.setState({...this.state, categories}))
        //     .catch(e => console.log(e));
    }

    render(): JSX.Element {
        return (
            <div>
                <TopNavigation>
                    <SearchBar></SearchBar>
                </TopNavigation>
                <DepartmentBar></DepartmentBar>
            </div>
        );
    }
}

export default Home;