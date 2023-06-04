import React, { createContext, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  subTasks: Todo[];
}

interface TodoContextData {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleAddTodo: (title: string) => void;
  handleAddSubTask: (newTodo: string, id: number) => void;
  completeTodo: (id: number) => void;
  completeSubTodo: (id: number, subId: number) => void;
  removeTodo: (id: number) => void;
  removeSubTodo: (id: number, subId: number) => void;
}

export const TodoContext = createContext<TodoContextData>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  handleAddTodo: () => {},
  handleAddSubTask: () => {},
  completeTodo: () => {},
  completeSubTodo: () => {},
  removeTodo: () => {},
  removeSubTodo: () => {},
});

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleAddTodo = (newTodo: string) => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo.trim(),
        subTasks: [],
        completed: false,
      };
      addTodo(newTodoItem);
    }
  };

  const handleAddSubTask = (newTodo: string, id: number) => {
    if (id !== null) {
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const newSubTask: Todo = {
          id: Date.now(),
          title: newTodo.trim(),
          subTasks: [],
          completed: false,
        };
        const updatedTodos = [...todos];
        updatedTodos[todoIndex] = {
          ...updatedTodos[todoIndex],
          subTasks: [...updatedTodos[todoIndex].subTasks, newSubTask],
        };
        setTodos(updatedTodos);
        //setShow(false);
      }
    }
  };

  const completeTodo = (id: number) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    setTodos(newTodos);
  };

  const completeSubTodo = (id: number, subId: number) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    const subTodoIndex = newTodos[todoIndex].subTasks.findIndex(
      (todo) => todo.id === subId
    );
    const subTodo = newTodos[todoIndex].subTasks[subTodoIndex];
    subTodo.completed = !subTodo.completed;

    setTodos(newTodos);
  };

  const removeTodo = (id: number) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  const removeSubTodo = (id: number, subId: number) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    const subTodoIndex = newTodos[todoIndex].subTasks.findIndex(
      (todo) => todo.id === subId
    );
    const subTodos = newTodos[todoIndex].subTasks;
    subTodos.splice(subTodoIndex, 1);
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        setTodos,
        handleAddTodo,
        handleAddSubTask,
        completeTodo,
        completeSubTodo,
        removeTodo,
        removeSubTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
