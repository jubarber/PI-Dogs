import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createDog, getTemperaments } from "../../redux/actions/actions.js";
import estilos from "./Form.module.css";
export function validate(input) {
  let error = {};
  
  if (!input.name) {
    error.name = "Por favor, ingrese el nombre de la raza";
  }
  if (!input.heightMin) {
    error.heightMin = "Por favor, ingrese la altura mínima";
  }
  if (input.heightMin < 0){
    error.heightMin = "Por favor, ingrese una altura valida";
  }
  if (input.heightMin && input.heightMax && parseInt(input.heightMin) >= parseInt(input.heightMax)) {
    error.height = "La altura máxima debe ser mayor que la altura mínima";
  }
  if (!input.heightMax) {
    error.heightMax = "Por favor, ingrese la altura máxima";
  } 
  if (!input.weightMin || input.weightMin < 0) {
    error.weightMin = "Por favor, ingrese el peso mínimo";
  } 
  if (input.weightMin && input.weightMax && parseInt(input.weightMin) >= parseInt(input.weightMax)) {
    error.weight = "El peso máximo debe ser mayor que el peso mínimo";
  }
  if (!input.weightMax) {
    error.weightMax = "Por favor, ingrese el peso máximo";
  }
  
  return error;
};

export default function Form() {
  const dispatch = useDispatch();
  const tempState = useSelector((state) => state.temperaments);
  
  const [temporal, setTemporal] = useState([]);
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpan: "",
    temperament:[],
  });

  useEffect(() => {
    dispatch(getTemperaments());
    // console.log('SOY TEMPSTATE DE FORM', tempState)
  }, [dispatch]);
  
  const handleSelectTemp = (e) => {
    e.preventDefault();
    if (temporal.includes(e.target.value)) {
      alert("Ya ha seleccionado este temperamento");
    } else {
      setTemporal([...temporal, e.target.value]);
    }
  };

  useEffect(() => {
    if (temporal.lenght !== 0) {
      var total =
        tempState &&
        tempState.reduce((acc, e) => {
          if (temporal.includes(e.name)) {
            acc.push(e.id);
          }
          return acc;
        },[]);
        // console.log('SOY TEMPERAMENT del form', input.temperament)
        // console.log('SOY TEMPORAL DE FORM', temporal)
      setInput({ ...input, temperament: total });
    }
  }, [temporal]);

  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(errors).length === 0){
      dispatch(createDog(input));
      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        temperament: [],
      });
      setTemporal([]);
      window.location.href='/home';
    }else {
      e.preventDefault();
      alert('Campos incompletos')
    }
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
    );
  };

  function handleDelete(e) {
    let temperamentFiltered = temporal.filter((el) => el !== e);
    setTemporal(temperamentFiltered); 
  }

  return (
    <div className={estilos.cuerpo}>
      <nav className={estilos.nav}>
        <Link to='/home' className={estilos.link}>Home</Link>
      </nav>
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
            {errors.heightMin && <p className={estilos.danger}>{errors.heightMin}</p>}
            {errors.heightMax && <p className={estilos.danger}>{errors.heightMax}</p>}

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
            {errors.weightMin && <p className={estilos.danger}>{errors.weightMin}</p>}
            {errors.weightMax && <p className={estilos.danger}>{errors.weightMax}</p>}

            {/* <label>Esperanza de Vida </label> */}
            <input
              className={estilos.input}
              placeholder="Esperanza de vida"
              type="number"
              name="lifeSpan"
              value={input.lifeSpan}
              onChange={handleChange}
            />

            {/* {errors.lifeSpan && <p className={estilos.danger}>{errors.lifeSpan}</p>} */}

              <select
                className={estilos.input}
                onChange={(e) => handleSelectTemp(e)}>
                <option label={"Seleccionar temperamento"} disabled selected></option>
                {tempState?.map((tempState) => {
                  return (
                    <option key={tempState.id} value={tempState.name} name={tempState.name} label={tempState.name}>
                      {tempState.name}
                    </option>
                  );
                })}
              </select>
              {/* {errors.temperament && <p className={estilos.danger}>{errors.temperament}</p>} */}
              
            <div className={estilos.inputGroup}>
              {temporal?.map((e) => {
                return (
                  <div
                    key={e}
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
