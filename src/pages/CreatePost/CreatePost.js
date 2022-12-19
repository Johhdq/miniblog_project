import styles from "./CreatePost.module.css";

// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>
        Escreva sobre o que quiser compartilhar e <strong>compartilhe</strong> o
        seu conhecimento
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            placeholder="Digite..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            placeholder="URL da imagem a ser adicionada"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            placeholder="Digite aqui o conteúdo do seu post"
            cols="30"
            rows="10"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Insira uma tag que representa o seu post"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            required
          />
        </label>
        <div>
          <button className="btn" type="submit">
            Publicar
          </button>
        </div>
        {/* <div>
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
        {authSucess && <p className="animation sucess">{authSucess}</p>} */}
      </form>
    </div>
  );
};
