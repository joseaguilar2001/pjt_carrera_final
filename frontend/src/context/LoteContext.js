import React, {createContext, useState, useEffect, useMemo } from "react";
import { LoteService } from "../services/LoteService";
import { ProductoService} from "../services/ProductoService";
import { PresentacionService} from "../services/PresentacionService";

export const LoteContext = createContext();

const LoteContextProvider = (props)=>{
    const loteService = useMemo(() => new LoteService(), []);
    const productoService = useMemo(() => new ProductoService(), []);
    const presentacionService = useMemo(() => new PresentacionService(), []);

    const [lotes, setLotes] = useState([]);
    const [producto, setProducto] = useState([]);
    const [presentacion, setPresentacion] = useState([]);

    const [editLote, setEditLote] = useState(null);

    useEffect(() => {
        loteService.readAll().then((data) => setLotes(data));
        productoService.readAll().then((data) => setProducto(data));
        presentacionService.readAll().then((data) => setPresentacion(data));
        
    }, [loteService, lotes]);

    const createLote =(lote)=>{
        loteService
            .create(lote)
            .then((data)=>setLotes([...lotes, data]));
    };

    const deleteLote =(id)=>{
        loteService
            .delete(id)
            .then(()=>setLotes(lotes.filter((p)=>p.id !== id)));
    };
    
    const findLote =(id)=>{
        const lote = lotes.find((p)=>p.id === id);
        setEditLote(lote);
    };

    const updateLote =(lote)=>{
        loteService
        .update(lote)
        .then((data)=>
            setLotes(
                lote.map((p)=>(p.id === lote.id ? data: lote))
            )
        );
        setEditLote(null);
    };
    return(
        <LoteContext.Provider 
            value={{
                createLote,
                deleteLote,
                findLote,
                updateLote,
                editLote,
                lotes,
                producto,
                presentacion
            }}>
            {props.children}
        </LoteContext.Provider>
    );
};
export default LoteContextProvider;