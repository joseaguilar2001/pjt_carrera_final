import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Este atributo es requerido
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        No es un email valido
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 3 || value !== ' ') {
    return (
      <div className="invalid-feedback d-block">
        El nombre no esta bien escrito
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        La contraseña es muy debil
      </div>
    );
  }
};

const vnroCelular = (value) => {
  if (value.length < 8 || value.length > 9) {
    return (
      <div className="invalid-feedback d-block">
        No es un numero de celular
      </div>
    );
  }
};

const vdireccion = (value) => {
  if (value.length < 8) {
    return (
      <div className="invalid-feedback d-block">
        La direccion es muy corta
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nroCelular, setNroCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeNroCelular = (e) => {
    const nroCelular = e.target.value;
    setNroCelular(nroCelular);
  }

  const onChangeDireccion = (e) => {
    const direccion = e.target.value;
    setDireccion(direccion);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(name, email, password, nroCelular, direccion, 1).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
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
                <label htmlFor="name">Nombre Completo</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required, vname]}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nroCelular">nroCelular</label>
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
                  type="nroCelular"
                  className="form-control"
                  name="nroCelular"
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
                <label htmlFor="password">Password</label>
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
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
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