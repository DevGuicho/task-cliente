import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import TareaReducer from "./tareaReducer";
import tareaContext from "./tareaContext";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareas: [
      { nombre: "Elegir plataforma", estado: true, id: 1, proyectoId: 1 },
      {
        nombre: "Elegir plataforma de pago",
        estado: false,
        id: 2,
        proyectoId: 1,
      },
      { nombre: "Elegir plataforma", estado: true, id: 3, proyectoId: 2 },
      { nombre: "Elegir plataforma", estado: false, id: 4, proyectoId: 2 },
      { nombre: "Elegir plataforma", estado: true, id: 5, proyectoId: 1 },
      { nombre: "Elegir plataforma", estado: false, id: 6, proyectoId: 2 },
    ],
    tareasProyecto: null,
    errorTarea: false,
    tareaSeleccionada: null,
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  const obtenerTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };
  const agregarTarea = (tarea) => {
    tarea.id = uuidv4();
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };
  const eliminarTarea = (tareaId) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: tareaId,
    });
  };
  const cambiarEstadoTarea = (tarea) => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea,
    });
  };
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };
  const actualizarTarea = (tarea) => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea,
    });
  };

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };
  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
