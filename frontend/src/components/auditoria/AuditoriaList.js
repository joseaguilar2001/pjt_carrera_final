import React, {useContext, useRef} from "react";
import { AuditoriaContext } from "../../context/AuditoriaContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import moment from "moment";
import { SplitButton } from 'primereact/splitbutton';
import {Toast} from 'primereact/toast';


const AuditoriaList = () =>{
    const {auditorias} = useContext(AuditoriaContext);

    const datefecha = (auditorias) => {
        return moment(auditorias.fechaCad).format("DD/MM/YYYY");
    }

    return(
        <div>
        <Panel
            header="Reporte Auditoria" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable
                value={auditorias}
                responsiveLayout="scroll"
                selectionMode="single"
                >
                <Column field="no" header="No." sortable/>
                <Column field="nombre" header="Descripcion" sortable/>
                <Column field="presentacion" header="Presentacion" sortable/>
                <Column field="unidadMedida" header="Unidad de Medida" sortable/>
                <Column body={datefecha} header="Fecha de Caducidad" sortable/>
                <Column field="lote" header="No. De Lote" sortable/>
                <Column field="kardex" header="No. De Tarjeta Kardex" sortable/>
                <Column field="cantidad" header="Cantidad" sortable/>
                <Column field="precioUnitario" header="Precio Unitario" sortable/>
                <Column field="total" header="Total" sortable/>
            </DataTable>
            </div>
        </Panel>
        </div>
    );
}

export default AuditoriaList;