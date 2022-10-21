import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

import Presentacion from "./screens/PresentacionScreen";
import Producto from "./screens/ProductoScreen";

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
              <Link to={"/presentacion"} className="nav-link">
                Presentacion
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/producto"} className="nav-link">
                Producto
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
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/producto" element={<Producto />} />
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