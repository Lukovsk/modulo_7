import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const MySwal = withReactContent(Swal);

  const handlerLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        loginData
      );
      console.log("Login bem-sucedido: ", response.data["acess token"]);
      console.log("Login bem-sucedido: ", response.data["user_id"]);
      Cookies.set("token", response.data["acess token"], {
        expires: 5 / 24 / 60,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("author", response.data["user_id"], {
        expires: 5 / 24 / 60,
        secure: true,
        sameSite: "strict",
      });
      router.push("/dash");
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div className="Form">
      <form className={styles.formulario}>
        <h1> Login </h1>
        <label className={styles.label}>Email:</label>
        <input
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
          name="email"
          required
        />

        <label className={styles.label}>Senha:</label>
        <input
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          required
        />

        <button className={styles.button} type="submit" onClick={handlerLogin}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
