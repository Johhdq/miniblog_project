// hooks
import { useState, useEffect, useReducer } from "react";

import { db } from "../firebase/config";

// Timestamp para saber a hora de criação de um dado
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

// caso de loading, documento inserido e o caso de erro
const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const [sucess, setSucess] = useState(null);

  const checkIfIsCancelledBeforeDispatch = (action) => {
    // if (!cancelled) {
    //   dispatch(action);
    // }
    dispatch(action);

    console.log("aqui");
  };

  const deleteDocument = async (id) => {
    try {
      // pegar a referência do documento para depois excluir
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      checkIfIsCancelledBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
      setSucess("Exclusão efetuada com sucesso!");

      setTimeout(() => {
        setSucess(null);
      }, "2000");
    } catch (error) {
      checkIfIsCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  // useEffect(() => {
  //   return () => setCancelled(true);
  // }, []);

  // vai ser retornado a função para poder ser executada e também a responsa do reducer
  return { deleteDocument, response, sucess };
};
