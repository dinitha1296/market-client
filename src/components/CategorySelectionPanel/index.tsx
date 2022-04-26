import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Category, Department, SubDepartment } from "../../models";
import { ApplicationState } from "../../store";

import "./index.css";

type CategorySelectionPanelProps = {
    department: Department;
    onClose: () => void;
}

const CategorySelectionPanel = (props: CategorySelectionPanelProps): JSX.Element => {

    const allSubDepartments: SubDepartment[] = useSelector((state: ApplicationState) => state.subDepartments);

    const allCategories: Category[] = useSelector((state: ApplicationState) => state.categories);

    const [subDepartments, changeSubDepartments] = useState<SubDepartment[]>([]);

    const [selectedSubDepartment, changeSelectedSubDepartment] = useState<SubDepartment | undefined>(undefined);

    const [categories, changeCategories] = useState<Category[]>([]);

    useEffect(() => {
        changeSelectedSubDepartment(undefined);
        changeSubDepartments(allSubDepartments.filter(sub => sub.department.departmentId === props.department.departmentId));
    }, [props.department, allSubDepartments])

    useEffect(() => {
        if (!selectedSubDepartment) {
            changeCategories([]);
        } else {
            changeCategories(allCategories.filter(cat => cat.subDepartment.subDepartmentId === selectedSubDepartment?.subDepartmentId));
        }
    }, [selectedSubDepartment, allCategories]);

    const isSelectedSubDep = (subDepartment: SubDepartment): boolean => {
        return selectedSubDepartment !== undefined && selectedSubDepartment === subDepartment;
    }

    const getSubDepClass = (subDepartment: SubDepartment): string => {
        return `sub-department-bar ${isSelectedSubDep(subDepartment) ? "bg-select-darken" : ""}`;
    }

    const onSubDepClick = (subDepartment: SubDepartment): void => {
        changeSelectedSubDepartment(subDepartment);
    }

    return (
        <div className="cat-selection-panel">
            <div className="d-flex title-bar">
                <h3 className="m-0">{props.department.departmentName}</h3>
                <div className="flex-grow-1"></div>
                <button onClick={props.onClose}><h6 className="m-0">Close</h6></button>
            </div>
            <div className="mt-5 d-flex">
                <nav className="sub-department-section">
                    {subDepartments.map((sub: SubDepartment, index: number) => { return (
                        <div key={index} className={getSubDepClass(sub)} onClick={() => onSubDepClick(sub)}>
                            <p className="m-0">{sub.subDepartmentName}</p>
                            <div className="flex-grow-1"></div>
                            <i className="bi bi-chevron-right"></i>
                        </div>
                    );})}
                </nav>
                {selectedSubDepartment &&
                    <div className="category-section px-5">
                        <Link to={`/products?department=${props.department.departmentId}`} onClick={props.onClose}>
                            {`All ${props.department.departmentName}`}
                        </Link>
                        <Link to={`/products?sub-department=${selectedSubDepartment.subDepartmentId}`}  onClick={props.onClose}>
                            {`All ${selectedSubDepartment.subDepartmentName}`}
                        </Link>
                        {categories.map((cat: Category, index: number) => { return (
                            <Link key={index} to={`/products?category=${cat.categoryId}`}  onClick={props.onClose}>
                                {cat.categoryName}
                            </Link>
                        );})}
                    </div>
                }
                {!selectedSubDepartment &&
                    <div className="category-section px-5">
                        <Link to={`/products?department=${props.department.departmentId}`}  onClick={props.onClose}>
                            {`All ${props.department.departmentName}`}
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default CategorySelectionPanel;