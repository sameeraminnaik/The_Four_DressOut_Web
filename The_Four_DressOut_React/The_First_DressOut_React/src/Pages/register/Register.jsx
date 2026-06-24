import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import logo from "../../assets/logo.png";
import video from "../../assets/registerVideo.mp4";
import { registerUser } from "../../Services/authService";
import { useAuth } from "../../Contexts/AuthContext";

const Register = () => {
  const {register, authError, authLoading} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(formData.password)) {
      newErrors.password = "Min 8 chars, at least 1 number and 1 special character (!@#$%^&*)";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.container}>

        <div className={style.videoContainer}>
          <video src={video} type="video/mp4" autoPlay loop muted />
        </div>

        <div className={style.formSection}>

          <div className={style.header}>
            <img src={logo} alt="Logo" />
            <h1>Register here</h1>
          </div>

          <form className={style.formContainer} onSubmit={handleSubmit}>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className={errors.firstName ? style.errorInput : style.formInput}
            />
            {errors.firstName && <span className={style.error}>{errors.firstName}</span>}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className={errors.lastName ? style.errorInput : style.formInput}
            />
            {errors.lastName && <span className={style.error}>{errors.lastName}</span>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className={errors.email ? style.errorInput : style.formInput}
            />
            {errors.email && <span className={style.error}>{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={errors.password ? style.errorInput : style.formInput}
            />
            {errors.password && <span className={style.error}>{errors.password}</span>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className={errors.confirmPassword ? style.errorInput : style.formInput}
            />
            {errors.confirmPassword && <span className={style.error}>{errors.confirmPassword}</span>}

            <button type="submit" className={style.registerButton} disabled={loading}>
              {loading ? "Please wait..." : "Register"}
            </button>

          </form>

          <div className={style.footerLinks}>
            <a className={style.termsLink}>Terms of use</a>
            <a className={style.privacyLink}>Privacy policy</a>
          </div>

          <p className={style.switch}>
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default Register;