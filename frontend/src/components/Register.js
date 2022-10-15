import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡Este componente es requerido!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡No es un Email valido!
      </div>
    );
  }
};

const vnombre = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡El usuario esta muy corto!
      </div>
    );
  }
};

const vnroCelular = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡El numero de celular esta muy corto¡
      </div>
    );
  }
};

const vdireccion = (value) => {
  if (value.length < 3) {
    return (
      <div className="alert alert-danger" role="alert">
        La direccion esta muy corta
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡La contraseña es muy debil!
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nroCelular, setNroCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeNombre = (e) => {
    const nombre = e.target.value;
    setNombre(nombre);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeNroCelular = (e) => {
    const celular = e.target.value;
    setNroCelular(celular);
  }

  const onChangeDireccion = (e) => {
    const direccion = e.target.value;
    setDireccion(direccion);
  } 

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePasswordConfirm = (e) => {
    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();
    if(password !== passwordConfirm)
    {
      return(
        <div className="alert alert-danger" role="alert">
        Las contraseñas no coinciden.
      </div>
      );
    }
    try {
      if (checkBtn.current.context._errors.length === 0) {
        dispatch(register(null, nombre, email, password, nroCelular, direccion, 1))
          .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          });
      } 
    } catch (error) {
      return(
        <div className="alert alert-danger" role="alert">
        ${error.message}
      </div>
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <Input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeNombre}
                  validations={[required, vnombre]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="nroCelular">Contacto</label>
                <Input
                  type="text"
                  className="form-control"
                  name="nroCelular"
                  value={nroCelular}
                  onChange={onChangeNroCelular}
                  validations={[required, vnroCelular]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Direccion</label>
                <Input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={direccion}
                  onChange={onChangeDireccion}
                  validations={[required, vdireccion]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirmacion de contraseña</label>
                <Input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={onChangePasswordConfirm}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Registrar</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;