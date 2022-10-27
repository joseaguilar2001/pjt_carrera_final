import React, {createContext, useState, useEffect, useMemo } from "react";
import { PermisosService } from "../services/PermisosService";

export const RolContext = createContext();

const PermisosContextProvider = (props)=>{
    const permisosService = useMemo(() => new PermisosService(), []);
    
    const [permisos, setPermisos] = useState([]);

    const [editPermisos, setEditPermisos] = useState(null);

    useEffect(() => {
        permisosService.readAll().then((data) => setPermisos(data));
        //console.log(productoService);
    }, [permisosService, permisos]);

    const createPermisos =(permiso)=>{
        permisosService
            .create(permiso)
            .then((data)=>setPermisos([...permisos, data]));
    };

    const deletePermiso =(id)=>{
        permisosService
            .delete(id)
            .then(()=>setPermisos(permisos.filter((p)=>p.id !== id)));
    };
    
    const findPermiso =(id)=>{
        const permiso = permisos.find((p)=>p.id === id);
        setEditPermisos(permiso);
    };

    const updatePermiso =(permiso)=>{
        permisosService
        .update(permiso)
        .then((data)=>
            setPermisos(
                permisos.map((p)=>(p.id === permiso.id ? data: permiso))
            )
        );
        setEditPermisos(null);
    };
    return(
        <PermisosContextProvider.Provider 
            value={{
                createPermisos,
                deletePermiso,
                findPermiso,
                updatePermiso,
                editPermisos,
                permisos,
            }}>
            {props.children}
        </PermisosContextProvider.Provider>
    );
};
export default PermisosContextProvider;