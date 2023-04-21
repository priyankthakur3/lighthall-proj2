// @flow
import React from "react";
import { Box } from "@mui/material";
import '../styles/Layout.css';
import { DataGrid } from "@mui/x-data-grid";

const List = ({
    data,
    columns
}) => {


    return (
        <Box className="list-container" >
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10,25,50]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                disableColumnMenu={true}
            />
        </Box>
    );
};

export default List;
