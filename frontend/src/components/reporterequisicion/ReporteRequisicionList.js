import React, {useContext} from "react";
import { ERequisicionContext } from "../../context/ERequisicionContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import moment from "moment";

const ReporteRequisicionList = () =>{
    const {erequisicions, derequisicions} = useContext(ERequisicionContext);
    
    

    const datefecha = (erequisicions) => {
        return moment(erequisicions.fecha).format("DD/MM/YYYY");
    }

    return(
        <div>
        <Panel
            header="Reporte Requisicion"
        >HOSPITAL NACIONAL RETALHULEU TEL: 79328282</Panel>
            <div>
                <h4><center><strong>Requisicion de Productos</strong></center></h4>
            <DataTable
                value={derequisicions}
                responsiveLayout="scroll"
                selectionMode="single"
                >
                <Column field="nombre" header="Producto" sortable/>
                <Column field="descripcion" header="Descripcion" sortable/>
                <Column field="cantidad" header="Cantidad Pedida" sortable/>
                <Column field="cantidadDespachada" header="Cantidad Despachada" sortable/>
                <Column field="precioUnitario" header="Precio Unitario" sortable/>
                <Column field="precioTotal" header="Precio Total" sortable/>
                <Column field="Lote" header="No. Lote" sortable/>
            </DataTable>
            </div>

            <div>
            <h4><center><strong>Informacion de Requisicion</strong></center></h4>
            <DataTable
                value={erequisicions}
                responsiveLayout="scroll"
                selectionMode="single"
                >
                <Column field="Solicitante" header="Solicitante" sortable/>
                <Column field="Servicio" header="Servicio" sortable/>
                <Column body={datefecha} header="Fecha" sortable/>
                <Column field="codigoAprobacion" header="Codigo de Aprobacion" sortable/>
                <Column field="aprobado" header="Aprobacion" sortable/>
            </DataTable>
            </div>
        </div>
        
    );
}

export default ReporteRequisicionList;