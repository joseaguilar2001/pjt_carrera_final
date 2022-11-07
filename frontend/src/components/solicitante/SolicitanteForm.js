import React, {useContext, useState, useEffect} from "react";
import { SolicitanteContext } from "../../context/SolicitantesContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
//import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';


const SolicitanteForm =(props) =>{
    const {isVisible, setIsVisible} = props;

    const {
        createSolicitante,
        deleteSolicitante,
        editSolicitante,
        updateSolicitante
    } = useContext(SolicitanteContext);

    const inicialSolicitantesState ={
        id:null,
        nombre:"",
        cargo:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [solicitanteData, setSolicitanteData] = useState(inicialSolicitantesState);

    useEffect(() => {
        if (editSolicitante) setSolicitanteData(editSolicitante);
    }, [editSolicitante]);

    const updateField = (data, field) =>{
        setSolicitanteData({
            ...solicitanteData,
            [field]:data
        })
        console.log(solicitanteData);
    };

    const saveProducto = () => {
        if (!editSolicitante) {
            createSolicitante(solicitanteData);
        } else {
            updateSolicitante(solicitanteData);
        }
        setSolicitanteData(inicialSolicitantesState);
        setIsVisible(false);
    };

    const _deleteProducto = () => {
        if (editSolicitante) {
            deleteSolicitante(solicitanteData.id);
            setSolicitanteData(inicialSolicitantesState);
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
        setSolicitanteData(inicialSolicitantesState);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de solicitantes"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={solicitanteData.nombre}
                        onChange={(e)=>updateField(e.target.value.trim(), "nombre")}
                    />
                    <label>Nombre</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={solicitanteData.cargo}
                        onChange={(e)=>updateField(e.target.value.trim(), "cargo")}
                    />
                    <label>Estado</label>
                </div>
                <br />
                <div className="p-float-label">
                        <Dropdown value={solicitanteData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default SolicitanteForm;