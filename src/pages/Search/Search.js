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
    <div>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts através da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </>
        )}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};
