import Head from "next/head";
import styles from "../styles/Login.module.css";
import RegisterForm from "../components/registerForm";
import LoginForm from "../components/loginForm";
export default function Home() {
  return (
    <div className={styles.loginBody}>
      <RegisterForm />

      <LoginForm />
    </div>
  );
}
