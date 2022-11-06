import axios from "axios";

export class VistasService {
    url = "http://localhost:8080/vistas/";

    readAllPedido(id){
        return axios.get(this.url + 'pedido/' + id)
        .then(res => res.data);
    }

    readAllPedidoDetalle(id){
        return axios.get(this.url + 'pedidoDetalle/' + id)
        .then(res => res.data);
    }
}