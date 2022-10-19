import React, {useState, useEffect} from "react";
import PresentacionList from "../components/presentacion/PresentacionList";
import Form from "../components/presentacion/Form";

function PresentacionScreen (){
    const [presentacion, setpresentacion] = useState({
        presentacion: '',
        estado: 0
    });
    const [presentaciones, setpresentaciones] = useState([])
    const [listUpdated, setlistUpdated] = useState(false);
    useEffect(()=>{
        const getPresentacion =()=>{
            fetch('http://localhost:8080/presentacion')
            .then(res=>res.json())
            .then(res=>setpresentaciones(res))
        }
        getPresentacion()
    }, [listUpdated])
    return(
        <div className="container">
            <div className="row">
                <div className="col-7">
                    <h2 style={{textAlign: 'center'}}>Listado de presentaciones</h2>
                    <PresentacionList presentacion={presentacion} setpresentacion={setpresentacion} presentaciones={presentaciones} setlistUpdated={setlistUpdated}/>
                </div>
                <div className="col-5">
                    <h2 style={{textAlign: 'center'}}>Formulario</h2>
                    <Form presentacion={presentacion} setpresentacion={setpresentacion}/>
                </div>
            </div>
        </div>
    );
}

export default PresentacionScreen;