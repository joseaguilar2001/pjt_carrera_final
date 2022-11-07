import React, {createContext, useState, useEffect, useMemo } from "react";
import { ERequisicionService } from "../services/ERequisicionService";
import { DERequisicionService } from "../services/DERequisicionService";

export const ERequisicionContext = createContext();

const ProductContextProvider = (props)=>{
    const erequisicionService = useMemo(() => new ERequisicionService(), []);
    const derequisicionService = useMemo(() => new DERequisicionService(), []);
    
    const [erequisicions, setErequisicions] = useState([]);
    const [derequisicions, setDErequisicions] = useState([]);

    useEffect(() => {
        erequisicionService.readAll().then((data) => setErequisicions(data));
        derequisicionService.readAll().then((data) => setDErequisicions(data));
    }, [erequisicionService, derequisicionService, derequisicions, erequisicions]);


    return(
        <ERequisicionContext.Provider 
            value={{
                erequisicions,
                derequisicions
            }}>
            {props.children}
        </ERequisicionContext.Provider>
    );
};
export default ProductContextProvider;