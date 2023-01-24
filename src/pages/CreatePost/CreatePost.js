import styles from "./CreatePost.module.css";

// hooks
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useEffect } from "react";

export const CreatePost = ({ isEdition }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const {
    insertDocument,
    response,
    sucess: authSucess,
  } = useInsertDocument("posts");

  const navigate = useNavigate();

  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id, isEdition);

  useEffect(() => {
    const setValues = (body, image, title, tags) => {
      setBody(body || "");
      setImage(image || "");
      setTitle(title || "");
      setTags(tags || []);
    };

    if (isEdition && post) {
      let tags = "";
      post.tagsArray.map((tag) => (tags += ` #${tag}`));

      setValues(post.body, post.image, post.title, tags);
    } else {
      setValues();
    }
  }, [post, isEdition]);

  const callFunctionValidateUrl = (image) => {
    if (!validateUrl(image)) {
      return false;
    }
    return true;
  };

  const validateUrl = (image) => {
    try {
      new URL(image);
      return true;
    } catch (error) {
      console.log("entrou no catch");
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validar image URL
    if (image !== "") {
      if (!validateUrl(image)) {
        setFormError("A imagem precisa ser uma URL válida!");
        return;
      }
    }

    // criar array de tags
    // padronizar todas as tags minúsculo
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if (!tags || !title || !body) {
      setFormError("Por favor, preencha os campos necessários!");
      return;
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>{isEdition ? "Editando post" : "Criando post"}</h2>
      {isEdition ? (
        <p>Altere os dados do post como desejar</p>
      ) : (
        <p>
          Escreva sobre o que quiser compartilhar e <strong>compartilhe</strong>{" "}
          o seu conhecimento
        </p>
      )}
      <p></p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            placeholder="Digite..."
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
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
            value={image || ""}
          />
        </label>
        {image && callFunctionValidateUrl(image) && (
          <div>
            <span className={styles.preview_title}>Preview da Imagem:</span>
            <img className={styles.image_preview} src={image} alt={title} />
          </div>
        )}
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            placeholder="Digite aqui o conteúdo do seu post"
            cols="30"
            rows="10"
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
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
            value={tags || ""}
            required
          />
        </label>
        <div>
          {!response.loading ? (
            <button className="btn" type="submit">
              Confirmar
            </button>
          ) : (
            <button type="submit" disabled>
              Aguarde...
            </button>
          )}
        </div>
        {response.error && <p className="animation error">{response.error}</p>}
        {formError && <p className="animation error">{formError}</p>}
        {authSucess && <p className="animation sucess">{authSucess}</p>}
      </form>
    </div>
  );
};
