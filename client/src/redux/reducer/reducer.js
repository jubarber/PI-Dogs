//importar acciones 
import { GET_DOGS, GET_DOG_NAME, CREATE_DOG, GET_TEMPERAMENTS } from '../actions/actions.js';

const initialState = {
  dogs: [],
  filteredDogs: [],
  dog: {},
  temperaments: [],
}

export default function rootReducer(state = initialState, action){
  switch(action.type){
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        filteredDogs: action.payload,
      }
    case GET_DOG_NAME:
      return {
        ...state,
        dog: action.payload,
      }
    case CREATE_DOG:
      return{
        ...state,
        dogs: action.payload
      }    
      case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }

    default: return state;
  }
}

