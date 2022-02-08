import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
import { getDogById } from "../../redux/actions/actions.js";
import { DogCard } from "../DogCard/DogCard.jsx";
import { useParams } from "react-router-dom"; // es un hook que te permite acceder como haces en el back con "req.params" al parametro que tiene la url en ese momento desde el front
import estilos from './DogDetail.module.css';
import imgDog from '../../img/imgDog.jpg'



export const DogDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log('SOY PARAMS ID', params.breedId)
  const dog = useSelector((state) => state.dogById);

  const imgUrl = `https://cdn2.thedogapi.com/images/${dog.image}.jpg`;
  if(dog.image?.length > 15){
    imgUrl = dog.image
  }

  
  // console.log('SOY DOG DE DOG DETAIL', dog)

  useEffect(() => {
    dispatch(getDogById(params.breedId));
  }, [dispatch]);

  return (
    <div className={estilos.cuerpoTarjeta}>
      <img
        className={estilos.imagen}
        src={imgUrl}
        alt={dog.name}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = imgDog;
        }}
      />
      <p>Nombre: {dog.name}</p>
      <p>Altura: {dog.height} cm</p>
      <p>Años de vida: {dog.lifeSpan}</p>
      <p>Peso: {dog.weight} kg</p>
      <p>Temperamento: {dog.temperament}</p>
    </div>
  );
};
