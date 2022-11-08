import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { logout } from "../../actions/auth";
import { useSelector } from "react-redux";
import navlistW from "./Items";
import logo from "../../images/fondo2.ico"
const Navigation = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    const start = <img alt="logo" src={logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    //const end = <InputText placeholder="Search" type="text" />;
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
        <header>
      {/*currentUser && currentUser.Rol === "Digitador" ? (
          <Menubar model={items} start={start} end={endL} />
        ): currentUser && currentUser.Rol === "Kardex" ? (
          <Menubar model={items} start={start} end={endL} />
        ): currentUser && currentUser.Rol === "Admin" ? (
          <Menubar model={items} start={start} end={endL} />
        ): !currentUser && (
          <Menubar model={items} start={start} end={end} />
        ) */}
              <Menubar model={navlistW} start={start}/>
        </header>
    );
}

export default Navigation;