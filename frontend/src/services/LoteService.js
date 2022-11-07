import axios from "axios";

export class LoteService {
    url = "http://localhost:8080/lotes/";

    create(lote){
        return axios.post(this.url, lote).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(lote){
        return axios.put(this.url+lote.id, lote).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}