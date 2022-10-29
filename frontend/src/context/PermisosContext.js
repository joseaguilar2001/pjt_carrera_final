import React, {createContext, useState, useEffect, useMemo } from "react";
import { PermisosService } from "../services/PermisosService";
import { RolService } from "../services/RolService";


export const PermisosContext = createContext();

const PermisosContextProvider = (props) => {

    const rolService = useMemo(() => new RolService(), []);
    const permisosService = useMemo(() => new PermisosService(), []);

    const [permisos, setPermisos] = useState([]);
    const [roles, setRoles ] = useState([]);
    const [editPermisos, setEditPermisos] = useState(null);

    useEffect(() => {
        rolService.readAll().then((data) => setRoles(data));
        permisosService.readAll().then((data) => setPermisos(data));
    }, [rolService, permisos, permisosService]);

    const createPermisos =(permiso)=>{
        permisosService
            .create(permiso)
            .then((data)=>setPermisos([...permisos, data]));
    };

    const deletePermiso = (id) => {
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
        <PermisosContext.Provider 
            value={{
                createPermisos,
                deletePermiso,
                findPermiso,
                updatePermiso,
                editPermisos,
                permisos,
                roles
            }}>
            {props.children}
        </PermisosContext.Provider>
    );
};
export default PermisosContextProvider;