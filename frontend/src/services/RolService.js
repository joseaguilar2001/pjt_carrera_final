import axios from "axios";

export class RolService {
    url = "http://localhost:8080/rol/";

    async create(rol){
        const res = await axios.post(this.url, rol);
        return res.data;
    }
    async readAll(){
        const res = await axios.get(this.url);
        return res.data;
    }
    async update(rol){
        const res = await axios.put(this.url + rol.id, rol);
        return res.data;
    }
    async delete(id){
        const res = await axios.delete(this.url + id);
        return res.data;
    }
}