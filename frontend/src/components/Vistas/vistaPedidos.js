import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { VistasService } from '../../services/VistasService';

const VistaTable = (props) => {
    const {id, setId } = props;
    const [pedido, setPedido] = useState([]);
    const [pedidoDetalle, setPedidoDetalle] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const vistaServicePedido = new VistasService();
    
    useEffect(() => {
        vistaServicePedido.readAllPedido(id)
        .then(data => setPedido(data));
        vistaServicePedido.readAllPedidoDetalle(id)
        .then(data => setPedidoDetalle(data));
    },[id, vistaServicePedido]);

    return (
        <div>
            <div className='flex justify-content-right'>
            <h4>Solicitud de Pedido</h4>
            <p>
            <strong>
            Codigo Unidad Ejecutora:__<u>{pedido.CodigoUE}</u>____ Correlativo Seccion de Compras UE: ___<u>{pedido.Correlativo}</u>___
            Nombre Unidad Ejecutora:__<u>{pedido.NombreUE}</u>_________________________________________________________________________
            Nombre Unidad/Depto/Seccion solicitante:__<u>{pedido.Solicitante}</u>______________________________________________________
            Fecha de la solicitud:___<u>{pedido.Fecha}</u>__Telefono/ext:__<u>{pedido.Telefono}</u>____________________________________         
            </strong>
            </p>
            </div>
            <div className='card'>
            <DataTable value={pedidoDetalle} responsiveLayout="scroll">
                    <Column field="ID" header="No."/>
                    <Column field="Cant" header="Cantidad Solicitada"/>
                    <Column field="CantA" header="Cantidad Autorizada"/>
                    <Column field="COI" header="Codigo de Insumo"/>
                    <Column field='Descripcion' header="Descripcion del bien o servicio solicitado" />
                    <Column field='RA' header="Renglon Afectado"/>
                    <Column field='VA' header="Valor estimado en quetzales" />
                    <Column field='PAAC' header="Incluido en PAAC" />
                    <Column field='CAB' header="Esta en contrato abierto"/>
            </DataTable>
            </div>
            <br/>
            <p>
            <strong>
            Justificacion/Observacion:____<u> {pedido.JO}</u>____________________________________
            </strong>
            </p>
            <br/>
            <p>
                <b><u>Solicitante:</u></b>
            ___<u>{pedido.Nombre}</u>_________   ________________________  ____________<u>{pedido.Cargo}</u>_________
             Nombre completo Servidor Publico              Firma                                Cargo
            </p>
        </div>
    )
}