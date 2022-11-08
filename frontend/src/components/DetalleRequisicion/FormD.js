import React, {useContext, useState, useEffect} from "react";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';

import { DRequisicionContext } from "../../context/DRequisicionContext";

const FormD =(props) =>{
    const {idr, isVisible, setIsVisible} = props;
    const {
        createDeRequisicion,
        deleteDeRequisicion,
        editDeRequisicion,
        updateDeRequisicion,
        lote,
        /*loteFind,
        lotefind,*/
        producto
    } = useContext(DRequisicionContext);
    
    const inicialDRequisicionState ={
        id:null,
        idRequisicion: idr,
        idProducto: 0,
        idLote: 0,
        descripcion: "",
        cantidad: 0,
        cantidaDespachada: 0
    };

    const [dRequisicionData, setdRequisicionData] = useState(inicialDRequisicionState);
    //const [loteFindData, setloteFindData] = useState([]);


    useEffect(() => {
        if (editDeRequisicion) setdRequisicionData(editDeRequisicion);
    }, [editDeRequisicion]);

    const updateField = (data, field) =>{
        setdRequisicionData({
            ...dRequisicionData,
            [field]:data
        })
    };
    //console.log(dRequisicionData);
    const saveDRequisicion = () => {
        if (!editDeRequisicion) {
            createDeRequisicion(dRequisicionData);
        } else {
            //findLote(dRequisicionData.idLote);
            updateDeRequisicion(dRequisicionData);
        }
        setdRequisicionData(inicialDRequisicionState);
        setIsVisible(false);
    };

    const _deleteDRequisicion = () => {
        if (editDeRequisicion) {
            deleteDeRequisicion(dRequisicionData.id);
            setdRequisicionData(inicialDRequisicionState);
        }
        setIsVisible(false);
    };

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deleteDRequisicion}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveDRequisicion}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setdRequisicionData(inicialDRequisicionState);
    };

    const labelLote =(lotes) =>{
        return lotes.correlativo + " Existencia: " + lotes.existencia + " " + lotes.estado;
    }

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Formulario"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <Dropdown value={dRequisicionData.idProducto} options={producto} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idProducto")} filter showClear filterBy="nombre" placeholder="Seleccione un producto"/>
                    <label>Producto</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={dRequisicionData.idLote} options={lote.filter((p)=>(p.idProducto === parseInt(dRequisicionData.idProducto)) && (p.estado !== "Finalizado"))} optionLabel={labelLote} optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idLote")} filter showClear filterBy="correlativo" placeholder="Seleccione un lote"/>
                    <label>Lote</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dRequisicionData.descripcion}
                        onChange={(e)=>updateField(e.target.value.trim(), "descripcion")}
                    />
                    <label>Descripcion</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dRequisicionData.cantidad}
                        onChange={(e)=>updateField(e.value, "cantidad")}
                        locale="en-US"
                    />
                    <label>Cantidad Solicitada</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dRequisicionData.cantidaDespachada}
                        onChange={(e)=>updateField(e.value, "cantidaDespachada")}
                        locale="en-US"
                    />
                    <label>Cantidad despachada</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default FormD;