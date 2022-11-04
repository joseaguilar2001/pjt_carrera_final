import React, {useContext, useState, useEffect} from "react";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import moment from "moment";

import { DKardexContext } from "../../context/DKardexContext";

const Form =(props) =>{
    const {idk, isVisible, setIsVisible} = props;
    const {
        createDeKardex,
        deleteDeKardex,
        editDeKardex,
        updateDeKardex,
        lote
    } = useContext(DKardexContext);
    
    const inicialDKardexsState ={
        id:null,
        idKardex: idk,
        idLote: 0,
        fecha:"",
        nroReferencia: "",
        remitente: "",
        entradaCantidad: 0,
        entradaPrecio: 0,
        salidadPrecio: 0,
        salidaCantidad: 0,
        reajusteCantidad: 0,
        reajustePrecio: 0,
        saldoCantidad: 0,
        saldoPrecio: 0,
        fechaRequisicion: ""
    };
    const [dKardexData, setdKardexData] = useState(inicialDKardexsState);

    useEffect(() => {
        if (editDeKardex) setdKardexData(editDeKardex);
    }, [editDeKardex]);

    const updateField = (data, field) =>{
        setdKardexData({
            ...dKardexData,
            [field]:data
        })
        //console.log(loteData);
    };

    const saveDKardex = () => {
        if (!editDeKardex) {
            createDeKardex(dKardexData);
        } else {
            dKardexData.fecha = moment(dKardexData.fecha).format("YYYY-MM-DD");
            dKardexData.fechaRequisicion = moment(dKardexData.fechaRequisicion).format("YYYY-MM-DD");
            updateDeKardex(dKardexData);
        }
        setdKardexData(inicialDKardexsState);
        setIsVisible(false);
    };

    const _deleteDKardex = () => {
        if (editDeKardex) {
            deleteDeKardex(dKardexData.id);
            setdKardexData(inicialDKardexsState);
        }
        setIsVisible(false);
    };

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deleteDKardex}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveDKardex}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setdKardexData(inicialDKardexsState);
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
                    <Dropdown value={dKardexData.idLote} options={lote} optionLabel="correlativo" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idLote")} filter showClear filterBy="correlativo" placeholder="Seleccione un lote"/>
                    <label>Lote</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={dKardexData.fecha && new Date(dKardexData.fecha + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fecha")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dKardexData.nroReferencia}
                        onChange={(e)=>updateField(e.target.value.trim(), "nroReferencia")}
                    />
                    <label>Numero de referencia</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dKardexData.remitente}
                        onChange={(e)=>updateField(e.target.value.trim(), "remitente")}
                    />
                    <label>Remitente</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.entradaCantidad}
                        onChange={(e)=>updateField(e.value, "entradaCantidad")}
                    />
                    <label>Entrada Cantidad</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.entradaPrecio}
                        onChange={(e)=>updateField(e.value, "entradaPrecio")}
                        mode="decimal" locale="en-US" minFractionDigits={2}
                    />
                    <label>Entreda Precio</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.salidaCantidad}
                        onChange={(e)=>updateField(e.value, "salidaCantidad")}
                    />
                    <label>Salida Cantidad</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.salidadPrecio}
                        onChange={(e)=>updateField(e.value, "salidadPrecio")}
                        mode="decimal" locale="en-US" minFractionDigits={2}
                    />
                    <label>Salida Precio</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.saldoCantidad}
                        onChange={(e)=>updateField(e.value, "saldoCantidad")}
                    />
                    <label>Saldo Cantidad</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.saldoPrecio}
                        onChange={(e)=>updateField(e.value, "saldoPrecio")}
                        mode="decimal" locale="en-US" minFractionDigits={2}
                    />
                    <label>Saldo Precio</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.reajusteCantidad}
                        onChange={(e)=>updateField(e.value, "reajusteCantidad")}
                    />
                    <label>Reajuste Cantidad</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.reajustePrecio}
                        onChange={(e)=>updateField(e.value, "reajustePrecio")}
                        mode="decimal" locale="en-US" minFractionDigits={2}
                    />
                    <label>Reajuste Precio</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={dKardexData.fechaRequisicion && new Date(dKardexData.fechaRequisicion + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fechaRequisicion")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha requisisción</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;