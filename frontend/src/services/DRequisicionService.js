import axios from "axios";

export class DRequisicionService {
    url = "http://localhost:8080/detalleRequisicion/";

    create(deRequisicion){
        return axios.post(this.url, deRequisicion).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(deRequisicion){
        return axios.put(this.url+deRequisicion.id, deRequisicion).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}