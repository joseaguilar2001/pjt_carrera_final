import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Login from "./components/Login";
import Register from "./components/Register";
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

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import AddUser from "./components/Usuario/AddUser";
import UsuarioList from "./components/Usuario/ListUser";
import Usuario from "./components/Usuario/Usuario";

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
    if (currentUser) {
    } else {
    }
  }, [currentUser]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Hospital
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/lote"} className="nav-link">
              Productos
            </Link>
          </li>
          <li className="nav-item">
              <Link to={"/servicios"} className="nav-link">
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/solicitantes"} className="nav-link">
                Solicitantes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/ejecutores"} className="nav-link">
                Ejecutores
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/kardex"} className="nav-link">
                Kardex
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/pedido"} className="nav-link">
                Pedido
              </Link>
            </li>
          <li className="nav-item">
            <Link to={"/usuarios"} className="nav-link">
              Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adduser"} className="nav-link">
              Añadir
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
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Login />} />
          <Route exact path="/producto" element={<Producto />} />
          <Route path="/lote" element={<Lote />} />
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/solicitantes" element={<Solicitantes />} />
          <Route path="/ejecutores" element={<Ejecutores />} />
          <Route path="/kardex" element={<Kardexs />} />
          <Route path="/dkardex/:idK" element={<DKardexs />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/usuarios" element={<UsuarioList />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/usuarios/:id" element={<Usuario />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;