import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import logo from "../../assets/logo.png";
import video from "../../assets/registerVideo.mp4";

const Register = () => {
  const navigate = useNavigate()
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
    if (!formData.lastNametName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

     if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(formData.password)) {
      newErrors.password = 'Min 8 chars, at least 1 number and 1 special character (!@#$%^&*)'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if(Object.keys(newErrors).length > 0 ){
      setErrors (newErrors)
      return 
    }

    try{
      setLoading(true);
      await registerUser(formData);
      alert("Account created successfully");
      navigate('/login');
    }
    catch{
      
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

          <div className={style.formContainer}>
            <input
              type="text"
              placeholder="FirstName"
              className={style.formInput}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="LastName"
              className={style.formInput}
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email"
              className={style.formInput}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              className={style.formInput}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className={style.formInput}
              onChange={handleChange}
            />

            <button className={style.registerButton} onClick={handleSubmit}>
              Register
            </button>
          </div>

          <div className={style.footerLinks}>
            <a className={style.termsLink}>Terms of use</a>
            <a className={style.privacyLink}>Privacy policy</a>
          </div>
        </div>
      </div>
      <p className={style.switch}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default Register;
