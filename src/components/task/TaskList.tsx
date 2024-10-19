
"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Task } from '@/components/task/AddNewTask';
import EditTaskModal from '@/components/task/EditTaskModal';
import { Button, Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Tabs, Tab, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);


    useEffect(() => {
        loadTasks();
    }, []);

    const handleUpdateTask = (updatedTask: Task) => {
        console.log('update task is called  here ')
        const updatedTasks = tasks.map(task => task.name === updatedTask.name ? updatedTask : task);
        console.log('updated task is ', updatedTask)
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTasks();
    };



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

    const handleEditClick = (index: number) => {
        setCurrentTask(tasks[index]);
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentTask(null);
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
                        <ListItem
                            key={index}
                            sx={{
                                borderBottom: '1px solid #ccc',
                                backgroundColor: task.status === 'Completed' ? getStatusColor(task.status) : 'transparent',
                                padding: '16px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                display: 'flex',
                                flexDirection: 'column', // Stack elements vertically
                                alignItems: 'flex-start' // Align items to the start
                            }}
                        >
                            <div className="flex justify-between w-full">
                                <h3 className="text-lg font-medium">{task.name}</h3>
                                <div className="flex gap-1 sm:gap-3">
                                    {task.status === 'Completed' ? (
                                        <IconButton edge="end" onClick={() => deleteTask(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton edge="end" onClick={() => handleEditClick(index)}>
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
                                </div>
                            </div>

                            {/* Status Indicator as Typography */}
                            <Typography
                                variant="body2"
                                sx={{
                                    backgroundColor: getStatusColor(task.status),
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    display: 'inline-block',
                                    marginTop: '8px'
                                }}
                            >
                                {task.status}
                            </Typography>

                            <Typography sx={{ color: getPriorityColor(task.priority) }} className="mt-1">
                                {`Description: ${task.description} | Priority: ${task.priority}`}
                            </Typography>

                            <Typography className="mt-1 text-sm text-slate-600">
                                {`Status: ${task.status}`}
                            </Typography>
                        </ListItem>
                    ))
                )}
            </List>


            {/* Include the EditTaskModal here */}
            <EditTaskModal
                open={openModal}
                currentTask={currentTask}
                onClose={handleModalClose}
                onUpdate={handleUpdateTask}
            />
        </Box>
    );
};

export default TaskList;
