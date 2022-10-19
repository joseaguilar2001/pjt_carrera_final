import React from "react";

const presentacionList = ({presentacion, setpresentacion, presentaciones, setlistUpdated}) =>{
    //DELETE
    const handleDelete =id=>{
        //Consulta
        const requestInit = {
            method:'DELETE'
        }
        fetch('http://localhost:8080/presentacion/'+id, requestInit)
        .then(res=>res.json())
        .then(res=>console.log(res))

        setlistUpdated(true)
    }
    //UPDATE PUT
    let{nombre} = presentacion;
    const handleUpdate =id=>{
        if(nombre === ''){
            alert('Llenar campos obligatorios')
            return
        }
        //Consulta
        const requestInit = {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(presentacion)
        }
        fetch('http://localhost:8080/presentacion/'+id, requestInit)
        .then(res=>res.json())
        .then(res=>console.log(res))

        setpresentacion({
            nombre: '',
            estado: 0
        })

        setlistUpdated(true)
    }
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Presentación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {presentaciones.map(presentacion => (
                    <tr key={presentacion.id}>
                        <td>{presentacion.id}</td>
                        <td>{presentacion.presentacion}</td>
                        <td>{presentacion.estado ? 'Activo':'Inactivo'}</td>
                        <td>
                            <div className="mb-3">
                                <button onClick={()=>handleUpdate(presentacion.id)} className="btn btn-info">Editar</button>
                                
                                <button onClick={()=>handleDelete(presentacion.id)} className="btn btn-danger">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default presentacionList;