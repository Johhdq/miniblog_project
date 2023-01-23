// hooks
import { useState, useEffect } from "react";

import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

// com o search vai ser feita uma busca baseada nas tags do post
// passa a doc collection porque o usuário precisa informar a coleção de onde ele deseja resgatar os dados
export const useFetchDocument = (docCollection, id, isEdition = false) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (!isEdition) return;

      try {
        // agora é preciso pegar a referência do document
        // tem que ser passado o id do document
        const docRef = await doc(db, docCollection, id);

        // vai ter o snap do document, é algo mais individual
        const docSnap = await getDoc(docRef);
        setDocument(docSnap.data());

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }

    }

    // só vai ser executada quando algum dos elementos do array de dependências mudar
    setLoading(true);
    loadDocument();
  }, [docCollection, cancelled, id]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
