import React, { useContext, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import proyectoContext from "../../context/proyectos/proyectoContext";
import alertaContext from "../../context/alertas/alertaContext";
import Proyecto from "./Proyecto";

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const AlertaContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = AlertaContext;

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.message, mensaje.categoria);
    }
    obtenerProyectos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje]);

  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.message}</div>
      )}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
