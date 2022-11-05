import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useDispatch } from "react-redux";
import { register } from '../actions/auth';

const ReactFinalFormDemo = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({}); // eslint-disable-line react-hooks/exhaustive-deps

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = (data) => {
        let errors = {};

        if (!data.nombre) {
            errors.nombre = 'Name is required.';
        }

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        if (!data.nroCelular){
            errors.nroCelular = "Numero de celular es requerido"
        }

        return errors;
    };

    const onSubmit = (data, form) => {
        
        setFormData(data);

        dispatch(register(null, data.nombre, data.email, data.password, data.nroCelular, data.direccion, 1))
        .then(() => {
            setShowMessage(true);
            navigate("/login");
            window.location.reload();
        })
        .catch(() => {
            form.restart();
        });
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimo 8 caracteres</li>
            </ul>
        </React.Fragment>
    );

    return (

        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>


            <div className="flex justify-content-center">
                    <div className='card card-container'>
                    <h5 className="text-center">Registrarse</h5>
                    <Form onSubmit={onSubmit} initialValues={{ nombre: '', email: '', password: '', nroCelular: '', direccion: ''}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field name="nombre" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText placeholder='Juanito Perez'  id="nombre" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="nombre" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nombre*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} placeholder='example@gmail.com'/>
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="nroCelular" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <InputText id="nroCelular" placeholder='+502 XXXX-XXXX' {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="nroCelular" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contacto*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="direccion" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <InputTextarea id="direccion" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} rows={5} cols={30} autoResize/>
                                        <label htmlFor="direccion" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Direccion*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Button type="submit" label="Ingresar" className="mt-2" />
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}

export default ReactFinalFormDemo;