import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import useAuthStore from "./store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import bg from "../../assets/bg-chat.svg";

interface RegistrationResponse {
  _id: string;
  username: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

const schema = z.object({
  username: z.string().min(5, { message: "Enter valid username." }),
  password: z.string().min(5, { message: "Enter valid password" }),
  email: z.string().email().min(5, { message: "Enter valid Email Address" }),
  name: z
    .string()
    .min(5, { message: "Name must be atleast 3 characters long" }),
  dateOfBirth: z.string(),
});

type formData = z.infer<typeof schema>;

const Registration = () => {
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
      .post<RegistrationResponse>("http://localhost:3000/api/users", {
        username: data.username,
        password: data.password,
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
      })
      .then((res) => {
        setAuthState({
          _id: res.data._id,
          username: res.data.username,
          name: res.data.name,
          email: res.data.email,
          dateOfBirth: res.data.dateOfBirth,
        });
        navigate("/app");
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
          <div className="col-12 py-4 px-5">
            <div className="row align-items-center">
              <div>
                <small>WindTalk</small>
              </div>
              <div className="header-text mb-4">
                <p className="fs-3 fw-bold">Sign Up</p>
              </div>

              {errorMessage && (
                <div className="invalid-feedback d-block">
                  <small>{errorMessage}</small>
                </div>
              )}

              {/* Email */}
              <div className="mb-3">
                <div className="input-group">
                  <input
                    {...register("email")}
                    type="email"
                    className={`form-control form-control-lg bg-light fs-6 ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email ID"
                  />
                </div>
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    <small>{errors.email.message}</small>
                  </div>
                )}
              </div>

              {/* Username */}
              <div className="mb-3">
                <div className="input-group">
                  <input
                    {...register("username")}
                    type="text"
                    className={`form-control form-control-lg bg-light fs-6 ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    placeholder="Unique Username"
                  />
                </div>
                {errors.username && (
                  <div className="invalid-feedback d-block">
                    <small>{errors.username.message}</small>
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="mb-3">
                <div className="input-group">
                  <input
                    {...register("name")}
                    type="text"
                    className={`form-control form-control-lg bg-light fs-6 ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Your Name"
                  />
                </div>
                {errors.name && (
                  <div className="invalid-feedback d-block">
                    <small>{errors.name.message}</small>
                  </div>
                )}
              </div>

              {/* Password */}
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

              {/* Date of Birth */}
              <div className="mb-3">
                <div className="input-group">
                  <input
                    {...register("dateOfBirth")}
                    type="date"
                    className={`form-control form-control-lg bg-light fs-6 ${
                      errors.dateOfBirth ? "is-invalid" : ""
                    }`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <div className="invalid-feedback d-block">
                    <small>{errors.dateOfBirth.message}</small>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="input-group mb-3">
                <button
                  className="btn btn-primary w-100 fs-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>
              </div>

              <div className="text-center">
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
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

export default Registration;
