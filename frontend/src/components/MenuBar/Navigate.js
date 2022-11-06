import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { logout } from "../../actions/auth";
import { useSelector } from "react-redux";
import navlist from "./Items";
const MenuBar = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    const  items = navlist;
    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;
    const endL = {
      label: "Info",
      icon: "pi pi-fw pi-users",
      items:[
      {item: <a href={"/login"} type="logout" onClick={logOut} >Salir</a>} ,
      {
        label: "Usuario",
        icon: "pi pi-fw pi-user",
        command: () => {
          window.location.href = "/user";
        }
      }]
    } 
    
    return (
      <div>
      {currentUser && currentUser.Rol === "Digitador" ? (
          <Menubar model={items} start={start} end={endL} />
        ): currentUser && currentUser.Rol === "Kardex" ? (
          <Menubar model={items} start={start} end={endL} />
        ): currentUser && currentUser.Rol === "Admin" ? (
          <Menubar model={items} start={start} end={endL} />
        ): !currentUser && (
          <Menubar model={items} start={start} end={end} />
        )}
      </div>
    );
}

export default MenuBar;