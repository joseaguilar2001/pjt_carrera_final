import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { PedidoContext } from "../../context/PedidoContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import moment from "moment";

const Form =(props) =>{
    const {isVisible, setIsVisible} = props;

    const [isVisibleButton, setIsVisibleButton] = useState(false);

    const {
        createPedido,
        deletePedido,
        editPedido,
        updatePedido,
        ejecutor,
        solicitante
    } = useContext(PedidoContext);
    
    const inicialPedidosState ={
        id:null,
        idUE: 0,
        idSolicitante: 0,
        correlativoUE:"",
        fechaSolicitud: "",
        telefonoExt: 0,
        montoTotal: 0.0,
        justificacion_Observacion: 0,
        estado: 0
    };
    const [pedidoData, setPedidoData] = useState(inicialPedidosState);

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];


    useEffect(() => {
        if (editPedido) {
            setIsVisibleButton(true);
            setPedidoData(editPedido);
        }
    }, [editPedido]);

    const updateField = (data, field) =>{
        setPedidoData({
            ...pedidoData,
            [field]:data
        })
    };

    const savePedido = () => {
        if (!editPedido) {
            createPedido(pedidoData);
        } else {
            pedidoData.fechaSolicitud = moment(pedidoData.fechaSolicitud).format("YYYY-MM-DD");
            updatePedido(pedidoData);
        }
        setPedidoData(inicialPedidosState);
        setIsVisible(false);
    };

    const _deletePedido = () => {
        if (editPedido) {
            deletePedido(pedidoData.id);
            setPedidoData(inicialPedidosState);
        }
        setIsVisible(false);
    };

    //Navegacion
    const navigate = useNavigate();
    function linkPedido (){
        navigate(`/dpedido/${pedidoData.id}`)
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Eliminar" icon="pi pi-times"
                onClick={_deletePedido}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={savePedido}/>
            <Button label="Ingresar Detalle" icon="pi pi-angle-double-right" 
                className="p-button-rounded mb-3" visible={isVisibleButton} onClick={linkPedido}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setPedidoData(inicialPedidosState);
        setIsVisibleButton(false);
    };

    return(<div>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del pedido"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <Dropdown value={pedidoData.idUE} options={ejecutor} optionLabel="nombreUE" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idUE")} filter showClear filterBy="nombreUE" placeholder="Seleccione un ejecutor"/>
                    <label>Ejecutor</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={pedidoData.idSolicitante} options={solicitante} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idSolicitante")} filter showClear filterBy="nombre" placeholder="Seleccione un Solicitante"/>
                    <label>Solicitante</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={pedidoData.correlativoUE}
                        onChange={(e)=>updateField(e.target.value.trim(), "correlativoUE")}
                    />
                    <label>CorrelativoUE</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={pedidoData.fechaSolicitud && new Date(pedidoData.fechaSolicitud + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fechaSolicitud")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha Solicitud</label>
                </div><br />
                <div className="p-float-label">
                    <InputText keyfilter="int"
                        value={pedidoData.telefonoExt}
                        onChange={(e)=>updateField(e.target.value, "telefonoExt")}
                    />
                    <label>Teléfono o Extensión</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={pedidoData.justificacion_Observacion}
                        onChange={(e)=>updateField(e.target.value.trim(), "justificacion_Observacion")}
                    />
                    <label>Justificación o Observación</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={pedidoData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")}/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;