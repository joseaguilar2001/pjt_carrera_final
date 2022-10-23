import React, {useContext, useState, useEffect} from "react";
import { PresentacionContext } from "../../context/PresentacionContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
//import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';


const Form =(props) =>{
    const {isVisible, setIsVisible} = props;

    const {
        createPresentacion,
        deletePresentacion,
        editPresentacion,
        updatePresentacion
    } = useContext(PresentacionContext);

    const inicialPresentacionesState ={
        id:null,
        presentacion:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [presentacionData, setPresentacionData] = useState(inicialPresentacionesState);

    useEffect(() => {
        if (editPresentacion) setPresentacionData(editPresentacion);
    }, [editPresentacion]);

    const updateField = (data, field) =>{
        setPresentacionData({
            ...presentacionData,
            [field]:data
        })
        console.log(presentacionData);
    };

    const saveProducto = () => {
        if (!editPresentacion) {
            createPresentacion(presentacionData);
        } else {
            updatePresentacion(presentacionData);
        }
        setPresentacionData(inicialPresentacionesState);
        setIsVisible(false);
    };

    const _deleteProducto = () => {
        if (editPresentacion) {
            deletePresentacion(presentacionData.id);
            setPresentacionData(inicialPresentacionesState);
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
        setPresentacionData(inicialPresentacionesState);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del presentacion"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={presentacionData.presentacion}
                        onChange={(e)=>updateField(e.target.value.trim(), "presentacion")}
                    />
                    <label>Nombre</label>
                </div>
                <br />
                <div className="p-float-label">
                        <Dropdown value={presentacionData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;