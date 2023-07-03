import React from "react";
import { Pagination, Stack } from "@mui/material";

const PageNavigator = (props: PageNavigatorProps): JSX.Element => {

    return (
        <div id="pagination" style={{display: 'flex'}}>
            <Pagination
                sx={{ py: '2rem', mx: 'auto' }}
                count={props.totalPages}
                page={props.currentPage}
                onChange={(_, v) => props.onPageChange(v)}
                color={'primary'}
            ></Pagination>
        </div>
    );
}

interface PageNavigatorProps {
    totalPages: number;
    currentPage: number;
    onPageChange(pageNumber: number): void;
}

export type { PageNavigatorProps };

export default PageNavigator;