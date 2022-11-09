import React from "react";
import fondo1 from "../images/fondo1.jpg";
import fondo2 from "../images/fondo2.jpg";
import fondo3 from "../images/fondo3.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return (
    <div className="about-container">
      <div className="about-desc">
        <h3>Hospital Nacional de Retalhuleu</h3>
        <p align="justify">
          Este centro médico es una entidad hospitalaria, que depende
          del Ministerio de Salud Pública y Asistencia Social de Guatemala, y es
          responsable de promover la atención en salud, con calidad y respeto a los
          pacientes que lo necesiten, mediante la atención en prevención, recuperación
          y rehabilitación de enfermedades. Así pues, cuentan con un recurso humano que
          hace un excelente uso de las tecnologías del establecimiento para tratar de
          mejorar la vida de quienes necesiten de los servicios médicos.
        </p>
      </div>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={fondo1}
              width={600}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={fondo2}
              width={600}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={fondo3}
              height={500}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>

  );
};

export default Home;