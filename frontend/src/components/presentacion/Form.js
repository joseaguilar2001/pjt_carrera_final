import React from "react";

const Form =({presentacion, setpresentacion}) =>{
    const handleChange = e=>{
        setpresentacion({
            ...presentacion,
            [e.target.name]:e.target.value
        })
    }
    //INSERT POST
    let{nombre, estado} = presentacion;
    const handleSubmit =()=>{
        estado = parseInt(estado,10);
        console.log(nombre);
        //Validacion de los datos
        if(nombre === ''){
            alert('Llenar campos obligatorios')
            return
        }
        //Consulta
        const requestInit = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(presentacion)
        }
        fetch('http://localhost:8080/presentacion', requestInit)
        .then(res=>res.json())
        .then(res=>console.log(res))

        //Reiniciando state de presentacion
        setpresentacion({
            nombre: '',
            estado: 0
        })


    }
    return(
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="presentacion" className="form-label">Presentación</label>
                <input value={nombre} name="presentacion" onChange={handleChange} type="text" id="presentacion" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="estado" className="form-label">Estado</label>
                <select  className="form-control" id="estado" name="estado" onChange={handleChange}>
                    <option value='1'>Activo</option>
                    <option value='0'>Inactivo</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    );
}

export default Form;