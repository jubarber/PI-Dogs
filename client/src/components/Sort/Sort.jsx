import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NOMBRE_ASCENDENTE,
  NOMBRE_DESCENDENTE,
  PESO_ASCENDENTE,
  PESO_DESCENDENTE,
  EDAD_ASCENDENTE,
  EDAD_DESCENDENTE
} from "../../constantes/sort";
import { changePage, sort } from "../../redux/actions/actions";
import estilos from "./Sort.module.css";

export const Sort = () => {
  const dispatch = useDispatch();
  const filteredDogs = useSelector((state) => state.filteredDogs);
  const cardsPP = useSelector((state) => state.cardsPP);
  const [temporal, setTemporal] = useState([]);
  const pageFiltered = [];


  for (let i = 1; i <= Math.ceil(filteredDogs.flat().length / cardsPP); i++) {
    pageFiltered.push(i);
  }


  function onSelectChange(e) {
    if (e.target.value !== "default") {
      dispatch(sort(e.target.value));
    }
    setTemporal(e.target.value);
    if(temporal){
      dispatch(changePage(pageFiltered[0]))
    }
  }

  return (
    <select name="select" onChange={onSelectChange} className={estilos.select}>
      <option value="default" disabled selected>
        Ordenar por:{" "}
      </option>
      <option value={NOMBRE_ASCENDENTE}>Nombre ascendente</option>
      <option value={NOMBRE_DESCENDENTE}>Nombre descendente</option>
      <option value={PESO_ASCENDENTE}>Peso ascendente</option>
      <option value={PESO_DESCENDENTE}>Peso descendente</option>
      <option value={EDAD_ASCENDENTE}>Edad ascendente</option>
      <option value={EDAD_DESCENDENTE}>Edad descendente</option>
    </select>
  );
};
