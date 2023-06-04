import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import { TodoContext } from "../../contexts/TodoContext";
import CreateTodo from "../../components/Todos/CreateTodo";
import ViewTodo from "../../components/Todos/ViewTodo";
import Modal from "../../components/Modal";
import { AuthContext } from "../../contexts/AuthContext";

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);
  const {
    todos,
    handleAddTodo,
    completeTodo,
    completeSubTodo,
    removeTodo,
    removeSubTodo,
    handleAddSubTask,
  } = useContext(TodoContext);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center">
        <div className={"w-50 h-100 mt-4"}>
          <CreateTodo
            addTodo={handleAddTodo}
            handleClose={() => setShow(false)}
          />
          <div className="mt-5">
            {todos.map((todo) => (
              <ViewTodo
                key={todo.id}
                todo={todo}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                id={todo.id}
                setShow={setShow}
                completeSubTodo={completeSubTodo}
                removeSubTodo={removeSubTodo}
                setSelectedTodoId={setSelectedTodoId}
              />
            ))}
          </div>
        </div>
        {show && (
          <Modal showModal={true} handleClose={() => setShow(false)}>
            <CreateTodo
              addSubTodo={handleAddSubTask}
              todoId={selectedTodoId}
              handleClose={() => setShow(false)}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Home;
