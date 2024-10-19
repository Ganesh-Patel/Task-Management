
"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Task } from '@/components/task/AddNewTask';
import { Button, Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Tabs, Tab, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('');

  useEffect(() => {
    loadTasks();
  }, []);



  const loadTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  const filterTasks = useCallback(() => {
    const updatedTasks = tasks.filter(task => {
      const matchesStatus = filter === 'All' || task.status === filter;
      const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
      return matchesStatus && matchesPriority;
    });
    setFilteredTasks(updatedTasks);
  }, [filter, priorityFilter, tasks]); 

  useEffect(() => {
    filterTasks();
  }, [filterTasks]); 

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleStatus = (index: number) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (index: number) => {
    console.log('Edit Task:', tasks[index]);
    // Implement task editing logic
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'black';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? 'green' : 'yellow';
  };

  const handleFilterChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
  };

  const handlePriorityChange = (event: SelectChangeEvent<string>) => { // Change the type here
    setPriorityFilter(event.target.value);
  };

  return (
    <Box sx={{ p: 4, minHeight: '80vh' }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <Tabs value={filter} onChange={handleFilterChange} sx={{ mb: 2 }}>
        <Tab label="All" value="All" />
        <Tab label="Pending" value="Pending" />
        <Tab label="Completed" value="Completed" />
      </Tabs>

      {filter === 'All' && (
        <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            onChange={handlePriorityChange}
            label="Priority"
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
      )}

      <List>
        {filteredTasks.length === 0 ? (
          <Typography>No tasks available.</Typography>
        ) : (
          filteredTasks.map((task, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #ccc', backgroundColor: task.status === 'Completed' ? getStatusColor(task.status) : 'transparent' }}>
              <ListItemText
                primary={task.name}
                secondary={
                  <Typography sx={{ color: getPriorityColor(task.priority) }}>
                    {`Description: ${task.description} | Priority: ${task.priority} | Status: ${task.status}`}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                {task.status === 'Completed' ? (
                  <IconButton edge="end" onClick={() => deleteTask(index)}>
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <>
                    <IconButton edge="end" onClick={() => editTask(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => deleteTask(index)}>
                      <DeleteIcon />
                    </IconButton>
                    <Button onClick={() => toggleStatus(index)}>
                      {task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                    </Button>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default TaskList;
