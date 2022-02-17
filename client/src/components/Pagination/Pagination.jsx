import React from "react";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../redux/actions/actions";
import estilos from "./Pagination.module.css";

export default function Pagination() {
  const dispatch = useDispatch();
  const dogState = useSelector((state) => state.dogs);
  const filteredDogs = useSelector((state) => state.filteredDogs);
  const cardsPP = useSelector((state) => state.cardsPP);
  const currentPage = useSelector((state) => state.currentPage);
  const pageNumbers = [];
  const pageFiltered = [];
  // const [currentPage, setCurrentPage] = useState(1)
  // const indexOfLastItem = currentPage * cardsPP;
  // const indexOfFirstItem = indexOfLastItem - cardsPP;
  // const currentItems = dogState.slice(indexOfFirstItem, indexOfLastItem); //divido las tarjetas qeu se van a mostrar a partir de sus indices

  for (let i = 1; i <= Math.ceil(dogState?.flat().length / cardsPP); i++) {
    //condiciono el for con la cantidad de perros que tengo dividido la cantidad de perros por pagina, entonces obtengo el numero total de paginas que tendre
    pageNumbers.push(i); // pusheo a mi arreglo el numero de paginas que voy a tener
  }

  for (let i = 1; i <= Math.ceil(filteredDogs.flat().length / cardsPP); i++) {
    pageFiltered.push(i);
  }

  const handlePrev = () => {
    let prevPage = currentPage - 1;
    if (currentPage > 1) {
      dispatch(changePage(prevPage));
    } else {
      alert("No se puede retroceder");
    }
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (filteredDogs) {
      if (currentPage < pageFiltered.length) {
        dispatch(changePage(nextPage));
      } else {
        alert("No se puede adelantar");
      }
    } else {
      if (currentPage < pageNumbers.length) {
        dispatch(changePage(nextPage));
      } else {
        alert("No se puede adelantar");
      }
    }
  };

  const handleFirst = (e) => {
    e.preventDefault();
    dispatch(changePage(pageFiltered[0]));
  };

  const handleLast = (e) => {
    e.preventDefault();
    if (filteredDogs) {
      dispatch(changePage(pageFiltered.length));
    } else {
      dispatch(changePage(pageNumbers.length));
    }
  };

  return (
    <div className={estilos.contenedorTotal}>
      <div className={estilos.container}>
        <button onClick={handlePrev} className={estilos.btn}>
          Anterior
        </button>
        <button className={estilos.btnPage} onClick={handleFirst}>
          {pageFiltered[0]}
        </button>
        <div className={estilos.currentPage}>{currentPage}</div>
        <button className={estilos.btnPage} onClick={handleLast}>
          {pageFiltered.length}
        </button>
        <button onClick={handleNext} className={estilos.btn}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
