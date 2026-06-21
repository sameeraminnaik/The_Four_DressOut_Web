import React from "react";
import style from "./Login.module.css";
import logo from "../../assets/logo.png";

const Login = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="login form"
          />
        </div>

        <div className={style.formContainer}>
          <span className={style.logo}>
            <img src={logo} alt="Logo" />
          </span>

          <h5 className={style.formTitle}>Sign into your account</h5>

          <input type="email" placeholder="Email" className={style.formInput}  />
          <input
            type="password"
            placeholder="Password"
            className={style.formInput}
            
          />

          <button className={style.loginButton}>Login</button>

          <div className={style.addOptions}>
            <a className={style.forgotPassword}>Forgot password?</a>
            <p>
              Don't have an account?{" "}
              <a className={style.registerLink} href="/register">
                Register here
              </a>
            </p>
          </div>

          <div className={style.footerLinks}>
            <a className={style.termsLink}>Terms of use</a>
            <a className={style.privacyLink}>Privacy policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
