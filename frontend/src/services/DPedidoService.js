import axios from "axios";

export class DPedidoService {
    url = "http://localhost:8080/pedidodetalle/";

    create(dePedido){
        return axios.post(this.url, dePedido).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(dePedido){
        return axios.put(this.url+dePedido.id, dePedido).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}