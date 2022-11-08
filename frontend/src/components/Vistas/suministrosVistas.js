import React, { useState, useEffect } from 'react';
import { VistasService } from '../../services/VistasService';
import Table from 'react-bootstrap/Table';
const VistaTableSum = () => {
    const [suministros, setSuministros] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const vistaServicePedido = new VistasService();

    useEffect(() => {
        vistaServicePedido.readAllSuministros()
        .then(data => setSuministros(data));
    },[vistaServicePedido]);
    return (
        <div>
            <div>
                <p>AREA DE SALUD<u>___RETALHULEU___</u>DEPENDENCIA<u>____HOSPITAL_______</u></p>
                <p>DESCRIPCION<u>___ANTIGENO PROSTATICO___</u>CODIGO<u>____________</u></p>
            </div>
        <p></p>
        <Table border={2} bordered={4} hover>
            <thead>
                <tr>
                    <th>FECHA</th>
                    <th>NO. DE REF</th>
                    <th>REMITENTE/DESTINATARIO</th>
                    <th>
                        <tr colSpan={2} align="middle">ENTRADA</tr>
                        <tr>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        </tr>
                    </th>  
                    <th>FECHA VENCIMIENTO</th>
                    <th>NUMERO DE LOTE</th>
                    <th>
                        <tr colSpan={2}>SALIDA</tr>
                        <tr>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        </tr>
                    </th>
                    <th>
                        <tr colSpan={2}>REAJUSTE</tr>
                        <tr>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        </tr>
                    </th>
                    <th>
                        <tr colSpan={2}>SALDO</tr>
                        <tr>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        </tr>
                    </th>
                    <th>FECHA REQUISICION</th>
                </tr>
            </thead>
            <tbody>
                {suministros.map((e) => 
                    <tr>
                        <td>{e.FDK}</td>
                        <td>{e.IDK}</td>
                        <td>{e.Remitente}</td>
                        <td>{e.EntradaC}</td>
                        <td>{e.EntradaP}</td>
                        <td>{e.FDK}</td>
                        <td>{e.LoteCorrelativo}</td>
                        <td>{e.SalidaC}</td>
                        <td>{e.SalidaP}</td>
                        <td>{e.ReajusC}</td>
                        <td>{e.ReajusP}</td>
                        <td>{e.SaldoC}</td>
                        <td>{e.SaldoP}</td>
                        <td>{e.FechaReq}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
    );
}

export default VistaTableSum;