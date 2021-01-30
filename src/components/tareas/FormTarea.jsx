import React, { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    tareaSeleccionada,
    agregarTarea,
    validarTarea,
    errorTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);
  const [tarea, setTarea] = useState({
    nombre: "",
  });
  const { nombre } = tarea;

  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    if (tareaSeleccionada === null) {
      tarea.proyecto = proyectoActual._id;
      tarea.estado = false;

      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
      limpiarTarea();
    }

    obtenerTareas(proyectoActual.id);
    setTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            name="nombre"
            id=""
            className="input-text"
            placeholder="Nombre Tarea"
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTarea && (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      )}
    </div>
  );
};

export default FormTarea;
