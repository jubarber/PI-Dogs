import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getDogs, changePage, filtrar, filtrarRaza } from "../../redux/actions/actions";
import estilos from "./Filter.module.css";

export const Filter = () => {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperaments);
  const filteredDogs = useSelector((state) => state.filteredDogs);
  const cardsPP = useSelector((state) => state.cardsPP);
  const [temporal, setTemporal] = useState([]);
  const pageFiltered = [];


  for (let i = 1; i <= Math.ceil(filteredDogs.flat().length / cardsPP); i++) {
    pageFiltered.push(i);
  }

  useEffect(() => {
    //obtengo temperamentos
    dispatch(getTemperaments());
    dispatch(getDogs());
    // console.log("SOY DOGS", dogs);
  }, [dispatch]);

  // function handleDelete(e) {
  //   let temperamentFiltered = temporal.filter((el) => el !== e);
  //   setTemporal(temperamentFiltered);
  // }
  function handleSelectTemp(e) {
    // e.preventDefault();
    dispatch(filtrar(e.target.value));
    setTemporal(e.target.value);
    if(temporal){
      dispatch(changePage(pageFiltered[0]))
    }
  }

  function handleSelectRaza(e) {
    dispatch(filtrarRaza(e.target.value));
  }

  // const handleSelectTemp = (e) => {
  //   e.preventDefault();
  //   if (temporal.includes(e.target.value)) {
  //     alert("Ya ha seleccionado este temperamento");
  //   } else {
  //     setTemporal([...temporal, e.target.value]);
  //   }
  // };

  // function handleChangePage(){
  //   console.log('ENTRE AL HANDLE PAGE')
  //   if(temporal){
  //     dispatch(changePage(pageFiltered[0]))
  //   }
  // }

  return (
    <div className={estilos.contenedor}>
      {/* <div className={estilos.contenedorSelects}> */}
      <div className={estilos.contSelect}>
        <select onChange={handleSelectRaza} className={estilos.selectRaza}>
          <option value="default" disabled selected>
            Filtrar por origen
          </option>
          <option value="dataBase">Perros creados</option>
          <option value="api">Perros existentes</option>
        </select>
      </div>
      <div className={estilos.contSelect}>
        <select
          id="types"
          onChange={handleSelectTemp}
          className={estilos.selectTemp}
        >
          <option value="default" disabled selected>
            Filtrar por temperamento
          </option>
          {temperamentos &&
            temperamentos.map((e) => {
              return (
                <option key={e.id} value={e.name} name={e.name}>
                  {e.name}
                </option>
              );
            })}
        </select>
        {/* </div> */}
        {/* <div className={estilos.inputGroup}>
          {temporal?.map((e) => {
            return (
              <div key={e} className={estilos.inputTemp}>
                {e}
                <button
                  className={estilos.buttonX}
                  onClick={() => handleDelete(e)}
                >
                  X
                </button>
                </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};
