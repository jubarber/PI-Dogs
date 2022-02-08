import React from "react";
import { useDispatch } from "react-redux";
import { NOMBRE_ASCENDENTE, NOMBRE_DESCENDENTE, PESO_ASCENDENTE, PESO_DESCENDENTE} from "../../constantes/sort";
import { sort } from "../../redux/actions/actions";
import estilos from './Sort.module.css';

export const Sort = () => {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    // console.log('SOY E DE SORT', e.target.value)
    if (e.target.value !== "default") {
      dispatch(sort(e.target.value));
    }
  }

  return (
    <select name="select" onChange={onSelectChange} className={estilos.select}>
      <option value="default">Ordenar por: </option>
      <option value={NOMBRE_ASCENDENTE}>Nombre ascendente</option>
      <option value={NOMBRE_DESCENDENTE}>Nombre descendente</option>
      <option value={PESO_ASCENDENTE}>Peso ascendente</option> 
      <option value={PESO_DESCENDENTE}>Peso descendente</option>
    </select>
  );
};
