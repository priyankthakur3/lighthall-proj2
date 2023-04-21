import React, { useState, useEffect, useRef } from "react";
import {
  Box, Button, Divider, ToggleButton, ToggleButtonGroup, IconButton
} from "@mui/material";
import Board from "../components/Board";
import { getData, getListData } from "../utils/mockData";
import Header from "../components/Header";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import '../styles/Layout.css';
import List from "../components/List";
import TaskPopup from "../components/TaskPopup";
import { backendCall } from "../utils/network";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';



export default function Task() {


  const sampleData = getData();
  const [viewType, setViewType] = React.useState('list');
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [taskPopupType, setTaskPopupType] = useState('create');
  const [token, setToken] = useState('');
  const [taskData, setTaskData] = useState([]);
  const [updateTaskData, setUpdateTaskData] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  let originalTaskData = useRef([]);


  const handleViewChange = (event, newViewType) => {
    setViewType(newViewType);
  };

  const handleTaskPopupClose = () => {
    setIsTaskPopupOpen(false);
  }
  const handleUpdateTaskClose = () => {
    setIsUpdateOpen(false);
  }

  useEffect(() => {

    let userToken = localStorage.getItem('token');
    if (userToken == null || userToken == '') {
      window.location = '/login';
    }

    setToken(userToken);

    const getTaskData = async (userToken) => {
      try {
        let response = await backendCall.get('/tasks/getall', {
          headers: {
            'token': userToken
          }
        });
        let data = response.data;
        let taskData = data.taskData.map((task) => {
          task.id = task._id;
          return task;
        });
        originalTaskData.current = taskData;
        setTaskData(originalTaskData.current);
      } catch (err) {
        console.log('err : ', err);
      }
    }

    getTaskData(userToken);

  }, []);

  const onTaskCreate = async (curTaskData) => {
    try {
      let response = await backendCall.post('/tasks/create', curTaskData, {
        headers: {
          'token': token
        }
      });
      //empty the filter Options
      let newTaskData = response.data.taskData[0];
      newTaskData.id = newTaskData._id;
      let newTaskList = [...taskData];
      newTaskList.push(newTaskData);
      originalTaskData.current = newTaskList;
      setTaskData(newTaskList);
      setIsTaskPopupOpen(false);
    } catch (err) {
      console.error('error in creating : ', err);
    }


  }

  const handleTaskUpdate = (taskId) => {
    let taskList = [...originalTaskData.current];
    
    let curTaskData = taskList.filter((task) => (task.id === taskId))[0];
    setUpdateTaskData(curTaskData);
    setIsUpdateOpen(true);
  }

  const onTaskUpdate = async (curTaskData) => {
    try {
      let response = await backendCall.put('/tasks/update', curTaskData, {
        headers: {
          'token': token
        }
      });
      if (response.data.updated) {
        let newTaskList = [...originalTaskData.current];
        newTaskList = newTaskList.map((task) => {
          if (task.id === curTaskData.taskID) {
            return {
              id: curTaskData.taskID,
              ...curTaskData
            };
          }
          return task;
        });
        originalTaskData.current = newTaskList;
        setTaskData(newTaskList);
      }
      setIsUpdateOpen(false);

    } catch (err) {
      console.error('error in creating : ', err);
    }
  }

  const onTaskUpdateStatus = async (taskStatusData) => {
    try {
      let response = await backendCall.put('/tasks/updateStatus', taskStatusData, {
        headers: {
          'token': token
        }
      });
      let newTaskList = [...originalTaskData.current];
      newTaskList = newTaskList.map((task) => {
        if (task.id == taskStatusData.taskID) {
          task.taskStatus = taskStatusData.taskStatus;
        }
        return task;
      });
      originalTaskData.current = newTaskList;
      
      setTaskData(newTaskList);

    } catch (err) {
      console.error('error in creating : ', err);
    }
  }

  const handleTaskDelete = async (taskId) => {
    let response = await backendCall.delete('/tasks/delete',
      {
        data: {
          taskID: taskId
        },
        headers: {
          'token': token
        }
      });
    if (response.data.deleted) {
      let newTaskList = [...originalTaskData.current];
      newTaskList = newTaskList.filter((task) => (task.id !== taskId));
      originalTaskData.current = newTaskList;
      setTaskData(newTaskList);
    }
  }


  const ListColumns = [
    { field: 'taskTitle', headerName: 'Title', flex: 3, headerClassName : 'list-header' },
    { field: 'taskDesc', headerName: 'Description', flex: 4, headerClassName : 'list-header' },
    { field: 'taskStatus', headerName: 'Status', flex: 2, headerClassName : 'list-header' },
    {
      field: 'taskDue', headerName: 'Due Date',headerClassName : 'list-header', flex: 2, valueFormatter: (params) => {
        return dayjs(new Date(+params.value * 1000)).format('MM/DD/YYYY');
      }
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName : 'list-header',
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <IconButton variant="contained" size="small" onClick={() => { handleTaskUpdate(params.row.id) }}><EditIcon /></IconButton>
            <IconButton variant="contained" size="small" onClick={() => { handleTaskDelete(params.row.id) }}><DeleteIcon /></IconButton>
          </Stack>
        );
      },
    }
  ];

  return (
    <Box sx={{
      height: "100%"
    }}>
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
        <Button variant="contained" onClick={() => { setIsTaskPopupOpen(true) }}> Add new task</Button>
        <Button variant="contained"> Filter</Button>
      </Box>
      <Divider />
      {
        viewType === 'grid' &&
        <Board initial={sampleData} data={taskData} withScrollableColumns onDelete={handleTaskDelete} onUpdate={handleTaskUpdate} onTaskUpdateStatus={onTaskUpdateStatus} />
      }
      {
        viewType === 'list' &&
        <List data={taskData} columns={ListColumns} />
      }
      <TaskPopup isOpen={isTaskPopupOpen} onClose={handleTaskPopupClose} popupType={taskPopupType} onCreate={onTaskCreate} />
      <TaskPopup isOpen={isUpdateOpen} onClose={handleUpdateTaskClose} popupType='update' onUpdate={onTaskUpdate} taskData={updateTaskData} />

    </Box>
  );
}
