import React, {useContext, useState, useEffect, useRef} from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const FormUsuario = (props) => {
    const {isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createUsuario,
        deleteUsuario,
        editUsuario,
        updateUsuario,
        roles,
    } = useContext(UsuarioContext);
    
    const inicialUsuarioState ={
        id:null,
        idRol: 0,
        nombre: "",
        email: "",
        password: "",
        nroCelular: "",
        direccion: "",
        estado: 0,
    };
    const [usuarioData, setUsuarioData] = useState(inicialUsuarioState);


    useEffect(() => {
        if (editUsuario) setUsuarioData(editUsuario);
    }, [editUsuario]);

    const updateField = (data, field) =>{
        setUsuarioData({
            ...usuarioData,
            [field]:data
        })
    };

    const saveUsuario = () => {
        if (!editUsuario) {
            createUsuario(usuarioData);
        } else {
            updateUsuario(usuarioData);
        }
        retornar();
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const toast = useRef(null);

    const _deleteUsuario = () => {
        if (editUsuario) {
            deleteUsuario(usuarioData.id);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setUsuarioData(inicialUsuarioState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="Esta seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteUsuario} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveUsuario}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setUsuarioData(inicialUsuarioState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del rol"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <Dropdown value={usuarioData.idRol} options={roles} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idRol")} filter showClear filterBy="nombre" placeholder="Seleccione un rol"/>
                    <label>Rol</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={usuarioData.nombre || ''}
                        onChange={(e)=>updateField(e.target.value.trim(), "nombre")}
                    />
                    <label>Nombre</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={usuarioData.email || ''}
                        onChange={(e)=>updateField(e.target.value.trim(), "email")}
                    />
                    <label>Email</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={usuarioData.password || ''}
                        onChange={(e)=>updateField(e.target.value.trim(), "password")}
                    />
                    <label>Contraseña</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={usuarioData.nroCelular || ''}
                        onChange={(e)=>updateField(e.target.value.trim(), "nroCelular")}
                    />
                    <label>Numero de celular</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={usuarioData.direccion || ''}
                        onChange={(e)=>updateField(e.target.value.trim(), "direccion")}
                    />
                    <label>Dirección</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={usuarioData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default FormUsuario;