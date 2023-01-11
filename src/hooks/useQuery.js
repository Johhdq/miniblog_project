import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useQuery = () => {
  // para pegar os parâmetros da url
  const { search } = useLocation();

  // o URLSearchParams vai buscar determinado parâmetro que eu especificar na busca
  // essa função só vai ser executada quando o search for alterado, por isso recebe ele no array de dependências
  return useMemo(() => new URLSearchParams(search), [search]);
};
