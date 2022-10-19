import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router';
import {
    retrieveUsers,
    retrieveUsersByNombre,

} from "../../actions/usuarios/usuarios";

const UsuarioList = () => {
    const [ currentUsuario, setCurrentUsuario ] = useState(null);
    const [ currentIndex, setCurrentIndex ] = useState(-1);
    const [ searchNombre, setSearchNombre ] = useState("");

    const usuarios = useSelector( state => state.usuarios);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveUsers());
    }, [dispatch]);

    const onChangeSearchNombre = e => {
        const searchNombre = e.target.value;
        setSearchNombre(searchNombre);
    };

    const refreshData = () => {
        setCurrentUsuario(null);
        setCurrentIndex(-1);
    };

    const setActiveUsuario = (usuario, index) => {
        setCurrentUsuario(usuario);
        setCurrentIndex(index);
    }

    const findByNombre = () => {
        refreshData();
        dispatch(retrieveUsersByNombre(searchNombre));
    }
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        value={searchNombre}
                        onChange={onChangeSearchNombre}
                    />
                    <div className="input-group-append">
                        <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByNombre}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Usuario Lista</h4>
                <ul className="list-group">
                    {usuarios && 
                    usuarios.map((usuario, index) =>(
                        <li className={"list-group-item" + (index === currentIndex ? "active" : "")}
                        onClick={() => setActiveUsuario(usuario, index)}
                        key={index}
                        >
                            {usuario.nombre}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentUsuario ? (
                    <div>
                        <h4>Usuario</h4>
                        <div>
                            <label>
                                <strong>
                                    Nombre:</strong>
                            </label>{" "}
                            {currentUsuario.nombre}
                        </div>
                        <div>
                            <label>
                                <strong>Email:</strong>
                            </label>{" "}
                            {currentUsuario.email}
                        </div>
                        <div>
                            <label>
                                <strong>
                                    Direccion:</strong>
                            </label>{" "}
                            {currentUsuario.direccion}
                        </div>
                        <div>
                            <label>
                                <strong>Contacto:</strong>
                            </label>{" "}
                            {currentUsuario.nroCelular}
                        </div>
                        <div>
                            <label>
                                <strong>Estado:</strong>
                            </label>{" "}
                            {currentUsuario.estado ? "Activo" : "Inactivo"}
                        </div>
                        <Link
                        to={"/usuarios/" + currentUsuario.id}>
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Por favor haga click en un usuario...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsuarioList;



