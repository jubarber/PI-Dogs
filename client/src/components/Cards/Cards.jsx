//uso accion getDogs y le asigna la info a DogCard
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getDogs } from "../../redux/actions/actions";
import { DogCard } from "../DogCard/DogCard";
import { Link } from "react-router-dom";
import { DogDetail } from "../DogDetail/DogDetail";
import estilos from "./Cards.module.css";

export const Cards = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const dog = useSelector((state) => state.filteredDogs.flat());

  useEffect(() => {
    if (!error) dispatch(getDogs());
  }, []);

  // console.log("SOY DOG FILTERED.FLAT", dog);

  return (
    <div>
      {!error ? (
        dog &&
        dog.map((e) => {
          //dog es un array con dos array dentro, uno para los perros de la api y otro para mi base de datos
          // console.log('SOY E', e)
          // return (e && e.map((e) =>{ // aca mapeo entonces cada uno de los dos arreglos para acceder a cada objeto perro y renderizar la carta de cada uno
          // console.log("SOY E", e);
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
                      temperament={e.temperament}
                    />
                  </Link>
                )}
              </div>
            </div>
          );
          // }))
        })
      ) : (
        <div>No hay coincidencias con la raza ingresada</div>
      )}
    </div>
  );
};
