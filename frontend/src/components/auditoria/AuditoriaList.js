import React, {useContext, useState, useEffect} from "react";
import { AuditoriaContext } from "../../context/AuditoriaContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
//import AuditoriaForm from './AuditoriaForm';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';


const AuditoriaList = () =>{
    const {auditorias} = useContext(AuditoriaContext);
    


    //Filtro
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilterValue1('');
    }
    const clearFilter1 = () => {
        initFilters1();
    }
    useEffect(() => {
        initFilters1();
    }, []);
    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Limpiar" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar" />
                </span>
            </div>
        )
    }
    const header1 = renderHeader1();
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
                //paginator className="p-datatable-customers" showGridlines rows={10}
                //dataKey="id" filters={filters1} filterDisplay="menu"
                //globalFilterFields={['nombre', 'presentacion', 'unidadMedida', 'fechaCad', 'correlativo', 'correlativo', 'cantidad', 'precioUnitario', 'total']} header={header1} emptyMessage="No hay datos"
                >
                <Column field="no" header="No." sortable/>
                <Column field="nombre" header="Descripcion" sortable/>
                <Column field="presentacion" header="Presentacion" sortable/>
                <Column field="unidadMedida" header="Unidad de Medida" sortable/>
                <Column field="fechaCad" header="Fecha de Caducidad" sortable/>
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