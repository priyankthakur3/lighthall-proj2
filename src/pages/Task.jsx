import React, { useState } from "react";
import {
  Box, Button, Divider, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import Board from "../components/Board";
import { getData, getListData } from "../utils/mockData";
import Header from "../components/Header";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import '../styles/Layout.css';
import List from "../components/List";
import TaskPopup from "../components/TaskPopup";



export default function Task() {

  const sampleData = getData();
  const [viewType, setViewType] = React.useState('list');
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [taskPopupType, setTaskPopupType] = useState('create');

  const handleViewChange = (event, newViewType) => {
    setViewType(newViewType);
  };

  const handleTaskPopupClose = () =>{
    setTaskPopupType('create');
    setIsTaskPopupOpen(false);
  }

  const ListColumns = [
    { field: 'title', headerName: 'Title', flex : 3 },
    { field: 'description', headerName: 'Description', flex : 4 },
    { field: 'status', headerName: 'Status', flex : 2 },
    { field: 'dueDate', headerName: 'Due Date', flex : 2 },
  ];

  return (
    <Box>
      <Header />
      <Box className="option-container">
        <ToggleButtonGroup
          value={viewType}
          exclusive
          size="small"
          onChange={handleViewChange}
        >
          <ToggleButton value="list">
            <FormatListBulletedIcon /> List view
          </ToggleButton>
          <ToggleButton value="grid">
            <ViewColumnIcon /> Grid View
          </ToggleButton>
        </ToggleButtonGroup>
        <Button variant="contained" onClick={()=>{setIsTaskPopupOpen(true)}}> Add new task</Button>
        <Button variant="contained"> Filter</Button>
      </Box>
      <Divider />
      {
        viewType==='grid' && 
        <Board initial={sampleData} withScrollableColumns />
      }
      {
        viewType==='list' && 
        <List data={getListData()} columns={ListColumns} />
      }
      <TaskPopup isOpen={isTaskPopupOpen} onClose={handleTaskPopupClose} popupType={taskPopupType}/>
      
    </Box>
  );
}
