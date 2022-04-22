import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Department } from "../../models";
import { ApplicationState } from "../../store";
import { CategorySelectionPanel } from "../index";

import "./index.css";

const DepartmentBar = (): JSX.Element => {

    const [selectedDep, selectedDepChange] = useState<Department | undefined>(undefined);
    const [categoryPanelDepartment, categoryPanelDepartmentChange] = useState<Department | undefined>(undefined);

    const departments: Department[] = useSelector((state: ApplicationState) => state.departments);

    const isSelected = (dep: Department): boolean => {
        if (categoryPanelDepartment) return categoryPanelDepartment.departmentId === dep.departmentId;
        return selectedDep !== undefined && selectedDep.departmentId === dep.departmentId;
    }

    const getDepBtnClass = (dep: Department): string => isSelected(dep) ? "dep-btn-selected" : "dep-btn";

    const onCategoryPanelClose = () => categoryPanelDepartmentChange(undefined);

    return (
        <div>
            <div className="bg-color-two department">
                {departments.map((dep: Department, index: number) => {
                    return (
                        <button key={index} className={getDepBtnClass(dep)} onClick={() => categoryPanelDepartmentChange(dep)}>
                            {dep.departmentName}
                        </button>
                    );
                })}
            </div>
            {categoryPanelDepartment && 
                <CategorySelectionPanel 
                    onClose={onCategoryPanelClose} 
                    department={categoryPanelDepartment}></CategorySelectionPanel>
            }
        </div>
    );
}

export default DepartmentBar;