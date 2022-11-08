import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'primereact/resources/primereact.min.css';
import Navigation from "./components/MenuBar/Navigate";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Presentacion from "./screens/PresentacionScreen";
import Producto from "./screens/ProductoScreen";
import Lote from "./screens/LoteScreen";
import Servicios from "./screens/ServiciosScreen";
import Ejecutores from "./screens/EjecutoresScreen";
import Solicitantes from "./screens/SolicitantesScreen";
import Kardexs from "./screens/KardexsScreen";
import DKardexs from "./screens/DKardexScreen";
import Pedido from "./screens/PedidoScreen";
import DPedido from "./screens/DPedidoScreen";
import Requisicion from "./screens/RequisicionScreen";
import DRequisicion from "./screens/DRequisicionScreen";
import Auditoria from "./screens/AuditoriaScreen";

import ReporteRequisicion from "./screens/ReporteRequisicionScreen";
import VistaTable from "./components/Vistas/vistaPedidos";
import VistaTableSum from "./components/Vistas/suministrosVistas";
import Usuario from "./screens/UsuarioScreen";
import Rol from "./screens/RolScreen";
import Permisos from "./screens/PermisosScreen";

import ReactFinalFormDemo from "./components/Register"; 

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if(currentUser){

    }else {

    }
  }, [currentUser]);


  return (
    <div className="App">
      <Navigation />
{/*      <Navbar bg="white" expand="lg">
        <Container>
        <Link to={"/"} className="navbar-brand">
        <i class="fa fa-solid fa-hospital"></i>
          Hospital
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
            <i class="fa fa-fw fa-home"></i>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/lote"} className="nav-link">
            <i class="fa-regular fa-truck-fast"></i>
              Lote
            </Link>
          </li>
            <li className="nav-item">
              <Link to={"/auditoria"} className="nav-link">
                Auditoria
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/reporterequisicion"} className="nav-link">
                Reporte Requisicion
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/kardex"} className="nav-link">
              <i class="fa-sharp fa-solid fa-cart-shopping"></i>
                Kardex
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/pedido"} className="nav-link">
                Pedido
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/requisicion"} className="nav-link">
                Requisicion
              </Link>
            </li>
          <li className="nav-item">
            <Link to={"/usuarios"} className="nav-link">
              Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/permiso"} className="nav-link">
              Permisos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/rol"} className="nav-link">
              Roles
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Usuario
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
              <i class="fa fa-fw fa-user"></i>
                Login
              </Link>
            </li>

            <li className="nav-item">
            <i class="fa-sharp fa-solid fa-user-vneck"></i>
              <Link to={"/register"} className="nav-link">
              <i class="fa fa-light fa-user"></i>
                Sign Up
              </Link>
            </li>
          </div>
        )}
        </Container>
        </Navbar>*/}

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<ReactFinalFormDemo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/producto" element={<Producto />} />
          <Route path="/lote" element={<Lote />} />
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/auditoria" element={<Auditoria />} />
          <Route path="/solicitantes" element={<Solicitantes />} />
          <Route path="/ejecutores" element={<Ejecutores />} />
          <Route path="/kardex" element={<Kardexs />} />
          <Route path="/dkardex/:idK" element={<DKardexs />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/pedido/:idP" element={<DPedido />} />
          <Route path="/requisicion" element={<Requisicion />} />
          <Route path="/requisicion/:idR" element={<DRequisicion />} />
          <Route path="/requisicionreporte/:idR" element={<ReporteRequisicion />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/usuarios" element={<Usuario />} />
          <Route path="/permiso" element={<Permisos />} />
          <Route path="/rol" element={<Rol />} />
          <Route path="/vista" element={<VistaTable />} />
        <Route path="/suministros" element={<VistaTableSum />} /> 

        </Routes>
      </div>

    </div>
  );
};

export default App;