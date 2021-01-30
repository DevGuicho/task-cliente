import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = ({ history }) => {
  const alertaContext = useContext(AlertaContext);
  const authContext = useContext(AuthContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const { iniciarSesion, mensaje, autenticado } = authContext;

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const { email, password } = usuario;

  useEffect(() => {
    if (autenticado) history.push("/proyectos");

    if (mensaje) mostrarAlerta(mensaje.message, "alerta-error");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, history]);
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }
    iniciarSesion({ email, password });
  };
  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.message}</div>
      )}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              value="Iniciar Sesion"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
