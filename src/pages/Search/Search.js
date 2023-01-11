// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// novo hook apenas para resgatar o valor da url, isso porque depois pode-se utilizar ele em outros locais também
import { useQuery } from "../../hooks/useQuery";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  return (
    <div>
      <h2>Search</h2>
      <p>{search}</p>
    </div>
  );
};
