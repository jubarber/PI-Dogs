//importar acciones
import {
  NOMBRE_ASCENDENTE,
  NOMBRE_DESCENDENTE,
  PESO_ASCENDENTE,
  PESO_DESCENDENTE
} from "../../constantes/sort.js";
import {
  GET_DOGS,
  GET_DOG_NAME,
  CREATE_DOG,
  GET_TEMPERAMENTS,
  GET_DOG_ID,
  SORT,
  FILTER,
  FILTER_RAZA,
  CHANGE_PAGE
} from "../actions/actions.js";
import {
  quickSort,
  quickSortDesc,
  quickSortWeight,
  quickSortWeightDesc
} from "./quickSort.js";

const initialState = {
  dogs: [],
  filteredDogs: [],
  dogById: [],
  currentPage: 1,
  cardsPP: 8,
  temperaments: [],
  error: false
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        filteredDogs: action.payload,
        error: false
      };
    case GET_DOG_NAME:
      if (action.payload.lenght === 0) {
        return {
          ...state,
          filteredDogs: action.payload,
          error: true
        };
      } else {
        return {
          ...state,
          filteredDogs: action.payload
        };
      }
    case GET_DOG_ID:
      return {
        ...state,
        dogById: action.payload
      };
    case CREATE_DOG:
      return {
        ...state,
        dogs: action.payload,
        filteredDogs: action.payload
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      };
    case SORT:
      let perrosOrdenados = [...state.filteredDogs];
      if (action.payload === NOMBRE_ASCENDENTE) {
        perrosOrdenados = quickSort(perrosOrdenados);
      } else if (action.payload === NOMBRE_DESCENDENTE) {
        perrosOrdenados = quickSortDesc(perrosOrdenados);
      } else if (action.payload === PESO_ASCENDENTE) {
        perrosOrdenados = quickSortWeight(perrosOrdenados);
      } else if (action.payload === PESO_DESCENDENTE) {
        perrosOrdenados = quickSortWeightDesc(perrosOrdenados);
      }
      return {
        ...state,
        filteredDogs: perrosOrdenados
      };

    case FILTER:
      return {
        ...state,
        filteredDogs: state.dogs[0].filter((e) => {
          return e.temperament
            ?.split(", ")
            .find((elem) => elem.toLowerCase() === action.payload);
        })
      };

    case FILTER_RAZA:
      const razaDB = (action.payload === "dataBase")?state.dogs[1]:state.dogs[0];

      return {
        ...state,
        filteredDogs: razaDB
      };

    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }

    default:
      return state;
  }
}
