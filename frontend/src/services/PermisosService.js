import axios from "axios";

export class PermisosService {
    url = "http://localhost:8080/permisos/";

    async create(permisos){
        const res = await axios.post(this.url, permisos);
        return res.data;
    }
    async readAll(){
        const res = await axios.get(this.url);
        return res.data;
    }
    async update(permisos){
        const res = await axios.put(this.url + permisos.id, permisos);
        return res.data;
    }
    async delete(id){
        const res = await axios.delete(this.url + id);
        return res.data;
    }
}