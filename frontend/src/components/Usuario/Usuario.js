import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../actions/usuarios/usuarios";
import UsuarioDataService from "../../services/usuarios.service";

const Usuario = (props) => {
    const initialUserState = {
        id: null,
        idRol: "",
        nombre: "",
        email: "",
        password: "",
        direccion:"",
        nroCelular: "",
        estado: "",
    };

    const [ currentUsuario, setCurrenteUsuario ] = useState(initialUserState);
    const [ message, setMessage ] = useState("");

    const dispatch = useDispatch();

    const getUsuario = id => {
        UsuarioDataService.get(id)
        .then(response => {
            setCurrenteUsuario(response.data);
        })
        .catch(e => {

        });
    }
    useEffect(() => {
        getUsuario(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrenteUsuario({...currentUsuario, [name]:value});
    };

    const updateStatus = status => {
        const data = {
            id: currentUsuario.id,
            idRol: currentUsuario.idRol,
            nombre: currentUsuario.nombre,
            email: currentUsuario.email,
            password: currentUsuario.password,
            nroCelular: currentUsuario.nroCelular,
            direccion: currentUsuario.direccion,
            estado: currentUsuario.estado
        };
        dispatch(updateUser(currentUsuario.id, data))
        .then(response => {
            setCurrenteUsuario({...currentUsuario, published: status});
            setMessage("El usuario ha sido actualizado");
        })
        .catch(e => {

        });
    };

    const removeUsuario = () => {
        dispatch(deleteUser(currentUsuario.id))
          .then(() => {
            props.history.push("/usuarios");
          })
          .catch(e => {
            console.log(e);
          });
      };
      return (
        <div>
            {currentUsuario ? (
                <div className="edit-form">
                    <h4>Usuario</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="nombre"
                                value={currentUsuario.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="email"
                                value={currentUsuario.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="password"
                                value={currentUsuario.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nroCelular">Numero de Celular</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="nroCelular"
                                value={currentUsuario.nroCelular}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Direccion</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="direccion"
                                value={currentUsuario.direccion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado"><stong>Estado</stong></label>
                            {currentUsuario.estado ? "Activo" : "Inactivo"}
                        </div>
                        {
                            currentUsuario.estado ? (
                                <button
                                className="badge badge-primary mr-2"
                                    onClick={() => updateStatus(false)}>
                                    Desactivar
                                </button>
                            ) : (
                                <button
                                className="badge badge-primary mr-2"
                                    onClick={() => updateStatus(true)}>
                                    Activar
                                </button>
                            )
                        }
                        <button className="badge badge-danger mr-2" onClick={removeUsuario}>
                            Borrar
                        </button>
                        <button
                                type="submit"
                                className="badge badge-success"
                                onClick={updateUser}
                            >
                                Actualizar
                            </button>
                            <p>{message}</p>
                    </form>
                </div>
            ):(
                    <div>
                        <br />
                        <p>Por favor haga click en un usuario...</p>
                    </div>
            )}
        </div>
      );
};

export default Usuario;