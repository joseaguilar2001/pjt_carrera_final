import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/usuarios/usuarios";


const AddUser = () => {
    const [rol, setRol] = useState([""]);
    useEffect(() => {
        axios
        .get("http://localhost:8080/rol")
        .then((response) => {
            const dataArray = [];
            for(let i = 1; i < Object.keys(response.data).length; i++){
                dataArray.push(response.data[i]);
            }
            setRol(dataArray);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    const initialUserState = {
        id: null,
        idRol: "",
        nombre: "",
        email: "",
        password: "",
        nroCelular: "",
        direccion: "",
        estado: 1,
    };
    const [usuario, setUsuario] = useState(initialUserState);
    const [submitted, setSumitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const {name, value} = event.target;
        setUsuario({...usuario, [name]: value});
    };
    const saveUsuario = () => {
        const {idRol, nombre, email, password, nroCelular, direccion} = usuario;
        dispatch(createUser(idRol, nombre, email, password, nroCelular, direccion))
        .then(data => {
            setUsuario({
                id: data.id,
                idRol: data.idRol,
                nombre: data.nombre,
                email: data.email,
                password: data.password,
                nroCelular: data.nroCelular,
                direccion: data.direccion,
                estado: data.estado,
            });
            setSumitted(true);
        })
        .catch(e => {
            console.log(e);
        });
    };
    const newUser = () => {
        setUsuario(initialUserState);
        setSumitted(false);
    };
    return(
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Agregado con exito</h4>
                    <button className="btn btn-success" onClick={newUser}>
                        Agregar
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <select required name="roles" className="form-control">
                            <option>Elije un rol</option>
                            {rol.map((el) => {
                                return(
                                    <option key={el} value={usuario.idRol}>
                                        {el}
                                    </option>
                                );
                            })}             
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={usuario.nombre}
                            onChange={handleInputChange}
                            name="nombre"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Email</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={usuario.email}
                            onChange={handleInputChange}
                            name="nombre"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={usuario.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nroCelular">Numero de Celular</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="nroCelular"
                            required
                            value={usuario.nroCelular}
                            onChange={handleInputChange}
                            name="nroCelular"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Direccion</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="direccion"
                            required
                            value={usuario.direccion}
                            onChange={handleInputChange}
                            name="direccion"
                        />
                    </div>
                    <button onClick={saveUsuario} className="btn btn-success">
                        Agregar
                    </button>
                </div>
            )} 
        </div>
    );
};


export default AddUser;









