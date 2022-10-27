import React, {useContext, useState, useEffect} from "react";
import { PermisosContext } from "../../context/PermisosContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import moment from "moment";

const Form =(props) =>{
    const {isVisible, setIsVisible} = props;

    const {
        createPermiso,
        deletePermiso,
        editPermiso,
        updatePermiso,
        rol,
         
    } = useContext(PermisosContext);
    
    const inicialPermisoState ={
        id:null,
        nombre: "",
        estado: 0,
        idRol: 0,
    };
    const [ permisoData, setPermisoData] = useState(inicialPermisoState);


    useEffect(() => {
        if (editPermiso) setPermisoData(editPermiso);
    }, [editPermiso]);

    const updateField = (data, field) =>{
        setPermisoData({
            ... permisoData,
            [field]:data
        })
        //console.log( permisoData);
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];
    
    const savePermiso = () => {
        if (!editPermiso) {
            createPermiso(permisoData);
        } else {
            updatePermiso(permisoData);
        }
        setPermisoData(inicialPermisoState);
        setIsVisible(false);
    };

    const _deletePermiso = () => {
        if (editPermiso) {
            deletePermiso( permisoData.id);
            setPermisoData(inicialPermisoState);
        }
        setIsVisible(false);
    };

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deletePermiso}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={savePermiso}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setPermisoData(inicialPermisoState);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del permiso"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={ permisoData.nombre}
                        onChange={(e)=>updateField(e.target.value.trim(), "nombre")}
                    />
                    <label>Nombre</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={ permisoData.idRol} options={rol} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idRol")} filter showClear filterBy="nombre" placeholder="Seleccione un rol"/>
                    <label>Rol</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={presentacionData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;