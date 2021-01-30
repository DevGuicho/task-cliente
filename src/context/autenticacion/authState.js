import React, { useReducer } from "react";
import {
  CERRAR_SESION,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  OBTENER_USUARIO,
  REGISTRO_ERROR,
  REGISTRO_EXITOSO,
} from "../../types";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import authToken from "../../config/tokenAuth";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        message: error.response.data.message,
        categoria: "alerta-error",
      };
      dispatch({ type: REGISTRO_ERROR, payload: alerta });
    }
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      authToken(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth/", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.data,
      });

      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        message: error.response.data.message,
        categoria: "alerta-error",
      };
      dispatch({ type: LOGIN_ERROR, payload: alerta });
    }
  };
  const cerrarSesion = () => {
    dispatch({ type: CERRAR_SESION });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
