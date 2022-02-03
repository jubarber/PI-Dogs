import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions/actions.js";
import estilos from "./Form.module.css";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Por favor, ingrese el nombre de la raza";
  }
  if (!input.heightMin) {
    errors.height = "Por favor, ingrese la altura mínima";
  } else if (input.heightMin > input.heightMax) {
    errors.height = "La altura mínima no puede ser mayor que la altura máxima";
  }
  if (!input.heightMax) {
    errors.height = "Por favor, ingrese la altura máxima";
  } 
  if (!input.weightMin) {
    errors.weight = "Por favor, ingrese el peso mínimo";
  } else if (input.weightMin > input.weightMax) {
    errors.weight = "El peso mínimo no puede ser mayor que el peso máximo";
  }
  if (!input.weightMax) {
    errors.weight = "Por favor, ingrese el peso máximo";
  }

  return errors;
};

export default function Form() {
  const dispatch = useDispatch();
  const tempState = useSelector((state) => state.temperaments);
  const temp = tempState.data;
  // console.log(temp);
  const [temporal, setTemporal] = useState([]);

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

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    if (temporal.lenght !== 0) {
      var total =
        temp &&
        temp.reduce((acc, e) => {
          if (temporal.includes(e.name)) {
            acc.push(e.id);
          }
          return acc;
        }, []);

      setInput({ ...input, temperament: total });
    }
  }, [temporal]);

  const [errors, setErrors] = useState({});

  const handleSelectTemp = (e) => {
    e.preventDefault();
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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    )
  };

  function handleDelete(e) {
    let temperamentFiltered = temporal.filter((el) => el !== e);
    setTemporal(temperamentFiltered);
  }

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
            {errors.name && <p className={estilos.danger}>{errors.name}</p>}
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
            
            {errors.height && <p className={estilos.danger}>{errors.height}</p>}
            {errors.height && <p className={estilos.danger}>{errors.height}</p>}

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
            
            {errors.weight && <p className={estilos.danger}>{errors.weight}</p>}
            {errors.weight && <p className={estilos.danger}>{errors.weight}</p>}

            {/* <label>Esperanza de Vida </label> */}
            <input
              className={estilos.input}
              placeholder="Esperanza de vida"
              type="number"
              name="lifeSpan"
              value={input.lifeSpan}
              onChange={handleChange}
            />

            <input
              className={estilos.input}
              placeholder="URL de la imagen"
              type="text"
              name="image"
              value={input.image}
              onChange={handleChange}
            />

            <select
              className={estilos.input}
              onChange={(e) => handleSelectTemp(e)}
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
            {errors.temperament && <p className={estilos.danger}>{errors.temperament}</p>}

            <div className={estilos.inputGroup}>
              {temporal?.map((e) => {
                return (
                  <div
                    className={estilos.inputTemp}
                    onClick={() => handleDelete(e)}
                  >
                    {e}
                    <p className={estilos.texto}>Click para eliminar</p>
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
