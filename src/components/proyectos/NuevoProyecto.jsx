import React, { Fragment, useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    mostrarFormulario,
    errorFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    if (nombre === "") {
      mostrarError();
      return;
    }

    agregarProyecto(proyecto);
    setProyecto({
      nombre: "",
    });
  };
  const { nombre } = proyecto;
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={mostrarFormulario}
      >
        Nuevo Proyecto
      </button>
      {formulario && (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            id=""
            onChange={onChangeProyecto}
            value={nombre}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      )}
      {errorFormulario && (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      )}
    </Fragment>
  );
};

export default NuevoProyecto;
