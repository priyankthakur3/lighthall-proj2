import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import '../styles/Layout.css';

import { useState } from "react";

export default function TaskPopup({ isOpen, popupType, onClose }) {

    const [taskStatus, setTaskStatus] = useState('todo');


    const handleClose = () => {
        onClose();
    };

    const handleStatusChange = (event) => {
        setTaskStatus(event.target.value);
    };


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{popupType === 'create' ? 'Create Task' : 'Update Task'}</DialogTitle>
            <DialogContent className="task-popup-container">
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                />
                <TextField
                    label="Description"
                    multiline
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Task status</InputLabel>
                    <Select
                        value={taskStatus}
                        label="Task Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value='todo'>To Do</MenuItem>
                        <MenuItem value='progress'>In Progress</MenuItem>
                        <MenuItem value='waitlist'>Waitlist</MenuItem>
                        <MenuItem value='completed'>Completed</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Basic date time picker" />
                </LocalizationProvider>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>{popupType === 'create' ? 'Create' : 'Update'}</Button>
            </DialogActions>
        </Dialog>
    )
}