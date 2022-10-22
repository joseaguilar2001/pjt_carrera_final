import React, {useContext, useState, useEffect} from "react";
import { ProductoContext } from "../../context/ProductoContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
//import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';

const ProductoForm=(props)=>{
    const {isVisible, setIsVisible} = props;

    const {
        createProducto,
        deleteProducto,
        editProducto,
        updateProducto
    } = useContext(ProductoContext);

    const inicialProductosState ={
        id:null,
        nombre:"",
        unidadMedida:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [productoData, setProductoData] = useState(inicialProductosState);

    useEffect(() => {
        if (editProducto) setProductoData(editProducto);
    }, [editProducto]);

    const updateField = (data, field) =>{
        setProductoData({
            ...productoData,
            [field]:data
        })
        console.log(productoData);
    };

    const saveProducto = () => {
        if (!editProducto) {
            createProducto(productoData);
        } else {
            updateProducto(productoData);
        }
        setProductoData(inicialProductosState);
        setIsVisible(false);
    };

    const _deleteProducto = () => {
        if (editProducto) {
            deleteProducto(productoData.id);
            setProductoData(inicialProductosState);
        }
        setIsVisible(false);
    };

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deleteProducto}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveProducto}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setProductoData(inicialProductosState);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del producto"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={productoData.nombre}
                        onChange={(e)=>updateField(e.target.value.trim(), "nombre")}
                    />
                    <label>Nombre</label>
                </div>
                <br />
                <div className="p-float-label">
                    <InputText
                        value={productoData.unidadMedida}
                        onChange={(e)=>updateField(e.target.value, "unidadMedida")}
                    />
                    <label>Unidad de medida</label>
                </div>
                <br />
                <div className="p-float-label">
                    {/*<InputNumber
                        value={productoData.estado}
                        onChange={(e)=>updateField(e.target.value, "estado")}
                    />*/}
                        <Dropdown value={productoData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}
export default ProductoForm;