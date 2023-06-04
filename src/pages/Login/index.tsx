import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUser } from "../../helper";

type IFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const { login, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    login(data);
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-light">
      <form className="card p-4 w-25" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            {...register("email", {
              required: true,
              pattern: /\S+@\S+\.\S+/,
            })}
          />
          {errors.email?.type === "required" && (
            <p className="mt-2 text-danger" role="alert">
              Email is required
            </p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="mt-2 text-danger" role="alert">
              Invalid Email
            </p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="mt-2 text-danger" role="alert">
              Password is required
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
