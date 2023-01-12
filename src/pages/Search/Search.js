import styles from "./Search.module.css";

// hooks
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// novo hook apenas para resgatar o valor da url, isso porque depois pode-se utilizar ele em outros locais também
import { useQuery } from "../../hooks/useQuery";

// components
import { PostDetails } from "../../components/PostDetails";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_result}>
      <h2>Resultado da Pesquisa</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p className={styles.noposts_text}>
              Não foram encontrados posts através da sua busca...
            </p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        <div>
          {posts && posts.length === 1 && (
            <PostDetails key={posts[0].id} post={posts[0]} />
          )}
          {posts &&
            posts.length > 1 &&
            posts.map((post) => (
              <>
                <PostDetails key={post.id} post={post} />
                <hr />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};
