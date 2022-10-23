import {
    CREATE_USER,
    RETRIEVE_USER,
    UPDATE_USER,
    DELETE_USER
  } from "../actions/types";
const initialState = [];

function usuarioReducer(usuario = initialState, action){
    const {type, payload} = action;
    switch(type){
        case CREATE_USER:
            return [...usuario, payload];
        case RETRIEVE_USER:
            return payload;
        case UPDATE_USER:
            return usuario.map((usuario) => {
                if(usuario.id === payload.id){
                    return {
                        ...usuario, 
                        ...payload,
                    }
                }else {
                    return usuario;
                }
            });
        case DELETE_USER:
            return usuario.filter(({id}) => id !== payload.id);
        default: 
            return usuario;
    }
};

export default usuarioReducer;