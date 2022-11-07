import Index from "../screens/Index";

const KARDEX = {
    component: Index.Kardex,
    path: "/kardex",
    isPrivate: true,
    isRol: "DG",
}

const EJECUTORES = {
    component: Index.Ejecutores,
    path: "/ejecutores",
    isPrivate: true,
    isRol: 2,
}

const DKARDEX = {
    component: Index.DKardex,
    path: "/dkardex",
    isPrivate: true
}

const LOTE = {
    component: Index.Lote,
    path: "/lote",
}

const PERMISOS = {
    component: Index.Permiso,
    path: "/permiso",
    isPrivate: true
}

const PRESENTACION = {
    component: Index.Presentacion,
    path: "/presentacion",
    isPrivate: true
}

const PRODUCTO = {
    component: Index.Producto,
    path: "/producto",
    isPrivate: true,
}

const ROL = {
    component: Index.Rol,
    path: "/rol",
    isPrivate: true,
}

const SERVICIOS = {
    component: Index.Servicios,
    path: "/servicio",
    isPrivate: true,
}

const SOLICITANTES = {
    component: Index.Solicitantes,
    path: "/solicitantes",
    isPrivate: true,
}

const USUARIO = {
    component: Index.Usuario,
    path: "/usuario",
    isPrivate: true,
} 

// eslint-disable-next-line import/no-anonymous-default-export
export default [KARDEX, EJECUTORES, DKARDEX, LOTE, PERMISOS, PRESENTACION, PRODUCTO, SERVICIOS, SOLICITANTES, USUARIO, ROL];