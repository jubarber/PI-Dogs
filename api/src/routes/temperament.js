const { Router } = require('express');
const router = Router();
const { Temperament } = require("../db.js");
const axios = require("axios");

router.get('/', async (req, res)=> {
    //hago el pedido a mi api y devuelvo solo el temperamento guardado en una variable
  const temperamentArray = [];
  const breedApi = await axios.get('https://api.thedogapi.com/v1/breeds');
  //console.log('SOY BREED API DATA', breedApi.data);
  const temperamentApi = breedApi.data.map(e => {
    return {
      temperament: e.temperament
    }
  });
  //temperamentApi es un array de objetos con la unica propiedad temperament.
  temperamentApi.map( e => {
    if(e.temperament !== undefined){ //hay perros que NO tienen temperamento, aca los filtro
    temperamentArray.push(e.temperament) // pusheo los temepramentos true al array
    }
  });
  const temperamentSplitted = temperamentArray.map(e => e.split(',')).flat(); //spliteo y flateo para tener un array de palabras individuales (temperamentos)
  temperamentSplitted.forEach(async (e)=>{
    await Temperament.findOrCreate({
    where: {
      name:e,
    }
  })});
  const allTemperamentsInfo = await Temperament.findAll();
  const allTemperaments = allTemperamentsInfo.map(e => e.name);
  res.send(allTemperaments);
});


module.exports = router;