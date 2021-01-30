import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = ({ history }) => {
  const alertaContext = useContext(AlertaContext);
  const authContext = useContext(AuthContext);

  const { alerta, mostrarAlerta } = alertaContext;
  const { registrarUsuario, mensaje, autenticado } = authContext;

  useEffect(() => {
    if (autenticado) history.push("/proyectos");

    if (mensaje) mostrarAlerta(mensaje.message, "alerta-error");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, history]);

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const { nombre, email, password, confirmar } = usuario;
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de almenos 6 caracteres",
        "alerta-error"
      );
      return;
    }
    if (password !== confirmar) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
      return;
    }
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };
  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.message}</div>
      )}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener Cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu password"
              onChange={onChange}
              value={confirmar}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Registrar"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
