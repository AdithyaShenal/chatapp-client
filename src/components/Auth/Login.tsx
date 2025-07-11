import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import useAuthStore from "./store";
import bg from "../../assets/bg-chat.svg";

interface LoginResponse {
  _id: string;
  username: string;
  name: string;
  email: string;
  dateOfBirth: string;
  validation: string;
}

const schema = z.object({
  username: z.string().min(3, { message: "Enter valid username." }),
  password: z.string().min(3, { message: "Enter valid password" }),
});

type formData = z.infer<typeof schema>;

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthState } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: formData) => {
    setIsSubmitting(true);
    axios
      .post<LoginResponse>("http://localhost:3000/api/auth", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.data.validation === "successful") {
          setAuthState({
            _id: res.data._id,
            username: res.data.username,
            name: res.data.name,
            email: res.data.email,
            dateOfBirth: res.data.dateOfBirth,
          });
          navigate("/app");
        }
      })
      .catch((err) =>
        setErrorMessage(
          err.response?.data || "Something went wrong. Please try again."
        )
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="container d-flex justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="row border rounded-5 p-3 bg-white shadow w-100"
          style={{ maxWidth: "430px" }}
        >
          {/* Right Box */}
          <div className="col-12  py-4 px-5">
            <div className="row align-items-center">
              <div>
                <small>WindTalk</small>
              </div>
              <div className="header-text mb-4">
                <p className="fs-3 fw-bold">
                  Holla,
                  <br />
                  Welcome Back
                </p>
              </div>
              {errorMessage && (
                <div className="invalid-feedback d-block">
                  <small>{errorMessage}</small>
                </div>
              )}
              <div className="mb-3">
                <div className="input-group">
                  <input
                    {...register("username")}
                    type="text"
                    className={`form-control form-control-lg bg-light fs-6 ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    placeholder="Username"
                  />
                </div>
                {errors.username && (
                  <div className="invalid-feedback d-block">
                    <small>{errors.username.message}</small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <input
                    {...register("password")}
                    type="password"
                    className={`form-control form-control-lg bg-light fs-6 ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                  />
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    <small>{errors.password.message}</small>
                  </div>
                )}
              </div>

              <div className="input-group mb-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  id="formCheck"
                />

                <label
                  htmlFor="formCheck"
                  className="form-check-label text-secondary"
                >
                  <small>Remember Me</small>
                </label>
              </div>

              <div className="input-group mb-3">
                <button
                  className="btn btn-primary w-100 fs-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Login"}
                </button>
              </div>

              <div className="text-center">
                <small>
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-decoration-none">
                    Sign Up
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
