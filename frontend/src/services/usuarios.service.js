/* eslint-disable import/no-anonymous-default-export */
import http from "../http-common";

const getAll = () => {
    return http.get('/usuario');
};

const get = id => {
    return http.get(`/usuario/${id}`);
};

const getNombre = nombre => {
    return http.get(`/usuario/${nombre}`);
};

const create = data => {
    return http.post('usuario/create', data);
};

const update = (id,data) => {
    return http.put(`/usuario/${id}`, data);
};

const remove = id => {
    return http.delete(`/usuario/${id}`);
};

const UsuarioService = {
    getAll, 
    get,
    getNombre,
    create,
    update,
    remove
}

export default UsuarioService;