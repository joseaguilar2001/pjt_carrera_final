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
        vistaServicePedido.readAllPedido(1)
        .then(data => setPedido(data));
        
        vistaServicePedido.readAllPedidoDetalle(1)
        .then(data => setPedidoDetalle(data));
    },[id, vistaServicePedido]);
    const pedidoDatos = {
        codigoUE: pedido.map((e) => e.CodigoUE),
        correlativo:pedido.map((e) => e.Correlativo),
        nombreUE: pedido.map((e) => e.NombreUE),
        solicitante: pedido.map((e) => e.Solicitante),
        fecha: pedido.map((e) => e.Fecha),
        telefono: pedido.map((e) => e.Telefono),
        JO: pedido.map((e) => e.JO),
        nombreS: pedido.map((e) => e.NombreS),
        cargo: pedido.map((e) => e.Cargo),
    }

    return (
        <div>
            <div className='flex justify-content-right'>
            <h4>Solicitud de Pedido</h4>
            <p>Codigo Unidad Ejecutora:__<u>{pedidoDatos.codigoUE}</u>____ Correlativo Seccion de Compras UE: ___<u>{pedidoDatos.correlativo}</u>___</p>
            <p>Nombre Unidad Ejecutora:__<u>{pedidoDatos.nombreUE}</u>_________________________________________________________________________</p>
            <p>Nombre Unidad/Depto/Seccion solicitante:__<u>{pedidoDatos.solicitante}</u>______________________________________________________</p>
            <br/>
            <p>Fecha de la solicitud:___<u>{pedidoDatos.fecha}</u>__Telefono/ext:__<u>{pedidoDatos.telefono}</u>____________________________________</p>     
            
            </div>
            <div>
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
            <p>
            <strong>
            Justificacion/Observacion:____<u> {pedidoDatos.JO}</u>____________________________________
            </strong>
            </p>
            <br/>
            <p>
                <b><u>Solicitante:</u></b>
            </p>
            <p>___<u>{pedidoDatos.nombreS}</u>_________&nbsp;&nbsp;&nbsp;________________________&nbsp;&nbsp;&nbsp;____________<u>{pedidoDatos.cargo}</u>_________</p>
            <p>Nombre completo Servidor Publico &nbsp;&nbsp;&nbsp;       Firma    &nbsp;&nbsp;&nbsp;&nbsp;                            Cargo                            </p>
            
        </div>
    )
}
export default VistaTable;