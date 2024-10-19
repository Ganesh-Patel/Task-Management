// TaskContext.tsx
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Task = {
    id: string,
    name: string;
    description: string;
    priority: string;
    status: string; // 'Pending' or 'Completed'
};

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (taskName: string) => void;
    toggleTaskStatus: (taskName: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    };

    const addTask = (newTask: Task) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const updateTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map(task => task.name === updatedTask.name ? updatedTask : task);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const deleteTask = (taskName: string) => {
        const updatedTasks = tasks.filter(task => task.name !== taskName);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const toggleTaskStatus = (taskName: string) => {
        const updatedTasks = tasks.map(task =>
            task.name === taskName ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskStatus }}>
            {children}
        </TaskContext.Provider>
    );
};
