import React, {useContext, useState, useEffect} from "react";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';

import { DRequisicionContext } from "../../context/DRequisicionContext";

const Form =(props) =>{
    const {idr, isVisible, setIsVisible} = props;
    const {
        createDeRequisicion,
        deleteDeRequisicion,
        editDeRequisicion,
        updateDeRequisicion,
        lote
    } = useContext(DRequisicionContext);
    
    const inicialDRequisicionState ={
        id:null,
        idRequisicion: idr,
        idProducto: 0,
        idLote: 0,
        descripcion: "",
        cantidad: 0,
        cantidaDespachada: 0,
        precioUnitario: 0,
        precioTotal: 0
    };

    const [dRequisicionData, setdRequisicionData] = useState(inicialDRequisicionState);

    useEffect(() => {
        if (editDeRequisicion) setdRequisicionData(editDeRequisicion);
    }, [editDeRequisicion]);

    const updateField = (data, field) =>{
        setdRequisicionData({
            ...dRequisicionData,
            [field]:data
        })
    };

    const saveDRequisicion = () => {
        if (!editDeRequisicion) {
            createDeRequisicion(dRequisicionData);
        } else {
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
                    <Dropdown value={dRequisicionData.idLote} options={lote} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idProducto")} filter showClear filterBy="nombre" placeholder="Seleccione un producto"/>
                    <label>Producto</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={dRequisicionData.idLote} options={lote} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idProducto")} filter showClear filterBy="nombre" placeholder="Seleccione un producto"/>
                    <label>Lote</label>
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
                        onChange={(e)=>updateField(e.value, "cantidadAutorizada")}
                        locale="en-US"
                    />
                    <label>Cantidad Autorizada</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dRequisicionData.codInsumo}
                        onChange={(e)=>updateField(e.target.value.trim(), "codInsumo")}
                    />
                    <label>Código de insumo</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dRequisicionData.descripcion}
                        onChange={(e)=>updateField(e.target.value.trim(), "descripcion")}
                    />
                    <label>Descripcion</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dRequisicionData.precioUnitario}
                        onChange={(e)=>updateField(e.target.value.trim(), "renglonAfectado")}
                    />
                    <label>Renglón Afectado</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dRequisicionData.precioTotal}
                        onChange={(e)=>updateField(e.value, "valorEstimado")}
                        mode="decimal" locale="en-US" minFractionDigits={2}
                    />
                    <label>Valor Estimado</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown 
                        value={dRequisicionData.IncluidoPAAC} options={estados} 
                        onChange={(e) => updateField(e.target.value, "IncluidoPAAC")}/>
                    <label>Incluido en PAAC</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown 
                        value={dRequisicionData.contratoAbierto} options={estados} 
                        onChange={(e) => updateField(e.target.value, "contratoAbierto")}/>
                    <label>Esta en contrato abierto</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;