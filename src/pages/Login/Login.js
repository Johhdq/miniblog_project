import styles from "./Login.module.css";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export const Login = () => {
  const [displayEmail, setDisplayEmail] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");
  const [error, setError] = useState("");

  const {
    error: authError,
    sucess: authSucess,
    loading,
    login,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email: displayEmail,
      password: displayPassword,
    };

    const res = login(user);
    console.log(res);
  };

  useEffect(() => {
    setError(authError);
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>
        Faça o <strong>login</strong> para continuar!
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="displayEmail"
            placeholder="email do usuário"
            onChange={(e) => setDisplayEmail(e.target.value)}
            required
            value={displayEmail}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="displayPassword"
            onChange={(e) => setDisplayPassword(e.target.value)}
            placeholder="senha do usuário"
            required
            value={displayPassword}
          />
        </label>
        <div>
          {!loading ? (
            <button className="btn" type="submit">
              Confirmar
            </button>
          ) : (
            <button type="submit" disabled>
              Aguarde...
            </button>
          )}
        </div>
        {error && <p className="animation error">{error}</p>}
        {authSucess && <p className="animation sucess">{authSucess}</p>}
      </form>
    </div>
  );
};
