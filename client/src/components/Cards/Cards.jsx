//uso accion getDogs y le asigna la info a DogCard
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getDogs } from "../../redux/actions/actions";
import { DogCard } from "../DogCard/DogCard";
import { Link } from "react-router-dom";
import estilos from "./Cards.module.css";
import { Loading } from "../Loading/Loading.jsx";
import gif from '../../dog-sad.gif'

export const Cards = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const dog = useSelector((state) => state.filteredDogs?.flat());
  const currentPage = useSelector((state) => state.currentPage); //mi estado de redux que es 1
  const cardsPP = useSelector((state) => state.cardsPP); // mi estado de redux que es 8

  const indexOfLastItem = currentPage * cardsPP;
  const indexOfFirstItem = indexOfLastItem - cardsPP;
  const currentItems = dog.slice(indexOfFirstItem, indexOfLastItem); //divido las tarjetas qeu se van a mostrar a partir de sus indices

  useEffect(() => {
    if (!error) {
      dispatch(getDogs());
    }
  }, [dispatch]);

  let loading = true;
  if (dog.length !== 0) {
    loading = false;
  }

  // console.log("SOY DOG FILTERED DE CARDS", dog);
  // console.log('SOY CURRENT ITEMS DE CARDS', currentItems)

  return (
    <div className={estilos.contenedorTotal}>
      {loading ? (
       <Loading />
      ) : 
      (currentItems[0] ?
        currentItems.map((e) => {
          // console.log('SOY CURRENT ITEMS', currentItems[0])
          return (
            <div>
              <div className={estilos.contenedorTarjeta}>
                {e && (
                  <Link to={`/api/breed/${e.id}`} className={estilos.link}>
                    <DogCard
                      id={e.id}
                      image={e.image}
                      name={e.name}
                      weight={e.weight}
                      lifeSpan={e.lifeSpan}
                      temperament={e.temperament}
                    />
                  </Link>
                )}
              </div>
            </div>
          );
        })
       : 
       (
        <div className={estilos.noCoincidences}>
          <h1>No se encontraron coincidencias :(</h1>
          <img
            className={estilos.gif}
            src={gif}
            alt=":("
          />
        </div>)
      )}
    </div>
  );
};
