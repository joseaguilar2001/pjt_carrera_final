import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { RequisicionContext } from "../../context/RequisicionContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { useSelector } from "react-redux";

const Form =(props) =>{
    const {isVisible, setIsVisible} = props;

    const [isVisibleButton, setIsVisibleButton] = useState(false);

    //const { user: currentUser } = useSelector((state) => state.auth);
    const {
        createRequisicion,
        deleteRequisicion,
        editRequisicion,
        updateRequisicion,
        servicio,
        solicitante
    } = useContext(RequisicionContext);
    
    const inicialRequisicionesState ={
        id:null,
        idUsuarioEncargado: 1,//currentUser.id,
        idServicio: 0,
        idSolicitante: 0,
        aprobado: 0,
        categoria:"",
        codigoAprobacion: ""
    };
    const [requisicionData, setRequisicionData] = useState(inicialRequisicionesState);

    const estados = [
        {label: 'Si', value: 1},
        {label: 'No', value: 0}
    ];
    const categorias = [
        {label: 'Reactivos Quimicos', value: 'Reactivos Quimicos'},
        {label: 'Productos Medicinales', value: 'Productos Medicinales'}
    ];


    useEffect(() => {
        if (editRequisicion) {
            setIsVisibleButton(true);
            setRequisicionData(editRequisicion);
        }
    }, [editRequisicion]);

    const updateField = (data, field) =>{
        setRequisicionData({
            ...requisicionData,
            [field]:data
        })
    };

    const saveRequisicion = () => {
        if (!editRequisicion) {
            createRequisicion(requisicionData);
        } else {
            updateRequisicion(requisicionData);
        }
        setRequisicionData(inicialRequisicionesState);
        setIsVisible(false);
    };

    const _deleteRequisicion = () => {
        if (editRequisicion) {
            deleteRequisicion(requisicionData.id);
            setRequisicionData(inicialRequisicionesState);
        }
        setIsVisible(false);
    };

    //Navegacion
    const navigate = useNavigate();
    function linkRequisicion (){
        navigate(`/requisicion/${requisicionData.id}`)
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deleteRequisicion}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveRequisicion}/>
            <Button label="Ingresar Detalle" icon="pi pi-angle-double-right" 
                className="p-button-rounded mb-3" visible={isVisibleButton} onClick={linkRequisicion}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setRequisicionData(inicialRequisicionesState);
        setIsVisibleButton(false);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de requisición"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <Dropdown value={requisicionData.idServicio} options={servicio} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idServicio")} filter showClear filterBy="nombre" placeholder="Seleccione un servicio"/>
                    <label>Servicio</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={requisicionData.idSolicitante} options={solicitante} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idSolicitante")} filter showClear filterBy="nombre" placeholder="Seleccione un Solicitante"/>
                    <label>Solicitante</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={requisicionData.categoria} options={categorias} onChange={(e) => updateField(e.target.value, "categoria")}/>
                    <label>Categoria</label>
                </div><br />
                <div className="p-float-label">
                    <InputText keyfilter="int"
                        value={requisicionData.codigoAprobacion}
                        onChange={(e)=>updateField(e.target.value, "codigoAprobacion")}
                    />
                    <label>Código de aprovación</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={requisicionData.aprobado} options={estados} onChange={(e) => updateField(e.target.value, "aprobado")}/>
                    <label>Aprovación</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;