import React, { useContext, useState, useEffect } from "react";
import { RolContext } from "../../context/RolContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import RolForm from './RolForm';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';

const RolList = () => {
    const {rols, findRol} = useContext(RolContext);

    const [isVisible, setIsVisible] = useState(false);

    const saveRol = (id) => {
        findRol(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar Rol" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        );
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
            <Panel
                header="Listado de roles" sortField="category"
                sortOrder={-1} responsiveLayout="scroll"
                style={{textAlign: "justify"}}
                >
                    <div>
                        <DataTable
                            value={rols}
                            responsiveLayout="scroll"
                            selectionMode="single"
                            onSelectionChange={(e) => saveRol(e.value.id)}
                            paginator className="p-datatable-customers" showGridlines rows={10}
                            dataKey="id" filters={filters1} filterDisplay="menu"
                            globalFilterFields={['nombre', 'descripcion', 'estado']} 
                            header={header1} emptyMessage="No se encontraron roles."
                        >
                            <Column field="id" header="Id" sortable/>
                            <Column field="nombre" header="Nombre" sortable/>
                            <Column field="descripcion" header="Descripcion" sortable/>
                            <Column field="estado" header="Estado" sortable/>
                        </DataTable>
                    </div>
                </Panel> 
                <RolForm isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default RolList;