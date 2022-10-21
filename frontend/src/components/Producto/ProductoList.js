import React, {useContext} from "react";
import { ProductoContext } from "../../context/ProductoContext";

const ProductoForm=(props)=>{
    const productos = useContext(ProductoContext);
    return(<div>
        <table className="table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>Unidad de Medida</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {productos.map(producto => (
                    <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.unidadMedida}</td>
                        <td>{producto.estado ? 'Activo':'Inactivo'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>);
}
export default ProductoForm;