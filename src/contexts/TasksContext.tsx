import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { taskService } from "../services/tasks";
import { useAuth } from "../features/auth/useAuth";

export interface TaskContextData {
  tasks: Task[];
  createTask: (attributes: Omit<Task, "id">) => Promise<void>;
  updateTask: (
    id: string,
    attributes: Partial<Omit<Task, "id">>
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TasksContext = createContext({} as TaskContextData);

interface TaskContextProviderProps {
  children: ReactNode;
}

export const TaskContextProvider: React.FC<TaskContextProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user?.id) {
      taskService.fetchTasksByUserId(user.id).then((data) => {
        setTasks(data);
      });
    }
  }, [user?.id]);

  const createTask = async (attributes: Omit<Task, "id">) => {
    if (!user?.id) return;
    const newTask = await taskService.createTask({
      ...attributes,
      userId: user.id,
    });
    setTasks((currentState) => [...currentState, newTask]);
  };

  const updateTask = async (
    id: string,
    attributes: Partial<Omit<Task, "id">>
  ) => {
    await taskService.updateTask(id, attributes);
    setTasks((currentState) => {
      const updatedTasks = [...currentState];
      const taskIndex = updatedTasks.findIndex((task) => task.id === id);
      Object.assign(updatedTasks[taskIndex], attributes);
      return updatedTasks;
    });
  };

  const deleteTask = async (id: string) => {
    await taskService.deleteTask(id);
    setTasks((currentState) => currentState.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
