import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { SplitButton } from 'primereact/splitbutton';
import { logout } from "../../actions/auth";
import { useSelector } from "react-redux";
import { clearMessage } from "../../actions/message";
import logo from "../../images/fondo2.ico";
const Navigation = () => {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    let location = useLocation();
    useEffect(() => {
      if (["/login", "/register"].includes(location.pathname)) {
        dispatch(clearMessage()); // clear message when changing location
      }
    }, [dispatch, location]);
    useEffect(() => {
      if(currentUser){
  
      }else {
  
      }
    }, [currentUser]);
    /* Items */
    const navlistW = [
      {
        label: "Inicio", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/';
        }
      }
  ];
  
  const navlistDespachador = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      label: "Lote",
      icon: "pi pi-fw pi-car",
      command: () => {
        window.location.href = '/lote';
      },
    },
    {
      label: "Presentacion",
      icon: "pi pi-fw pi-briefcase",
      command: () => {
        window.location.href = '/presentacion';
      },
    },
    {
      label: "Requisicion",
      icon: "pi pi-fw pi-directions",
      command: () => {
        window.location.href = '/requision';
      },
    },
    {
      label: "Servicio",
      icon: "pi pi-fw pi-envelope",
      command: () => {
        window.location.href = '/servicios';
      },
    },
    {
      label: "Pedido",
      icon: "pi pi-fw pi-mobile",
      command: () => {
        window.location.href = '/pedido';
      },
    }
  ];
  
  const navListKardex = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      label: "Kardex",
      icon: "pi pi-fw pi-shopping-bag",
      command: () => {
        window.location.href = '/kardex';
      }
    },
      {
        label: "Detalle Kardex",
        icon: "pi pi-fw pi-shopping-cart",
        command: () => {
          window.location.href = '/detalleKardex/:id';
        },
      }
  ]
  
  const navListAdmin = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      label: "Registros", 
      icon: "pi pi-fw pi-compass",
      items:[
        {
          label: "Productos", 
          icon: "pi pi-fw pi-shopping-bag",
          command: () => {
            window.location.href = '/producto';
          }
        },
        {
          label: "Lote", 
          icon: "pi pi-fw pi-shopping-cart",
          command: () => {
            window.location.href = '/lote';
          }
        },
        {
          label: "Presentacion", 
          icon: "pi pi-fw pi-sitemap",
          command: () => {
            window.location.href = '/presentacion';
          }
        },
        {
          label: "Servicios", 
          icon: "pi pi-fw pi-sort",
          command: () => {
            window.location.href = '/servicios';
          }
        },
        {
          separator: true,
        },
        {
          label: "Solicitantes", 
          icon: "pi pi-fw pi-share-alt",
          command: () => {
            window.location.href = '/solicitantes';
          }
        },
        {
          label: "Ejecutores", 
          icon: "pi pi-fw pi-search",
          command: () => {
            window.location.href = '/ejecutores';
          }
        },
        {
          label: "Kardex", 
          icon: "pi pi-fw pi-spinner",
          command: () => {
            window.location.href = '/kardex';
          }
        },
        {
          label: "Detalle Kardex", 
          icon: "pi pi-fw pi-shopping-bag",
          command: () => {
            window.location.href = '/dkardex/:idK';
          }
        },
        {
          label: "Otros", 
          icon: "pi pi-fw pi-map-marker",
          items: [
            {
              label: "Pedidos", 
              icon: "pi pi-fw pi-plus",
              command: () => {
                window.location.href = '/pedido';
              }
            },
            {
              label: "Requisicion", 
              icon: "pi pi-fw pi-plus-circle",
              command: () => {
                window.location.href = '/requisicion';
              }
            },
            {
              label: "Roles", 
              icon: "pi pi-fw pi-bars",
              command: () => {
                window.location.href = '/rol';
              }
            }
          ]
        }
      ]
    },
    {
      label: "Reportes", 
      icon: "pi pi-fw pi-bolt",
      items:[
        {
          label: "Auditoria", 
          icon: "pi pi-fw pi-send",
          command: () => {
            window.location.href = '/auditoria';
          }
        },
        {
          label: "Vista", 
          icon: "pi pi-fw pi-eye",
          command: () => {
            window.location.href = '/vista';
          }
        },
        {
          label: "Suministros", 
          icon: "pi pi-fw pi-truck",
          command: () => {
            window.location.href = '/suministros';
          }
        }
      ]
    },
    {
      label: "Usuarios", 
      icon: "pi pi-fw pi-compass",
      items:[
        {
          label: "Inicio", 
          icon: "pi pi-fw pi-users",
          command: () => {
            window.location.href = '/usuarios';
          }
        }
      ]
    }
  ]
  
  const navListUsuario = [
      {
        label: "Inicio", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/';
        }
      },
      {
        label: "Requision", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/requisicion';
        }
      },
  ]
    /*Items 2 */
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
          window.location.href = '/profile';
        }
      },
      {
        label: "Salir", 
        icon: "pi pi-fw pi-sign-out",
        command: () => {
          window.location.href = '/profile';
          window.onclick = logOut();
        }
      }
    ]
    const start = <img alt="logo" src={logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
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
          <Menubar model={navlistDespachador} start={start} end={end2} />
        ): currentUser && currentUser==="Usuario" ?(
          <Menubar model={navListUsuario} start={start} end={end2} />
        ): (
          <Menubar model={navlistW} start={start} end={end} />
        )}
        </header>
    );
}

export default Navigation;