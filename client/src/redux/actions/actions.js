import axios from 'axios';
//exportar acciones
export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_NAME = 'GET_DOG_NAME'; 
export const CREATE_DOG = 'CREATE_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';


export function getDogs() {
  return function (dispatch){
  axios.get('http://localhost:3001/api/breed')
  .then(dogs => dispatch({type: 'GET_dOGS', payload: dogs}))
  }
  .catch(err => console.log(err));
};

export function getTemperaments(){
  return function (dispatch){
    axios.get('http://localhost:3001/api/temperament')
    .then(temperament => dispatch({type: 'GET_TEMPERAMENTS', payload: temperament}))
  }
};

export function getDogByName(name){ 
  return function(dispatch){
  axios.get(`http://localhost:3001/api/breed/${name}`)
  .then(dog => dispatch({type: 'GET_DOG_NAME', payload: dog}))
  }
  .catch(err => console.log(err));
};

export function createDog (payload){
  return async function(dispatch){
    try{
      const newDog = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/breed',
        data: {
          name: payload.name,
          heightMin: payload.heightMin,
          heightMax: payload.heightMax,
          weightMin: payload.weightMin,
          weightMax: payload.weightMax,
          lifeSpan: payload.lifeSpan,
          temperament: payload.temperament,
          image: payload.image,
        }
      })
      return dispatch({
        type: 'CREATE_DOG',
        payload: newDog.data,
      });
    }catch (err) {
      console.log(err);
    }
  }
};