import React, {useContext, useState, useEffect} from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

const UsuarioForm =(props) =>{
    const {isVisible, setIsVisible} = props;

    const {
        createUsuario,
        deleteUsuario,
        editUsuario,
        updateUsuario,
        rol
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
        setUsuarioData(inicialUsuarioState);
        setIsVisible(false);
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const _deleteUsuario = () => {
        if (editUsuario) {
            deleteUsuario(usuarioData.id);
            setUsuarioData(inicialUsuarioState);
        }
        setIsVisible(false);
    };

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deleteUsuario}/>
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
                    <Dropdown value={usuarioData.idRol} options={rol} optionLabel="nombre" optionValue="id" 
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
                    <label>Email</label>
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
                    <label>Direccion</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={usuarioData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default UsuarioForm;