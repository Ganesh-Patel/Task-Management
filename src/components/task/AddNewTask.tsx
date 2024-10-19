// src/components/TaskModal.tsx
import React, { useState, FormEvent } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// Define the shape of the task data
export interface Task {
  name: string;
  description: string;
  priority: string;
  status: string;
}

// Define the props for the TaskModal component
interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, handleClose }) => {
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskPriority, setTaskPriority] = useState<string>('Medium');
  const [taskStatus, setTaskStatus] = useState<string>('Pending');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: Task = {
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      status: taskStatus,
    };

    saveTask(newTask);
    resetForm();
    handleClose();
  };

  const saveTask = (task: Task) => {
    // Retrieve existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    // Add the new task to the existing tasks
    tasks.push(task);
    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskPriority('Medium');
    setTaskStatus('Pending');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <h2 className="text-teal-500 text-2xl text-center">Create Task</h2>
        <form onSubmit={handleSubmit}>
          <InputLabel htmlFor="task-name">Title</InputLabel>
          <FormControl fullWidth margin="none">
            <TextField
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              fullWidth
              variant="outlined"
              margin="dense"
            />
          </FormControl>
          <InputLabel htmlFor="task-description">Description</InputLabel>
          <FormControl fullWidth margin="none">
            <TextField
              id="task-description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              margin="dense"
            />
          </FormControl>
          <InputLabel id="priority-label">Priority</InputLabel>
          <FormControl fullWidth margin="none">
            <Select
              labelId="priority-label"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              required
              fullWidth
              variant="outlined"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <InputLabel id="status-label">Status</InputLabel>
          <FormControl fullWidth margin="none">
            <Select
              labelId="status-label"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              required
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <div className="flex justify-between mt-4 gap-4">
            <Button
              type="submit"
              variant="contained"
              className="bg-teal-500 hover:bg-teal-600 transition duration-200"
            >
              Create
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

// Style for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  color: 'black', // Text color
};

export default TaskModal;
