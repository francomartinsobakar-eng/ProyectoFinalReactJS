import './App.css'
import Layout from './Componentes/Layout/Layout'
import { Routes, Route } from 'react-router-dom';
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';
import ProductoDetalle from './Componentes/ProductoDetalle/ProductoDetalle';
import Carrito from './Componentes/Carrito/Carrito';
import Presentacion from './Componentes/PresentacionInicio/Presentacion';
import FormularioContainer from './Componentes/Formulario/FormularioContainer';
import Gestion from './Componentes/Gestion/Gestion';
import Login from './Componentes/Login/Login';
import Registro from './Componentes/Registro/Registro';
import ProtectedRoute from './Componentes/ProtectedRoute/ProtectedRoue';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Presentacion />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/agregar-producto" element={<FormularioContainer />} />
        <Route path="/Gestion" element={<ProtectedRoute rolesPermitidos={['admin']}>
          <Gestion />
        </ProtectedRoute>} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
    </SearchProvider>
  );
}

export default App;
