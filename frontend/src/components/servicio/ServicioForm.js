import React, {useContext, useState, useEffect} from "react";
import { ServicioContext } from "../../context/ServiciosContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
//import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';


const ServicioForm =(props) =>{
    const {isVisible, setIsVisible} = props;

    const {
        createServicio,
        deleteServicio,
        editServicio,
        updateServicio
    } = useContext(ServicioContext);

    const inicialServiciosState ={
        id:null,
        nombre:"",
        descripcion:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [servicioData, setServicioData] = useState(inicialServiciosState);

    useEffect(() => {
        if (editServicio) setServicioData(editServicio);
    }, [editServicio]);

    const updateField = (data, field) =>{
        setServicioData({
            ...servicioData,
            [field]:data
        })
        console.log(servicioData);
    };

    const saveProducto = () => {
        if (!editServicio) {
            createServicio(servicioData);
        } else {
            updateServicio(servicioData);
        }
        setServicioData(inicialServiciosState);
        setIsVisible(false);
    };

    const _deleteProducto = () => {
        if (editServicio) {
            deleteServicio(servicioData.id);
            setServicioData(inicialServiciosState);
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
        setServicioData(inicialServiciosState);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de servicios"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={servicioData.nombre}
                        onChange={(e)=>updateField(e.target.value.trim(), "nombre")}
                    />
                    <label>Nombre</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={servicioData.descripcion}
                        onChange={(e)=>updateField(e.target.value.trim(), "descripcion")}
                    />
                    <label>Descripcion</label>
                </div>
                <br />
                <div className="p-float-label">
                        <Dropdown value={servicioData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default ServicioForm;