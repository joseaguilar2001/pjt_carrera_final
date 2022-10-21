import React, {createContext, useState, useEffect} from "react";
import { ProductoService } from "../services/ProductoService";

export const ProductoContext= createContext();

const ProductContextProvider=(props)=>{
    const productoService = new ProductoService();
    const [productos, setProductos] = useState([]);

    const [editProducto, setEditProducto] = useState(null);

    useEffect(() => {
        productoService.readAll().then(data=> setProductos(data));
    }, [productoService, productos]);

    const createProducto =(producto)=>{
        productoService
            .create(producto)
            .then(data=>setProductos(...productos, data));
    };

    const deleteProducto =(id)=>{
        productoService
            .delete(id)
            .then(()=>setProductos(productos.filter((p)=>p.id !== id)));
    };
    
    const findProducto =(id)=>{
        const producto = productos.find((p)=>p.id === id);

        setEditProducto(producto);
    };

    const updateProducto =(producto)=>{
        productoService
        .update(producto)
        .then((data)=>
            setProductos(
                producto.map(p=>p.id === producto.id ? data: producto)
            )
        );
        setEditProducto(null);
    };
    return(
        <ProductoContext.Provider 
            value={{
                createProducto,
                deleteProducto,
                findProducto,
                updateProducto,
                editProducto,
                productos
            }}>
            {props.children}
        </ProductoContext.Provider>
    );
};
export default ProductContextProvider;