// hooks
import { useState, useEffect, useReducer } from "react";

import { db } from "../firebase/config";

// Timestamp para saber a hora de criação de um dado
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

// caso de loading, documento inserido e o caso de erro
const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

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

  const insertDocument = async (document) => {
    try {
      checkIfIsCancelledBeforeDispatch({
        type: "LOADING",
      });

      // pega os dados que estamos passando para essa função, no caso o document e adiciona mais a propriedade createAt com a data de criação desse documento
      const newDocument = { ...document, createAt: Timestamp.now() };

      // o collection() vai procurar no banco a coleção que foi passada como argumento da função
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkIfIsCancelledBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
      setSucess("Cadastro efetuado com sucesso!");

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
  return { insertDocument, response, sucess };
};
