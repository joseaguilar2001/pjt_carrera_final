import React, {useContext} from "react";
import { AuditoriaContext } from "../../context/AuditoriaContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import moment from "moment";
import { Button } from "primereact/button";


const AuditoriaList = () =>{
    const {auditorias} = useContext(AuditoriaContext);

    const datefecha = (auditorias) => {
        return moment(auditorias.fechaCad).format("DD/MM/YYYY");
    }

    const cols = [
        { field: "no", header: "No." },
        { field: "nombre", header: "Descripción" },
        { field: "presentacion", header: "Presentación" },
        { field: "unidadMedida", header: "Unidad de medida" },
        { field: {datefecha}, header: "Fecha de caducidad" },
        { field: "lote", header: "No. de lote" },
        { field: "kardex", header: "No. de Kardex" },
        { field: "cantidad", header: "Cantidad" },
        { field: "precioUnitario", header: "Precio unitario" },
        { field: "total", header: "Total" },
    ];

    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    const exportPDF = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default('l', 'mm', 'a4');
                doc.setFontSize(16);
                doc.setFont("Helvetica", "bold");
                doc.autoTable(exportColumns, auditorias);
                doc.save("Auditoria.pdf");
            })
        })
    };

    const header = (
        <div className="flex align-items-center export-button">
            <Button
                type="button"
                icon="pi pi-file-pdf"
                onClick={exportPDF}
                className="p-button-danger mr-3"
                data-or-tooltip="PDF"
            />
        </div>

    );

    return(
        <div>
        <Panel
            header="Reporte de auditoria" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable
                value={auditorias}
                responsiveLayout="scroll"
                selectionMode="single"
                dataKey="id"
                >
                <Column field="no" header="No." sortable/>
                <Column field="nombre" header="Descripción" sortable/>
                <Column field="presentacion" header="Presentación" sortable/>
                <Column field="unidadMedida" header="Unidad de medida" sortable/>
                <Column body={datefecha} header="Fecha de caducidad" sortable/>
                <Column field="lote" header="No. de lote" sortable/>
                <Column field="kardex" header="No. de tarjeta kardex" sortable/>
                <Column field="cantidad" header="Cantidad" sortable/>
                <Column field="precioUnitario" header="Precio unitario" sortable/>
                <Column field="total" header="Total" sortable/>
            </DataTable>
            </div>
        </Panel>
        <br/><br/>
        <div className="speeddial-linear-demo" style={{ position: 'relative', height: '100px' }}>
                <h6><strong>PDF</strong></h6>
                {header}
            </div>
        </div>
    );
}

export default AuditoriaList;