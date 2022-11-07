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

    const toast = useRef(null);
    const items = [
        {
            label: 'Auditoria',
            icon: 'pi pi-building',
            command: () => {
                toast.current.show({severity:'success', summary:'Listo', detail:'Reporte Generado'});
            }
        },
        {
            label: 'Requisicion Reactivos Quimicos',
            icon: 'pi pi-heart',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Listo', detail: 'Reporte Generado' });
            }
        },
        {
            label: 'Requisicion Productos Medicinales',
            icon: 'pi pi-heart-fill',
            command: () => {
                window.location.href = 'https://facebook.github.io/react/'
            }
        },
        {   label: 'Suministros',
            icon: 'pi pi-table',
            command: () => {
                window.location.hash = "/fileupload"
            }
        }
    ];


    return(
        <div>
            <Toast ref={toast}></Toast>
            <SplitButton label="Reportes" icon="pi pi-book" model={items}></SplitButton>
            <br />

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