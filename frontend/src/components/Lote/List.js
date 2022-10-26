import React, {useContext, useState, useEffect} from "react";
import { LoteContext } from "../../context/LoteContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import LoteForm from './Form';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode} from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import moment from "moment";

import { Link, useNavigate } from "react-router-dom";


const LoteList = () =>{
    const {lotes, findLote} = useContext(LoteContext);

    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();
    const dateCaducidad = (lotes) => {
        return moment(lotes.fechaCad).format("L");
    }
    const datePrefConsumo = (lotes) => {
        return moment(lotes.fechaConPref).format("L");
    }
    
    const montoTotal = (lotes) =>{
        return lotes.cantidad * lotes.precioUnitario;
    }

    const saveLote = (id) => {
        findLote(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar Lote" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        )
    }

    function linkProducto (){
        navigate('/producto')
    }
    function linkProducto (){
        navigate('/presentacion')
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Ir a Producto" icon="pi pi-angle-double-right" className="p-button-rounded mr-2" onClick={linkProducto}/>
                <Button label="Ir a Presentacion" icon="pi pi-angle-double-right" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkProducto}/>
            </React.Fragment>
        )
    }

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
        <Toolbar className="mr-2" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <Panel
            header="Listado de lotes" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={lotes}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveLote(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['correlativo', 'producto', 'presentacion', 'cantidad', dateCaducidad, datePrefConsumo, 'cantidad', 'existencia', 'precioUnitario', montoTotal]} 
                header={header1} emptyMessage="No se encontraron lotes."
                >
                <Column field="id" header="No." sortable/>
                <Column field="correlativo" header="Correlativo" sortable/>
                <Column field="producto" header="Producto" sortable/>
                <Column field="presentacion" header="Presentacion" sortable/>
                <Column body={dateCaducidad} header="Fecha de caducidad" sortable/>
                <Column body={datePrefConsumo} header="Fecha de preferencia de consumo" sortable/>
                <Column field="cantidad" header="Cantidad Inicial" sortable/>
                <Column field="existencia" header="Existencia" sortable/>
                <Column field="precioUnitario" header="Precio Unitario" sortable/>
                <Column body={montoTotal} header="Monto Total" sortable/>
            </DataTable>
            </div>
        </Panel>
        <LoteForm isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default LoteList;