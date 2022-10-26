import React, {useContext, useState, useEffect} from "react";
import { KardexContext } from "../../context/KardexsContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
//import {InputNumber} from "primereact/inputnumber";


const KardexForm =(props) =>{
    const {isVisible, setIsVisible} = props;

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
        if (editKardex) setKardexData(editKardex);
    }, [editKardex]);

    const updateField = (data, field) =>{
        setKardexData({
            ...kardexData,
            [field]:data
        })
        console.log(kardexData);
    };

    const saveProducto = () => {
        if (!editKardex) {
            createKardex(kardexData);
        } else {
            updateKardex(kardexData);
        }
        setKardexData(inicialKardexsState);
        setIsVisible(false);
    };

    const _deleteProducto = () => {
        if (editKardex) {
            deleteKardex(kardexData.id);
            setKardexData(inicialKardexsState);
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
        setKardexData(inicialKardexsState);
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