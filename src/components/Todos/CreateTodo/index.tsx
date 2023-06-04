import React from "react";
import { useForm } from "react-hook-form";

interface ITodoField {
  title: string;
}

interface ICreateTodo {
  addTodo?: (newTodo: string) => void;
  addSubTodo?: (newTodo: string, id: number) => void;
  todoId?: number | null;
  handleClose: () => void;
}

const CreateTodo: React.FC<ICreateTodo> = ({
  addTodo,
  todoId,
  addSubTodo,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITodoField>();

  const onSubmit = (newTodo: ITodoField) => {
    if (newTodo.title.trim() !== "") {
      if (todoId && addSubTodo) {
        addSubTodo(newTodo.title, todoId);
      } else if (addTodo) {
        addTodo(newTodo.title);
      }
      reset();
      handleClose();
    }
  };

  return (
    <form
      className="d-flex align-items-baseline"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-100 me-3">
        <input
          type="text"
          className="form-control me-3"
          {...register("title", {
            required: true,
          })}
        />
        {errors.title?.type === "required" && (
          <p className="mt-2 text-danger" role="alert">
            Required
          </p>
        )}
      </div>
      <input className="btn btn-primary" type="submit" value="Add" />
    </form>
  );
};

export default CreateTodo;
