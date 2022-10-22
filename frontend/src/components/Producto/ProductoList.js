import React, {useContext, useState, useEffect} from "react";
import { ProductoContext } from "../../context/ProductoContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import ProductoForm from './ProductoForm';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const ProductoList=()=>{
    const {productos, findProducto} = useContext(ProductoContext);
    const statusBodyTemplate = (productos) => {
        return <span className={`${productos.estado ? "activo" : "inactivo"}`}>{productos.estado ? " Activo " : " Inactivo "}</span>;
    }

    const [isVisible, setIsVisible] = useState(false);

    const saveProducto = (id) => {
        findProducto(id);
        setIsVisible(true);
    };

    //Filtro
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'nombre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'unidadMedida': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            //'estado':  { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
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
    return(<div>
        <div className="flex flex-column md:flex-row justify-content-between">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" type="button" icon="pi pi-plus" label="Agregar Producto" 
                onClick={()=>setIsVisible(true)}/>
        </div>
        
        <Panel
            header="Listado de productos" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={productos}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveProducto(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['nombre', 'unidadMedida', 'estado']} header={header1} emptyMessage="No customers found."
                >
                <Column field="id" header="No." sortable/>
                <Column field="nombre" header="Nombre" sortable/>
                <Column field="unidadMedida" header="Unidad de Medida" sortable/> 
                <Column body={statusBodyTemplate} header="Estado" sortable/>
            </DataTable>
            </div>
        </Panel>
        <ProductoForm isVisible={isVisible} setIsVisible={setIsVisible}/>
    </div>);
}
export default ProductoList;