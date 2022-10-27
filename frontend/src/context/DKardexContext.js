import React, {createContext, useState, useEffect, useMemo } from "react";
import { DKardexService } from "../services/DetalleKardex";
import { LoteService} from "../services/ProductoService";
import { KardexService } from "../services/PresentacionService";

export const DKardexContext = createContext();

const DeKardexContextProvider = (props)=>{
    const dKardexService = useMemo(() => new DKardexService(), []);
    const loteService = useMemo(() => new LoteService(), []);
    const kardexService = useMemo(() => new KardexService(), []);

    const [dsKardex, setDsKardex] = useState([]);
    const [lote, setLote] = useState([]);
    const [kardex, setKardex] = useState([]);

    const [editDeKardex, setEditDeKardex] = useState(null);

    useEffect(() => {
        dKardexService.readAll().then((data) => setDsKardex(data));
        loteService.readAll().then((data) => setLote(data));
        kardexService.readAll().then((data) => setKardex(data));
    }, [dKardexService, dsKardex]);

    const createDeKardex =(lote)=>{
        dKardexService
            .create(lote)
            .then((data)=>setDsKardex([...dsKardex, data]));
    };

    const deleteDeKardex =(id)=>{
        dKardexService
            .delete(id)
            .then(()=>setDsKardex(dsKardex.filter((p)=>p.id !== id)));
    };
    
    const findDeKardex =(id)=>{
        const dKardex = dsKardex.find((p)=>p.id === id);
        setEditDeKardex(dKardex);
    };

    const updateDeKardex =(dkardex)=>{
        dKardexService
        .update(dkardex)
        .then((data)=>
            setDsKardex(
                dkardex.map((p)=>(p.id === dkardex.id ? data: dkardex))
            )
        );
        setEditDeKardex(null);
    };
    return(
        <DKardexContext.Provider 
            value={{
                createDeKardex,
                deleteDeKardex,
                findDeKardex,
                updateDeKardex,
                editDeKardex,
                dsKardex,
                lote,
                kardex
            }}>
            {props.children}
        </DKardexContext.Provider>
    );
};
export default DeKardexContextProvider;