import axios from "axios";
//exportar acciones
export const GET_DOGS = "GET_DOGS";
export const GET_DOG_NAME = "GET_DOG_NAME";
export const CREATE_DOG = "CREATE_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_ID = "GET_DOG_ID";
export const SORT = "SORT";
export const FILTER = "FILTER";
export const FILTER_RAZA = "FILTER_RAZA";

export function getDogs() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/breed")
      .then((dogs) => dispatch({ type: "GET_DOGS", payload: dogs.data }))
      .catch((err) => console.log(err));
  };
}

export function getTemperaments() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/temperament")
      .then((temperament) =>
        dispatch({ type: "GET_TEMPERAMENTS", payload: temperament.data })
      );
  };
}

export function getDogByName(name) {
  return function (dispatch) {
    const pedidoBack = axios
      .get(`http://localhost:3001/api/breed?name=${name}`)
      .then((dog) => dispatch({ type: "GET_DOG_NAME", payload: dog.data }))
      .catch((err) => console.log(err));
    // console.log('SOY PEDIDO BACK', pedidoBack)
  };
}

export function getDogById(id) {
  return function (dispatch) {
    try {
      const pedidoBack = axios
        .get(`http://localhost:3001/api/breed/${id}`)
        .then((dog) => dispatch({ type: "GET_DOG_ID", payload: dog.data }));
    } catch (err) {
      console.log(err);
    }
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    try {
      const newDog = await axios({
        method: "post",
        url: "http://localhost:3001/api/breed",
        data: {
          name: payload.name,
          heightMin: payload.heightMin,
          heightMax: payload.heightMax,
          weightMin: payload.weightMin,
          weightMax: payload.weightMax,
          lifeSpan: payload.lifeSpan,
          temperament: payload.temperament,
          image: payload.image
        }
      });
      return dispatch({
        type: "CREATE_DOG",
        payload: newDog.data
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function sort(order) {
  return {
    type: "SORT",
    payload: order
  };
}

export function filtrar(filter){
  return {
    type: "FILTER",
    payload: filter
  }
}

export function filtrarRaza(filter){
  return {
    type:'FILTER_RAZA',
    payload: filter
  }
}
