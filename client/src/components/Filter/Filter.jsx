import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getDogs } from "../../redux/actions/actions";
import { filtrar, filtrarRaza } from "../../redux/actions/actions";
import estilos from "./Filter.module.css";

export const Filter = () => {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    //obtengo temperamentos
    dispatch(getTemperaments());
    dispatch(getDogs());
    console.log("SOY DOGS", dogs);
  }, [dispatch]);

  function handleSelectTemp(e) {
    // e.preventDefault();
    dispatch(filtrar(e.target.value));
  }

  function handleSelectRaza(e) {
    dispatch(filtrarRaza(e.target.value));
  }

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.cont}>
        <select onChange={handleSelectRaza} className={estilos.selectRaza}>
          <option value="default">Filtrar por origen</option>
          <option value="dataBase">Perros creados</option>
          <option value="api">Perros existentes</option>
        </select>
      </div>
      <div className={estilos.cont}>
        <select
          id="types"
          onChange={handleSelectTemp}
          className={estilos.select}
        >
          <option value="default">Filtrar por temperamento</option>
          {temperamentos &&
            temperamentos.map((e) => {
              return (
                <option key={e.id} value={e.name} name={e.name}>
                  {e.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};
