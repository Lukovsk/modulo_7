import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  //   const MySwal = withReactContent(Swal);

  const handler = async (e) => {
    e.preventDefault();

    const registerData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/user/signup",
        registerData
      );
      // Para salvar o token como um cookie
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
      router.push("/tasks");
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };
  return (
    <div className="Form">
      <form className={styles.formulario}>
        <h1> Sign Up </h1>
        <label className={styles.label}>Nome:</label>
        <input
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="nome"
          name="nome"
          required
        />

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

        <button className={styles.button} onClick={handler}>
          Registrar-se
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
