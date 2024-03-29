// CSS
import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// components
import { PostDetails } from "../../components/PostDetails";

export const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  // posts é a coleção de documents que está sendo trabalhada
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <div>
          <input
            type="text"
            placeholder="Ou busque por tags"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-dark">Pesquisar</button>
        </div>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post, i) => (
            <div key={post.id}>
              <PostDetails post={post} />
              <hr />
            </div>
          ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts!</p>
            <Link to="/posts/create" className="btn">
              Criar seu primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
