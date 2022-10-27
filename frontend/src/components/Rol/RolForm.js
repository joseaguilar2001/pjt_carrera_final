import React, {useContext, useState, useEffect} from "react";
import { RolContext } from "../../context/RolContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const RolForm =(props) =>{
    const {isVisible, setIsVisible} = props;

    const {
        createRol,
        deleteRol,
        editRol,
        updateRol
    } = useContext(RolContext);
    
    const inicialRolState ={
        id:null,
        nombre: "",
        descripcion: "",
        estado: 1,
    };
    const [rolData, setRolData] = useState(inicialRolState);


    useEffect(() => {
        if (editRol) setRolData(editRol);
    }, [editRol]);

    const updateField = (data, field) =>{
        setRolData({
            ...rolData,
            [field]:data
        })
        //console.log(loteData);
    };

    const saveRol = () => {
        if (!editRol) {
            createRol(rolData);
        } else {
            updateRol(rolData);
        }
        setRolData(inicialRolState);
        setIsVisible(false);
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const _deleteRol = () => {
        if (editRol) {
            deleteRol(rolData.id);
            setRolData(inicialRolState);
        }
        setIsVisible(false);
    };

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deleteRol}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveRol}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setRolData(inicialRolState);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del lote"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={rolData.nombre || ''}
                        onChange={(e)=>updateField(e.target.value.trim(), "nombre")}
                    />
                    <label>Nombre</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={rolData.descripcion || ''}
                        onChange={(e)=>updateField(e.target.value.trim(), "descripcion")}
                    />
                    <label>Descripcion</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={rolData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default RolForm;