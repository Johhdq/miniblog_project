// hooks
import { useState, useEffect, useReducer } from "react";

import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

// Timestamp para saber a hora de criação de um dado
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

// caso de loading, documento inserido e o caso de erro
const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

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

  const updateDocument = async (uid, data) => {
    checkIfIsCancelledBeforeDispatch({
      type: "LOADING",
    });

    try {
      // pegando a referência do documento
      const docRef = await doc(db, docCollection, uid);
      const updatedDocument = await updateDoc(docRef, data);

      checkIfIsCancelledBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
      });
      setSucess("Edição efetuada com sucesso!");
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
  return { updateDocument, response, sucess };
};
