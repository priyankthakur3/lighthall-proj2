import React from "react";
import '../styles/Column.css';
import { Box, Typography } from "@mui/material";
import PostList from "./PostList";


// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-top-left-radius: ${borderRadius}px;
//   border-top-right-radius: ${borderRadius}px;
//   background-color: ${({ isDragging }) =>
//     isDragging ? colors.G50 : colors.N30};
//   transition: background-color 0.2s ease;
//   &:hover {
//     background-color: ${colors.G50};
//   }
// `;

const Column = (props) => {
    const title = props.title;
    const quotes = props.quotes;
    const index = props.index;
    return (
        <Box className="column-container" >
            <Box className="column-header">
                <Typography sx={{
                    textAlign : "center"
                }}>
                    {title}
                </Typography>
            </Box>
            <PostList
                listId={title}
                listType="QUOTE"
                quotes={quotes}
                internalScroll={props.isScrollable}
                useClone={Boolean(props.useClone)}
            />
        </Box>
    );
};

export default Column;
