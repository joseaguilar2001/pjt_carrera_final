import React, { useContext } from "react";
import { ERequisicionContext } from "../../context/ERequisicionContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import moment from "moment";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";

const ReporteRequisicionList = () => {
    const { erequisicions, derequisicions } = useContext(ERequisicionContext);

    const datefecha = (erequisicions) => {
        return moment(erequisicions.fecha).format("DD/MM/YYYY");
    }

    const { idR } = useParams();

    const cols = [
        { field: "descripcion", header: "Descripcion" },
        { field: "cantidad", header: "Cantidad" },
        { field: "cantidaDespachada", header: "Cantidad Despachada" },
        { field: "precioUnitario", header: "Precio Unitario" },
        { field: "precioTotal", header: "Precio Total" },
        { field: "Lote", header: "Lote" },
    ];
    const cols1 = [
        { field: "Solicitante", header: "Solicitante" },
        { field: "Servicio", header: "Servicio" },
        { field: "fecha", header: "Fecha" },
        { field: "codigoAprobacion", header: "Codigo de Aprobacion" },
        { field: "aprobado", header: "Estado" },
    ];

    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    const exportColumns2 = cols1.map((col1) => ({
        title: col1.header,
        dataKey: col1.field,
    }));


    const exportPDF = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default('l', 'mm', 'a4');
                doc.autoTable(exportColumns, derequisicions);
                doc.autoTable(exportColumns2 , erequisicions);
                doc.save("Requisicion.pdf");
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

    return (
        <div>
            <Panel
                header="Reporte Requisicion"
                style={{ textAlign: "justify" }}
            >HOSPITAL NACIONAL RETALHULEU TEL: 79328282</Panel>
            <br/><br/>
            <div>
                <h4><center><strong>Requisicion de Productos</strong></center></h4>
                <DataTable
                    value={derequisicions.filter((p) => p.Requisicion === parseInt(idR))}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    dataKey="id"
                >
                    {// <Column field="nombre" header="Producto" sortable/>
                    }
                    <Column field="descripcion" header="Descripcion" />
                    <Column field="cantidad" header="Cantidad Pedida" />
                    <Column field="cantidaDespachada" header="Cantidad Despachada"/>
                    <Column field="precioUnitario" header="Precio Unitario" />
                    <Column field="precioTotal" header="Precio Total" />
                    <Column field="Lote" header="No. Lote" />
                </DataTable>
            </div>
            <br/><br/>
            <div>
                <h4><center><strong>Informacion de Requisicion</strong></center></h4>
                <DataTable
                    value={erequisicions.filter((q) => q.id === parseInt(idR))}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    dataKey="id"
                >
                    <Column field="Solicitante" header="Solicitante" />
                    <Column field="Servicio" header="Servicio"  />
                    <Column body={datefecha} header="Fecha"  />
                    <Column field="codigoAprobacion" header="Codigo de Aprobacion"  />
                    <Column field="aprobado" header="Aprobacion"  />
                </DataTable>
            </div>
            <br/><br/>
            <div className="d-flex justify-items-start">
                <h6><strong>PDF</strong></h6>
                {header}
            </div>
        </div>


    );
}

export default ReporteRequisicionList;