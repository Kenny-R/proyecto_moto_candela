import React, { useState, useEffect } from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

import { CamposRepuestos } from "../../Utilidades/Constantes/CamposMotosRepuestos";
import { peticionObtenerProductos } from "../../Utilidades/FetchApis/PeticionesBD";

import {
  clasificar,
  obtenerClases,
} from "../../Utilidades/funciones/funcionesAplanarDatos";

/**
 * Función que crea un objeto de datos para un repuesto.
 *
 * @param {string} nombre - El nombre del repuesto.
 * @param {string} codigo - El código de parte del repuesto.
 * @param {string} modelo - El modelo del repuesto.
 * @param {React.Component} acciones - Componente de acciones para el repuesto.
 * @returns {object} - Objeto de datos para el repuesto.
 */
function crearDatos(nombre, codigo, modelo, acciones) {
  return {
    Nombre: nombre,
    "Código de parte": codigo,
    Modelo: modelo,
    Acciones: acciones,
  };
}

const columnas = ["Nombre", "Código de parte", "Modelo", "Acciones"];

/**
 * Componente de la página de Repuestos.
 */
const Repuestos = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  /**
   * Función asincrónica que obtiene los repuestos de la base de datos.
   */
  const obtenerRepuestos = async () => {
    setCargando(true);
    try {
      const respuesta = await peticionObtenerProductos("Repuestos");

      if (!respuesta.ok) {
        throw new Error(
          `Ocurrio un error. Estado de respuesta: ${respuesta.status}`
        );
      }
      const contenido = await respuesta.json();
      const repuestos = contenido.map((repuesto) => {
        return crearDatos(
          repuesto["Nombre"],
          repuesto["Código de parte"],
          repuesto["Modelo"],
          <Acciones
            motos={false}
            producto={repuesto}
            obtenerProductos={obtenerRepuestos}
            productoClasificado={clasificar(
              obtenerClases(CamposRepuestos),
              repuesto
            )}
          />
        );
      });
      setDatos(repuestos);
      setCargando(false);
    } catch (err) {
      console.log(err);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerRepuestos();
  }, []);

  return (
    <>
      <PlantillaPagina
        nombreLista="Lista de Repuestos"
        filas={datos}
        columnas={columnas}
        camposModal={CamposRepuestos}
        tipoProducto={"Repuestos"}
        obtenerProductos={obtenerRepuestos}
        cargando={cargando}
        columnasAFiltrar={[columnas[0], columnas[1]]}
      />
    </>
  );
};

export default Repuestos;
