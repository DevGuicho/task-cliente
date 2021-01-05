import React, { Fragment } from "react";
import Tarea from "./Tarea";

const ListadoTareas = () => {
  const tareasProyecto = [
    { nombre: "Elegir plataforma", estado: true, id: 1 },
    { nombre: "Elegir plataforma de pago", estado: false, id: 2 },
    { nombre: "Elegir plataforma", estado: true, id: 3 },
    { nombre: "Elegir plataforma", estado: false, id: 4 },
  ];
  return (
    <Fragment>
      <h2>Proyecto: Tienda virtual</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareasProyecto.map((tarea) => <Tarea key={tarea.id} tarea={tarea} />)
        )}
      </ul>
      <button type="button" className="btn btn-eliminar">
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
