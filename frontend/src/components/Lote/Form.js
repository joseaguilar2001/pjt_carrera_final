import React, {useContext, useState, useEffect} from "react";
import { LoteContext } from "../../context/LoteContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import moment from "moment";

const Form =(props) =>{
    const {isVisible, setIsVisible} = props;

    const {
        createLote,
        deleteLote,
        editLote,
        updateLote,
        producto,
        presentacion
    } = useContext(LoteContext);
    
    const inicialLotesState ={
        id:null,
        idProducto: 0,
        correlativo:"",
        fechaCad: "",
        fechaConPref: "",
        cantidad: 0,
        existencia: 0,
        precioUnitario: 0.0,
        idPresentacion: 0
    };
    const [loteData, setLoteData] = useState(inicialLotesState);


    useEffect(() => {
        if (editLote) setLoteData(editLote);
    }, [editLote]);

    const updateField = (data, field) =>{
        setLoteData({
            ...loteData,
            [field]:data
        })
        //console.log(loteData);
    };

    const saveLote = () => {
        if (!editLote) {
            createLote(loteData);
        } else {
            loteData.fechaCad = moment(loteData.fechaCad).format("YYYY-MM-DD");
            loteData.fechaConPref = moment(loteData.fechaConPref).format("YYYY-MM-DD");
            updateLote(loteData);
        }
        setLoteData(inicialLotesState);
        setIsVisible(false);
    };

    const _deleteLote = () => {
        if (editLote) {
            deleteLote(loteData.id);
            setLoteData(inicialLotesState);
        }
        setIsVisible(false);
    };

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deleteLote}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveLote}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setLoteData(inicialLotesState);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del lote"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={loteData.correlativo}
                        onChange={(e)=>updateField(e.target.value.trim(), "correlativo")}
                    />
                    <label>Correlativo</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={loteData.idProducto} options={producto} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idProducto")} filter showClear filterBy="nombre" placeholder="Seleccione un producto"/>
                    <label>Producto</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={loteData.fechaCad && new Date(loteData.fechaCad + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fechaCad")}
                        dateFormat="mm-dd-yy"
                    />
                    <label>Fecha Caducidad</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={loteData.fechaConPref && new Date(loteData.fechaConPref + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fechaConPref")}
                        dateFormat="mm-dd-yy"
                    />
                    <label>Fecha consumo de preferencia </label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={loteData.cantidad}
                        onChange={(e)=>updateField(e.value, "cantidad")}
                    />
                    <label>Cantidad</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={loteData.existencia}
                        onChange={(e)=>updateField(e.value, "existencia")}
                    />
                    <label>Existencia</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={loteData.precioUnitario}
                        onChange={(e)=>updateField(e.value, "precioUnitario")}
                        mode="decimal" locale="en-US" minFractionDigits={2}
                    />
                    <label>Precio Unitario</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={loteData.idPresentacion} options={presentacion} optionLabel="presentacion" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idPresentacion")} filter showClear filterBy="presentacion" placeholder="Seleccione un producto"/>
                    <label>Presentacion</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;