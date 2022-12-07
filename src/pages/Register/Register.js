import styles from "./Register.module.css";

import { useState, useEffect } from "react";

export const Register = () => {
  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias!</p>
      <form onSubmit={""}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="nome do usuário"
            required
            maxLength={60}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="displayEmail"
            placeholder="email do usuário"
            required
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="displayPassword"
            placeholder="senha do usuário"
            required
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="confirmPassword"
            name="displayConfirmPassword"
            placeholder="senha do usuário"
            required
          />
        </label>
        <input className="btn" type="submit" value="Confirmar" />
      </form>
    </div>
  );
};
