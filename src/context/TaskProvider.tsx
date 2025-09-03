import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/Task";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => { loadTasks(); }, []);
  useEffect(() => { saveTasks(tasks); }, [tasks]);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem("@tasks");
      if (stored) setTasks(JSON.parse(stored));
    } catch (err) { console.error("Failed to load tasks:", err); }
  };

  const saveTasks = async (tasks: Task[]) => {
    try { await AsyncStorage.setItem("@tasks", JSON.stringify(tasks)); } 
    catch (err) { console.error("Failed to save tasks:", err); }
  };

  const addTask = (task: Task) => setTasks(prev => [...prev, task]);

  const toggleTask = (id: string) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const updateTask = (updated: Task) =>
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));

  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
