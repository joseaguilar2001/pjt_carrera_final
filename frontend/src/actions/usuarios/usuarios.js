import {
    CREATE_USER,
    RETRIEVE_USER,
    UPDATE_USER,
    DELETE_USER
  } from "../types";
import UsuarioService from "../../services/usuarios.service";

export const createUser = (idRol, nombre, email, password, nroCelular, direccion) => async (dispatch) => {
    try{
        const res = await UsuarioService.create({idRol, nombre, email, password, nroCelular, direccion});

        dispatch({
            type: CREATE_USER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch(err){
        return Promise.reject(err);
    }
};

export const retrieveUsers = () => async (dispatch) => {
    try {
        const res = await UsuarioService.getAll();
        dispatch({
            type: RETRIEVE_USER,
            payload: res.data,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateUser = (id, data) => async (dispatch) => {
    try {
        const res = await UsuarioService.update(id, data);
        dispatch({
            type: UPDATE_USER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        const res = await UsuarioService.remove(id);
        dispatch({
            type: DELETE_USER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const retrieveUsersByNombre = (nombre) => async (dispatch) => {
    try {
        const res = await UsuarioService.getNombre(nombre);
        dispatch({
            type: RETRIEVE_USER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}