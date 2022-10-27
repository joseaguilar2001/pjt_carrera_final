import axios from "axios";

export class UsuarioService {
    url = "http://localhost:8080/usuario/";

    async create(usuario){
        const res = await axios.post(this.url, usuario);
        return res.data;
    }
    async readAll(){
        const res = await axios.get(this.url);
        return res.data;
    }
    async update(usuario){
        const res = await axios.put(this.url + usuario.id, usuario);
        return res.data;
    }
    async delete(id){
        const res = await axios.delete(this.url + id);
        return res.data;
    }
}