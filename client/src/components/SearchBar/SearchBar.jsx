import estilos from "./SearchBar.module.css";
import { getDogByName } from "../../redux/actions/actions.js";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

export default function SearchBar() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogByName(input));
    console.log('entre al submit')
    setInput([]);
  };
  const handleChange = (e) => {
    setInput(e.target.value);
    console.log('SOY E TARGET VALUE', input)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <input className={estilos.input}
        type="text"
        placeholder="Busque su raza..."
        onChange={handleChange}
      />
      <button type="submit" className={estilos.btnBuscar}>
        Buscar
      </button>
      </div>
    </form>
  );
}
