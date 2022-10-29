import axios from "axios";

export class PermisosService {
    url = "http://localhost:8080/permisos/";

    create(permisos){
        return axios.post(this.url, permisos).then(res => res.data);
    }
    readAll(){
        return axios.get(this.url).then(res => res.data);
    }
    update(permisos){
        return axios.put(this.url + permisos.id, permisos).then(res => res.data);
    }
    delete(id){
        return axios.delete(this.url + id).then(res => res.data);
    }
}