// Importing React library
import React from "react";

// Importing Redux hooks for dispatching actions and reading state
import { useDispatch, useSelector } from "react-redux";

// Importing react-hook-form utilities for handling form inputs and validation
import { useForm } from "react-hook-form";

// Importing the async thunk that handles the login API request
import { loginUser } from "../Thunk/LoginThunk";

// Main Login Component
export default function Login() {

    // Initialize Redux dispatch function
    const dispatch = useDispatch();

    // Extract required values from auth slice in Redux store
    const { loading, error, message, user, token } = useSelector((state) => state.auth);

    // -------------------------------
    // React Hook Form Initialization
    // -------------------------------
    const {
        register,          // used for binding form inputs
        handleSubmit,      // wraps submit function to handle validation
        formState: { errors }  // contains validation error messages
    } = useForm();

    // ------------------------------------------
    // Function to run after form submission
    // ------------------------------------------
    const onSubmitLogics = (data) => {
        // Constructing object with email & password
        const userData = {
            email: data.email,
            password: data.password
        };

        // Dispatching login thunk to handle API request
        dispatch(loginUser(userData));
    };

    // Logging user and token to check authentication status
    console.log(user);
    console.log(token);

    return (
        <div
            style={{
                width: "300px",
                margin: "50px auto",
                padding: "20px",
                border: "1px solid black",
            }}
        >
            <h2>Login</h2>

            {/* Form starts here */}
            <form onSubmit={handleSubmit(onSubmitLogics)}>

                {/* ---------------- Email Input ---------------- */}
                <input
                    type="email"
                    placeholder="Enter Email"
                    {...register("email", {
                        required: "Email is required", // validation rule
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // email regex
                            message: "Enter a valid email",
                        },
                    })}
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                {/* Email Validation Error */}
                {errors.email && (
                    <p style={{ color: "red", marginTop: "-5px" }}>
                        {errors.email.message}
                    </p>
                )}

                {/* ---------------- Password Input ---------------- */}
                <input
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", {
                        required: "Password is required", // validation rule
                        minLength: {
                            value: 4,
                            message: "Password must be at least 4 characters",
                        },
                    })}
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                {/* Password Validation Error */}
                {errors.password && (
                    <p style={{ color: "red", marginTop: "-5px" }}>
                        {errors.password.message}
                    </p>
                )}

                {/* ---------------- Submit Button ---------------- */}
                <button
                    type="submit"
                    style={{ width: "100%", padding: "10px" }}
                >
                    {/* Show loading text while logging in */}
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* ---------------- Auth Messages ---------------- */}

            {/* API success or info message */}
            {message && <p style={{ marginTop: "10px" }}>{message}</p>}

            {/* API error message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Show user info after successful login */}
            {user && (
                <div style={{ marginTop: "10px", color: "green" }}>
                    <p>Welcome: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}
