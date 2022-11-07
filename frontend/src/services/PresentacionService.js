import axios from "axios";

export class PresentacionService {
    url = "http://localhost:8080/presentacion/";

    create(presentacion){
        return axios.post(this.url, presentacion).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(presentacion){
        return axios.put(this.url+presentacion.id, presentacion).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}