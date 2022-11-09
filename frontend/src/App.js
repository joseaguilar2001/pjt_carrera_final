import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if(currentUser){

    }else {

    }
  }, [currentUser]);
  return (
    <div className="App">
      <Navigation />
      <div className="container mt-3">
        <Routes>
          <Route 
            path="/" 
            element={<Home />}
          />
          <Route 
            path="/home" 
            element={<Home />} 
          />
          <Route 
            path="/register"  
            element={ 
              !currentUser ? (<ReactFinalFormDemo/>):
              (<Navigate to="/"/>
            )} 
          />
          <Route 
            path="/login" 
            element={ 
              !currentUser ? (<Login />):
              (<Navigate to="/" />
            )} 
          />
          <Route 
            path="/producto" 
            element={ 
              currentUser ? (<Producto />):
              (<Navigate to="/" />
              )} 
          />
          <Route 
            path="/lote" 
            element={ 
              currentUser && (currentUser.Rol === "Despachador" || currentUser.Rol === "Administrador") ? (<Lote />):
              (<Navigate to="/" />
            )} 
          />
          <Route 
            path="/presentacion" 
            element={
            currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Despachador") ? (<Presentacion />):
             (<Navigate to="/"/>)
            } 
          />
          <Route 
            path="/servicios" 
            element={
            currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Despachador")?(<Servicios />):
            (<Navigate to="/" />)
            } 
          />
          <Route 
            path="/auditoria" 
            element={
              currentUser && currentUser.Rol === "Administrador"?(<Auditoria />):
              (<Navigate to="/"/>)
            } 
          />
          <Route 
            path="/solicitantes" 
            element={
              currentUser && currentUser.Rol === "Administrador"?(<Solicitantes />):
              (<Navigate to="/"/>)
            } 
          />
          <Route 
            path="/ejecutores" 
            element={
              currentUser && currentUser.Rol === "Administrador"?(<Ejecutores />):
              (<Navigate to="/"/>)
          } 
          />
          <Route 
            path="/kardex" 
            element={
              currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Kardex")?(<Kardexs />):
              (<Navigate to="/" />)
          } 
          />
          <Route 
            path="/dkardex/:idK"  
            element={
              currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Kardex")?(<DKardexs />):
              (<Navigate to="/" />)
            } 
          />
          <Route 
            path="/pedido" 
            element={
              currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Despachador")?(<Pedido />):
              (<Navigate to="/"/>)
            } 
          />
          <Route 
            path="/pedido/:idP" 
            element={
              currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Despachador")?(<DPedido />):
              (<Navigate to="/" />)
            } 
          />
          <Route 
          path="/requisicion" 
          element={
            currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Usuario")?(<Requisicion />):
            (<Navigate to="/" />)
          } 
          />
          <Route 
            path="/requisicion/:idR" 
            element={
              currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Usuario")?(<DRequisicion />):
              (<Navigate to="/" />)
          } 
          />
          <Route 
            path="/requisicionreporte/:idR" 
            element={
              currentUser && (currentUser.Rol === "Administrador" || currentUser.Rol === "Despachador")?(<ReporteRequisicion />):
              (<Navigate to="/" />)
            }
          />
          <Route 
            path="/profile" 
            element={
              currentUser?(<Profile />):
              (<Navigate to="/" />)
            } 
          />
          <Route 
            path="/usuarios" 
            element={
              currentUser && currentUser.Rol === "Administrador"?(<Usuario />):
              (<Navigate/>)
            } 
          />
          <Route 
            path="/rol" 
            element={
              currentUser && currentUser.Rol === "Administrador"?(<Rol />):
              (<Navigate/>)
            } 
          />
          <Route 
            path="/vista" 
            element={
              currentUser && currentUser.Rol === "Administrador"?(<VistaTable />):
              (<Navigate />)
            } 
          />
          <Route 
            path="/suministros" 
            element={
              currentUser && currentUser.Rol === "Administrador"?(<VistaTableSum />):
              (<Navigate />)
            } 
          /> 
        </Routes>
      </div>
    </div>
  );
};

export default App; 