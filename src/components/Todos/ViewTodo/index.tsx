import React, { useState } from "react";

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  subTasks: ITodo[];
}

interface IViewTodo {
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  completeSubTodo: (id: number, subId: number) => void;
  removeSubTodo: (id: number, subId: number) => void;
  id: number;
  todo: ITodo;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTodoId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ViewTodo: React.FC<IViewTodo> = ({
  completeTodo,
  removeTodo,
  completeSubTodo,
  removeSubTodo,
  setShow,
  setSelectedTodoId,
  todo,
  id,
}) => {
  const handleClick = () => {
    setShow(true);
    setSelectedTodoId(todo.id);
  };

  return (
    <div className="just-padding" style={{ fontSize: "20px" }} key={todo.id}>
      <div className="list-group list-group-root well">
        <li className="list-group-item">
          <div className="d-flex justify-content-between p-1">
            <div>
              <input
                className="form-check-input me-3"
                type="checkbox"
                value=""
                aria-label="..."
                onChange={() => completeTodo(id)}
              />
              <span
                style={{ textDecoration: todo.completed ? "line-through" : "" }}
              >
                {todo.title}
              </span>
            </div>
            <div className="d-flex align-items-center">
              {todo.subTasks.length > 0 && (
                <a
                  href={`#item-${id}`}
                  style={{ fontSize: "10px" }}
                  className=" text-decoration-none border-0 bg-transparent shadow-none accordion-button p-1 me-3 collapsed"
                  data-bs-target={`#item-${id}`}
                  aria-expanded="false"
                  aria-controls={`#item-${id}`}
                  data-bs-toggle="collapse"
                ></a>
              )}

              {!todo.completed ? (
                <i
                  role="button"
                  onClick={() => handleClick()}
                  className="fa-sharp fa-solid fa-plus"
                ></i>
              ) : (
                <i
                  role="button"
                  className="fa-sharp fa-solid fa-xmark"
                  onClick={() => removeTodo(id)}
                ></i>
              )}
            </div>
          </div>
        </li>

        <div className="list-group collapse" id={`item-${id}`}>
          {todo.subTasks.map((sub) => (
            <div
              className="d-flex justify-content-between list-group-item"
              key={`${todo.id}-${sub.id}`}
            >
              <div className=" ps-5">
                <input
                  className="form-check-input me-3"
                  type="checkbox"
                  value=""
                  aria-label="..."
                  onChange={() => completeSubTodo(id, sub.id)}
                />
                <span
                  style={{
                    textDecoration: sub.completed ? "line-through" : "",
                  }}
                >
                  {sub.title}
                </span>
              </div>
              {sub.completed && (
                <i
                  role="button"
                  className="fa-sharp fa-solid fa-xmark mt-2"
                  onClick={() => removeSubTodo(id, sub.id)}
                ></i>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTodo;
