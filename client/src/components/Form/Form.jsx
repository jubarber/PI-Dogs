import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions/actions.js";
import estilos from "./Form.module.css";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Por favor, ingrese el nombre de la raza";
  } else if (typeof input.name !== "string") {
    errors.name = "Por favor, ingrese solamente letras";
  }
  if (!input.heightMin) {
    errors.height = "Por favor, ingrese la altura mínima";
  } else if (input.heightMin > input.heightMax) {
    errors.height = "La altura mínima no puede ser mayor que la altura máxima";
  }
}

export default function Form() {
  const dispatch = useDispatch();
  const tempState = useSelector((state) => state.temperaments);
  const temp = tempState.data;

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [temporal, setTemporal] = useState([]);

  useEffect(() => { //ESTO NO ANDAAAAAAAAAA
    if (temporal.lenght > 0) {
      let total = temp.reduce((acc, e) => {
        if (temporal.includes(e.name)) {
          acc.push(e.id);
        }
        return acc;
      }, []);
      setInput({ ...input, temperament: total });
    }
  }, [temporal]);

  // const [errores, setErrores] = useState({});
  // const [temperament, setTemperament] = useState([]);
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpan: "",
    temperament: [],
    image: ""
  });

  const handleSelectTemp = (e) => {
    if (temporal.includes(e.target.value)) {
      alert("Ya ha seleccionado este temperamento");
    } else {
      setTemporal([...temporal, e.target.value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDog(input));
    setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      lifeSpan: "",
      temperament: [],
      image: ""
    });
    setTemporal([]);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={estilos.cuerpo}>
      <div className={estilos.form}>
        <div className={estilos.title}>Bienvenid@</div>
        <div className={estilos.subtitle}>Crea tu propia raza de perro!</div>
        <form onSubmit={handleSubmit}>
          <div className={estilos.inputContainer}>
            {/* <label>Nombre: </label> */}
            <input
              className={estilos.input}
              placeholder="Nombre de la raza"
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />

            {/* <label>Altura Mínima: </label> */}
            <div className={estilos.inputGroup}>
              <input
                className={estilos.input}
                placeholder="Altura mínima"
                type="number"
                name="heightMin"
                value={input.heightMin}
                onChange={handleChange}
              />

              {/* <label>Altura Máxima: </label> */}
              <input
                className={estilos.input}
                placeholder="Altura máxima"
                type="number"
                name="heightMax"
                value={input.heightMax}
                onChange={handleChange}
              />
            </div>

            {/* <label>Peso Mínimo: </label> */}
            <div className={estilos.inputGroup}>
              <input
                className={estilos.input}
                placeholder="Peso mínimo"
                type="number"
                name="weightMin"
                value={input.weightMin}
                onChange={handleChange}
              />

              {/* <label>Peso Máximo: </label> */}
              <input
                className={estilos.input}
                placeholder="Peso máximo"
                type="number"
                name="weightMax"
                value={input.weightMax}
                onChange={handleChange}
              />
            </div>
            {/* <label>Esperanza de Vida </label> */}
            <input
              className={estilos.input}
              placeholder="Esperanza de vida"
              type="number"
              name="lifeSpan"
              value={input.lifeSpan}
              onChange={handleChange}
            />
            {/* 
            <label>Imagen: </label> */}
            <input
              className={estilos.input}
              placeholder="URL de la imagen"
              type="text"
              name="image"
              value={input.image}
              onChange={handleChange}
            />

            {/* <label>Temperamento: </label> */}
            <select
              className={estilos.input}
              onChange={(e) => handleSelectTemp(e)}
              // type="checkbox"
            >
              <option label={"Seleccionar temperamento"}></option>
              {temp?.map((temp) => {
                return (
                  <option value={temp.name} name={temp.name} label={temp.name}>
                    {temp.name}
                  </option>
                );
              })}
            </select>
            <div className={estilos.inputGroup}>
            {temporal?.map((e) => {
              return (
                <div className={estilos.inputTemp}>
                  {e}
                  {/* <button className={estilos.btnClose}>X</button> */}
                </div>
              );
            })}
            </div>

            <button className={estilos.button} onClick={handleSubmit}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
