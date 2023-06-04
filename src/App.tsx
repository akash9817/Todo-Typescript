import React from "react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Routes from "./routes"
import { TodoProvider } from "./contexts/TodoContext"

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
        <Routes />
        </TodoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App