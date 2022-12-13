import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// vai mapear se a autenticação do usuário foi feita com sucesso
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// pages
import { Home } from "./pages/Home/Home";
import { About } from "./pages/About/About";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";

// components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// context
import { AuthProvider } from "./context/AuthContext";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { Dashboard } from "./pages/Dashboard/Dashboard";

function App() {
  // começa como undefined porque ainda não vai ter usuário na sessão atual
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/*estamos tralhando com uma hierarquia de rotas no caso*/}
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
