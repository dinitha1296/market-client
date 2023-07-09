import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Department } from "../../models";
import { ApplicationState } from "../../store";
import { CategorySelectionPanel } from "../index";

import "./index.css";

const DepartmentBar = (props: DepartmentBarProps): JSX.Element => {

    const [selectedDep] = useState<Department | undefined>(undefined);
    const [categoryPanelDepartment, categoryPanelDepartmentChange] = useState<Department | undefined>(undefined);

    const departments: Department[] = useSelector((state: ApplicationState) => state.departments);

    const isSelected = (dep: Department): boolean => {
        if (categoryPanelDepartment) return categoryPanelDepartment.departmentId === dep.departmentId;
        return selectedDep !== undefined && selectedDep.departmentId === dep.departmentId;
    }

    const getDepBtnClass = (dep: Department): string => isSelected(dep) ? "dep-btn-selected" : "dep-btn";

    const onCategoryPanelClose = () => categoryPanelDepartmentChange(undefined);

    // Close category panel when hiding department bar
    useEffect(() => {
        !props.visible && onCategoryPanelClose();
    }, [props.visible])

    return (
        <div>
            <ButtonGroup
                className="bg-color-two department"
                color="secondary"
                variant='text'
                sx={{ borderRadius: '0', display: 'flex' }}>
                {departments.map((dep: Department, index: number) => {
                    return (
                        <Button
                            color='secondary'
                            size="large"
                            key={index}
                            className={getDepBtnClass(dep)}
                            sx={{ borderColor: 'transparent' }}
                            onClick={() => categoryPanelDepartmentChange(dep)}>
                            {dep.departmentName}
                        </Button>
                    );
                })}

            </ButtonGroup>
            {
                categoryPanelDepartment &&
                props.visible &&
                <CategorySelectionPanel
                    onClose={onCategoryPanelClose}
                    department={categoryPanelDepartment}></CategorySelectionPanel>
            }
        </div>
    );
}

interface DepartmentBarProps {
    visible?: boolean;
}

export type { DepartmentBarProps };

export default DepartmentBar;