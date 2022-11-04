import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { KardexContext } from "../../context/KardexsContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
//import {InputNumber} from "primereact/inputnumber";


const KardexForm =(props) =>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const {
        createKardex,
        deleteKardex,
        editKardex,
        updateKardex
    } = useContext(KardexContext);

    const inicialKardexsState ={
        id:null,
        correlativo:"",
        descripcion:"",
        codigo: "",
        areaDSalud: "",
        dependencia: ""
    };

    const [kardexData, setKardexData] = useState(inicialKardexsState);

    useEffect(() => {
        if (editKardex) 
        {
            setIsVisibleButton(true);
            setKardexData(editKardex);
        }
    }, [editKardex]);

    const updateField = (data, field) =>{
        setKardexData({
            ...kardexData,
            [field]:data
        })
        console.log(kardexData);
    };

    const saveKardex = () => {
        if (!editKardex) {
            createKardex(kardexData);
        } else {
            updateKardex(kardexData);
        }
        setKardexData(inicialKardexsState);
        setIsVisible(false);
    };

    const _deleteKardex = () => {
        if (editKardex) {
            deleteKardex(kardexData.id);
            setKardexData(inicialKardexsState);
        }
        setIsVisible(false);
    };

    //Navegacion
    const navigate = useNavigate();
    function linkPresentacion (){
        navigate(`/dkardex/${kardexData.id}`)
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deleteKardex}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveKardex}/>
            <Button label="Ingresar Detalle" icon="pi pi-angle-double-right" 
                className="p-button-rounded mb-3" visible={isVisibleButton} onClick={linkPresentacion}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setKardexData(inicialKardexsState);
        setIsVisibleButton(false);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de el kardex"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={kardexData.correlativo}
                        onChange={(e)=>updateField(e.target.value.trim(), "correlativo")}
                    />
                    <label>Correlativo</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={kardexData.descripcion}
                        onChange={(e)=>updateField(e.target.value.trim(), "descripcion")}
                    />
                    <label>Descripcion</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={kardexData.codigo}
                        onChange={(e)=>updateField(e.target.value.trim(), "codigo")}
                    />
                    <label>Codigo</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={kardexData.areaDSalud}
                        onChange={(e)=>updateField(e.target.value.trim(), "areaDSalud")}
                    />
                    <label>Area de Salud</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={kardexData.dependencia}
                        onChange={(e)=>updateField(e.target.value.trim(), "dependencia")}
                    />
                    <label>Dependencia</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default KardexForm;