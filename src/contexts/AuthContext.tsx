import React, { createContext, useContext, useState } from "react";
import { users } from "../server/users";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "./TodoContext";
import { IUser } from "../types/types";

interface User {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: (data: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const { setTodos } = useContext(TodoContext);
  const navigate = useNavigate();

  const login = (data: User) => {
    const user = users.find((user: IUser) => user.email === data.email);
    if (user && user.password === data.password) {
      localStorage.setItem("token", JSON.stringify(user.token));
      setUser(user);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setTodos([]);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
