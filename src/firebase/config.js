import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAseTtkQ8Rf2A1qMsg8lbmKQAHRZaP7Xlg",
  authDomain: "miniblogproject-2835d.firebaseapp.com",
  projectId: "miniblogproject-2835d",
  storageBucket: "miniblogproject-2835d.appspot.com",
  messagingSenderId: "171939054101",
  appId: "1:171939054101:web:ea3421a27bb22ca1ae841c",
  measurementId: "G-R965T7MMG4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/*Inicializando o banco de dados da firestore que é onde vamos armazenar nossos dados*/
const db = getFirestore(app);

/*Exportando o banco de dados para ser utilizado em outros lugares*/
export { db };
