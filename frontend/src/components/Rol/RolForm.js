import React, {useContext, useState, useEffect, useRef} from "react";
import { RolContext } from "../../context/RolContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
const Form = (props) =>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

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
        if(editRol)setRolData(editRol);
    }, [editRol]);

    const updateField = (data, field) =>{
        setRolData({
            ...rolData,
            [field]:data
        })
    };

    const saveRol = () => {
        if (!editRol) {
            createRol(rolData);
        } else {
            updateRol(rolData);
        }
        retornar();
    };

    const toast = useRef(null);

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const _deleteRol = () => {
        if (editRol) {
            deleteRol(rolData.id);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setRolData(inicialRolState );
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Esta seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteRol} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
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
        <Toast ref={toast}></Toast>
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
                        value={rolData.nombre}
                        onChange={(e)=>updateField(e.target.value.trim(), "nombre")}
                    />
                    <label>Nombre</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={rolData.descripcion}
                        onChange={(e)=>updateField(e.target.value.trim(), "descripcion")}
                    />
                    <label>Descripción</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={rolData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;