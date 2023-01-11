// hooks
import { useState, useEffect } from "react";

import { db } from "../firebase/config";
import {
  query,
  orderBy,
  onSnapshot,
  where,
  collection,
} from "firebase/firestore";

export const useFetchDocument = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);
      // vai trazer a referência da collection
      const collectionRef = await collection(db, docCollection);

      try {
        let q;
        // vai pegar todos os dados com a data de criação de forma decrescente
        q = await query(collectionRef, orderBy("createdAt", "desc"));

        // vai pegar os nossos dados e ver se tem diferença com a coleção, se tiver traz eles pra gente
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }

    // só vai ser executada quando algum dos elementos do array de dependências mudar
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
