import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { Task } from './AddNewTask'; 

interface EditTaskModalProps {
  open: boolean;
  currentTask: Task | null;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, currentTask, onClose, onUpdate }) => {
  const [taskDetails, setTaskDetails] = useState<Task | null>(currentTask);

  useEffect(() => {
    if (open) {
      setTaskDetails(currentTask); 
    }
  }, [open, currentTask]);

  const handleUpdateTask = () => {
    if (taskDetails) {
      onUpdate(taskDetails);
      onClose(); 
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="edit-task-dialog-title" aria-describedby="edit-task-dialog-description">
      <DialogTitle id="edit-task-dialog-title">Edit Task</DialogTitle>
      <DialogContent>
        {taskDetails && (
          <Box component="form" noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Task Name"
              value={taskDetails.name}
              onChange={(e) => setTaskDetails({ ...taskDetails, name: e.target.value })}
              inputProps={{ 'aria-label': 'Task Name' }} // Accessibility
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              value={taskDetails.description}
              onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
              inputProps={{ 'aria-label': 'Description' }} // Accessibility
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                value={taskDetails.priority}
                onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
                inputProps={{ 'aria-label': 'Task Priority' }} // Accessibility
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={taskDetails.status}
                onChange={(e) => setTaskDetails({ ...taskDetails, status: e.target.value })}
                inputProps={{ 'aria-label': 'Task Status' }} // Accessibility
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <Button onClick={handleUpdateTask} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
