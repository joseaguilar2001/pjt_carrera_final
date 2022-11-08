import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Menubar } from 'primereact/menubar';
import { SplitButton } from 'primereact/splitbutton';
import { logout } from "../../actions/auth";
import { useSelector } from "react-redux";
import navListAdmin from "./Items";
import navListKardex from "./Items";
import navListUsuario from "./Items";
import navlistDespechador from "./Items";
import navlistW from "./Items";
import { Button } from "bootstrap";
const Navigation = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    const items = [
      {
        label: "Inicio de Sesion", 
        icon: "pi pi-fw pi-user",
        command: () => {
          window.location.href = '/login';
        }
      },
      {
        label: "Registrarse", 
        icon: "pi pi-fw pi-sign-in",
        command: () => {
          window.location.href = '/register';
        }
      }
    ]
    const items2 = [
      {
        label: "Perfil", 
        icon: "pi pi-fw pi-user",
        command: () => {
          window.location.href = '/user';
        }
      },
      {
        label: "Salir", 
        icon: "pi pi-fw pi-sign-out",
        command: () => {
          window.location.onClick = logOut();
        }
      }
    ]
    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = <SplitButton className="mr-2 mb-2 p-button-rounded p-button-info" label="Inicio" model={items} />
    const end2 = <SplitButton className="mr-2 mb-2 p-button-rounded p-button-success" label="Inicio"  model={items2}></SplitButton>
    const end3 = <a onClick={logOut()} href="/login">Adios</a>
    return (
        <header>
      {currentUser && currentUser.Rol === "Administrador" ? (
          <Menubar model={navListAdmin} start={start} end={end2} />
        ): currentUser && currentUser.Rol === "Kardex" ? (
          <Menubar model={navListKardex} start={start} end={end2} />
        ): currentUser && currentUser.Rol === "Despachador" ? (
          <Menubar model={navlistDespechador} start={start} end={end2} />
        ): currentUser && currentUser.Rol === "Usuario" ? (
          <Menubar model={navListUsuario} start={start} end={end2} />
        ):(
          <Menubar model={navlistW} start={start} end={end2} />
        ) }
              {/*<Menubar model={navlistW} start={start} end={end}/>*/}
        </header>
    );
}

export default Navigation;