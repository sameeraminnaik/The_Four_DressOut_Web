import React, { useState } from "react";
import style from "./Login.module.css";
import logo from "../../assets/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import {loginUser} from "../../Services/authService";
import { useAuth } from "../../Contexts/AuthContext";

const Login = () => {
  const {login, authError, authLoading} = useAuth();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setloading(true);
      const data = await loginUser(formData.email, formData.password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);

      alert(`Welcome back, ${data.name}!`);
      navigate("/");
    } catch (error) {
      alert(error.response?.data || "Invalid email or password");
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="login form"
          />
        </div>

        <form className={style.formContainer} onSubmit={handleLogin}> 
          <span className={style.logo}>
            <img src={logo} alt="Logo" />
          </span>

          <h5 className={style.formTitle}>Sign into your account</h5>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={errors.email ? style.errorInput : style.formInput}
          />
          {authError && <span className={style.error}>{authError}</span>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={errors.password ? style.errorInput : style.formInput}
          />
          {authError && <span className={style.error}>{authError}</span>}

          <button type="submit" className={style.loginButton} disabled={authLoading} >
            {authLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className={style.addOptions}>
            <a className={style.forgotPassword}>Forgot password?</a>
            <p>
              Don't have an account?{" "}
              <NavLink className={style.registerLink} to="/register">
                Register here
              </NavLink>
            </p>
          </div>

          <div className={style.footerLinks}>
            <a className={style.termsLink}>Terms of use</a>
            <a className={style.privacyLink}>Privacy policy</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
