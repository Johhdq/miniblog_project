import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { PostDetails } from "../../components/PostDetails";

export const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  // posts do usuário
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const deleteDocument = (id) => {};

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts!</p>
          <Link to="/posts/create" className="btn">
            Criar seu primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post, i) => (
              <div key={i}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${posts.id}`} className="btn btn-outline">
                    Ver post
                  </Link>
                  <Link className="btn btn-outline">Editar</Link>
                  <button
                    onClick={() => deleteDocument()}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
