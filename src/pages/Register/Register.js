import styles from "./Register.module.css";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // como eu já tenho um estado error eu vou chamar esse de authError
  const {
    createUser,
    error: authError,
    sucess: authSucess,
    loading,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName: displayName,
      email: displayEmail,
      password: displayPassword,
    };

    if (displayPassword !== displayConfirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    setError(authError);
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="nome do usuário"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            maxLength={60}
          />
        </label>
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
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="displayConfirmPassword"
            onChange={(e) => setDisplayConfirmPassword(e.target.value)}
            placeholder="senha do usuário"
            required
            value={displayConfirmPassword}
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
