import React, {createContext, useState, useEffect, useMemo } from "react";
import { UsuarioService } from "../services/UsuarioServicio";

export const UsuarioContext = createContext();

const UsuarioContextProvider = (props)=>{
    const usuarioService = useMemo(() => new UsuarioService(), []);
    
    const [usuarios, setUsuario] = useState([]);

    const [editUsuario, setEditUsuario] = useState(null);

    useEffect(() => {
        usuarioService.readAll().then((data) => setUsuario(data));
        //console.log(productoService);
    }, [usuarioService, usuarios]);

    const createUsuario =(usuario)=>{
        usuarioService
            .create(usuario)
            .then((data)=>setUsuario([...usuarios, data]));
    };

    const deleteUsuario =(id)=>{
        usuarioService
            .delete(id)
            .then(()=>setUsuario(usuarios.filter((p)=>p.id !== id)));
    };
    
    const findUsuario =(id)=>{
        const usuario = usuarios.find((p)=>p.id === id);
        setEditUsuario(usuario);
    };

    const updateUsuario =(usuario)=>{
        usuarioService
        .update(usuario)
        .then((data)=>
            setUsuario(
                usuario.map((p)=>(p.id === usuario.id ? data: usuario))
            )
        );
        setEditUsuario(null);
    };
    return(
        <UsuarioContext.Provider 
            value={{
                createUsuario,
                deleteUsuario,
                findUsuario,
                updateUsuario,
                editUsuario,
                usuarios,
            }}>
            {props.children}
        </UsuarioContext.Provider>
    );
};
export default UsuarioContextProvider;