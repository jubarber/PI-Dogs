import React from "react";
import estilos from "./DogCard.module.css";
import imgDog from "../../img/imgDog.jpg";

export const DogCard = (props) => {
  let imgUrl = `https://cdn2.thedogapi.com/images/${props.image}.jpg`;
  if (props.image?.length > 15) {
    imgUrl = props.image;
  }

  // console.log("SOY PROPS DE DOG CARD", props);

  return (
    <div key={props.id} className={estilos.cuerpoTarjeta}>
      <img
        className={estilos.imagen}
        src={imgUrl}
        alt={props.name}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = imgDog;
        }}
      />
      <p>Nombre: {props.name}</p>
      <p>Peso: {props.weight}</p>
      <p>Anios de vida: {props.lifeSpan}</p>
      <p>Temperamento: {props.temperament}</p>
      <div className={estilos.contenedorVerMas}>
      <p className={estilos.verMas}>Click para ver más</p>
      </div>
    </div>
  );
};
