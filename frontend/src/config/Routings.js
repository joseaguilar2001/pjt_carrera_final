import Index from "../screens/Index";
const routes = [
    {
        element: <Index.Kardex/>,
        path: "/kardex",
        isPrivate: true,
    },
    {
        element: <Index.Ejecutores/>,
        path: "/ejecutores",
        isPrivate: true,
    },
    {
        element: <Index.DeKardexScreen/>,
        path: "/dkardex",
        isPrivate: true,
    },
    {
        element: <Index.Lote />,
        isPrivate: true,
        path: "/lote",
    },
    {
        element: <Index.Permiso/>,
        path: "/permiso",
        isPrivate: true
    },
    {
        element: <Index.Presentacion/>,
        path: "/presentacion",
        isPrivate: true
    },
    {
        element: <Index.Producto/>,
        path: "/producto",
        isPrivate: true,
    },
    {
        element: <Index.Rol/>,
        path: "/rol",
        isPrivate: true,
    },
    {
        element: <Index.Servicios/>,
        path: "/servicio",
        isPrivate: true,
    },
    {
        element: <Index.Solicitantes/>,
        path: "/solicitantes",
        isPrivate: true,
    },
    {
        element: <Index.Usuario/>,
        path: "/usuario",
        isPrivate: true,
    },
    {
        element: <Index.Home/>,
        path: "/",
        isPrivate: false
    },
    {
        element: <Index.Login/>,
        path: "/login",
        isPrivate: false
    },
    {
        element: <Index.Signing/>,
        path: "register",
        isPrivate: false
    }
]

export default routes;