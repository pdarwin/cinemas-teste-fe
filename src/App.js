import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Componentes/NavBar";
import MyModal from "./Componentes/MyModal";
import { useReducer } from "react";
import { initialState, ModalReducer } from "./Componentes/ModalReducer";
import CustomContext from "./Componentes/CustomContext";
import Atores from "./Componentes/Atores";
import Cinemas from "./Componentes/Cinemas";
import MyViewer from "./Componentes/MyViewer";
import Filmes from "./Componentes/Filmes";

function App() {
  const [modalState, modalDispatch] = useReducer(ModalReducer, initialState);

  const providerState = {
    modalState,
    modalDispatch,
  };

  return (
    <div className="App">
      <CustomContext.Provider value={providerState}>
        <BrowserRouter>
          <MyModal />
          <NavBar />
          <Routes>
            <Route path="/" element={<Cinemas />} />
            <Route path="/atores" element={<Atores />} />
            <Route path="/filmes" element={<Filmes />} />
            <Route
              path="/filmesporcinema/:id"
              element={<MyViewer type="FilmesCinema" />}
            />
            <Route
              path="/filmesporator/:id"
              element={<MyViewer type="FilmesCinema" />}
            />
          </Routes>
        </BrowserRouter>
      </CustomContext.Provider>
    </div>
  );
}

export default App;
