"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    Box,
    Typography,
    List,
    ListItem,
    IconButton,
    Tabs,
    Tab,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectChangeEvent } from '@mui/material/Select';
import EditTaskModal from '@/components/task/EditTaskModal';
import { useUserContext } from '@/app/context/UserContext';

interface Task {
    id: string;
    name: string;
    description: string;
    priority: string;
    status: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const { isLoggedIn } = useUserContext();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 4000); // Show loading for 4 seconds
    }, []);

    useEffect(() => {
        if (isLoggedIn && !loading) {
            loadTasks();
        }
    }, [isLoggedIn, loading]);

    const handleUpdateTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
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
        let updatedTasks = tasks.filter(task => {
            const matchesStatus = filter === 'All' || task.status === filter;
            const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
            const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesPriority && matchesSearch;
        });

        // Sort tasks: High priority first, then medium, then low, and completed tasks at the bottom
        updatedTasks = updatedTasks.sort((a, b) => {
            if (a.status === 'Completed' && b.status !== 'Completed') return 1;
            if (a.status !== 'Completed' && b.status === 'Completed') return -1;
            if (a.priority === 'High' && b.priority !== 'High') return -1;
            if (a.priority === 'Medium' && b.priority === 'Low') return -1;
            return 0;
        });

        setFilteredTasks(updatedTasks);
    }, [filter, priorityFilter, searchQuery, tasks]);

    useEffect(() => {
        filterTasks();
    }, [filterTasks]);

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTasks();
    };

    const toggleStatus = (id: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTasks();
    };

    const handleEditClick = (id: string) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setCurrentTask(taskToEdit);
            setOpenModal(true);
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentTask(null);
    };

    const handleFilterChange = (event: React.SyntheticEvent, newValue: string) => {
        setFilter(newValue);
    };

    const handlePriorityChange = (event: SelectChangeEvent<string>) => {
        setPriorityFilter(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High':
                return '#d32f2f'; // Red for high priority
            case 'Medium':
                return '#fbc02d'; // Yellow for medium priority
            case 'Low':
                return '#388e3c'; // Green for low priority
            default:
                return '#000000';
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'Completed' ? '#81c784' : '#ffeb3b'; // Light green for completed, yellow for pending
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isLoggedIn) {
        return (
            <Box sx={{ p: 4, minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Please log in to view your tasks.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => router.push('/login')}>
                    Login
                </Button>
            </Box>
        );
    }
 
    return (
        <Box sx={{ p: 4, minHeight: '80vh' }}>
            <Typography variant="h4" gutterBottom>
                Task List
            </Typography>

            <TextField
                label="Search Tasks"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <Tabs value={filter} onChange={handleFilterChange} sx={{ mb: 2 }}>
                <Tab label="All" value="All" />
                <Tab label="Pending" value="Pending" />
                <Tab label="Completed" value="Completed" />
            </Tabs>

            {filter === 'All' && (
                <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select value={priorityFilter} onChange={handlePriorityChange} label="Priority">
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
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
                    filteredTasks.map(task => (
                        <ListItem
                            key={task.id}
                            sx={{
                                borderBottom: '1px solid #ccc',
                                backgroundColor: task.status === 'Completed' ? getStatusColor(task.status) : 'transparent',
                                padding: '16px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}
                        >
                            <div className="flex justify-between w-full">
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: getPriorityColor(task.priority),
                                    }}
                                >
                                    {task.name}
                                </Typography>
                                <div className="flex gap-2">
                                    {task.status !== 'Completed' && (
                                        <IconButton onClick={() => handleEditClick(task.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => deleteTask(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Button onClick={() => toggleStatus(task.id)}>
                                        {task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                                    </Button>
                                </div>
                            </div>
                            <Typography sx={{ marginTop: '8px' }}>
                                {`Description: ${task.description}`}
                            </Typography>
                            <Typography
                                sx={{
                                    backgroundColor: getPriorityColor(task.priority),
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    marginTop: '8px',
                                }}
                            >
                                {`Priority: ${task.priority} | Status: ${task.status}`}
                            </Typography>
                        </ListItem>
                    ))
                )}
            </List>

            <EditTaskModal open={openModal} currentTask={currentTask} onClose={handleModalClose} onUpdate={handleUpdateTask} />
        </Box>
    );
};

export default TaskList;
