const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Breed, Temperament } = require("../db.js");
const axios = require("axios");
const { api_key } = process.env;

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      //si me pasan un nombre por query, busco en mi base de datos
      const dbBreedsInfo = await Breed.findAll({ include: Temperament }).then(
        (r) =>
          r.filter((e) =>
            e.dataValues.name.toLowerCase().includes(name.toLowerCase())
          )
      );
      // console.log("SOY DB BREEDS INFO", dbBreedsInfo);
      if (dbBreedsInfo.length !== 0) {
        const dbPromiseBreeds = dbBreedsInfo.map((e) => {
          //devuelvo las propiedades que me piden
          return {
            name: e.name,
            temperament: e.temperament,
            weight: e.weight
          };
        });
        //me guardo la informacion que me interesa de la api en apiBreeds
        const apiUrl = await axios.get(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`
        );
        const apiPromiseBreeds = apiUrl.data.map((e) => {
          return {
            name: e.name,
            weight: e.weight.metric,
            temperament: e.temperament,
            image: e.reference_image_id
          };
        });
        // busco en apiBreeds las razas de perro que contengan el nombre que me pasan por query
        //console.log('SOY API PROMISE BREEDS', apiPromiseBreeds)
        // como apiPromiseBreeds y dbPromiseBreeds son promesas y yo quiero que sucedan en simultaneo, uso Promise.all
        Promise.all([apiPromiseBreeds, dbPromiseBreeds]).then((r) => {
          const [apiBreeds, dbBreeds] = r;
          res.send(r);
        });
      } else {
        res.send("No se registra raza coincidente con la búsqueda");
      }
    } else {
      // si no me pasan nombre por query muestro la lista de razas que me traigo de la api Y de mi base de datos
      const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
      const apiPromiseBreeds = apiUrl.data.map((e) => {
        return {
          name: e.name,
          weight: e.weight.metric,
          temperament: e.temperament,
          image: e.reference_image_id
        };
      });
      const dbBreedsInfo = await Breed.findAll({ include: Temperament });
      const dbPromiseBreeds = dbBreedsInfo.map((e) => {
        return {
          name: e.name,
          weight: e.weight,
          temperament: e.temperament
        };
      });
      Promise.all([apiPromiseBreeds, dbPromiseBreeds]).then((r) => {
        const [apiBreeds, dbBreeds] = r;
        res.send(r);
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:breedId", async (req, res, next) => {
  //muestra altura peso temperamento, imagen, nombre y anios de vida.
  const { breedId } = req.params;
  try {
    if (breedId.length > 10) {
      //busco en mi base de datos si pa PK coincide con la id de la raza pasada por params
      const breedDb = await Breed.findByPk(breedId, { include: Temperament });
      const dogFoundDb = {
        name: breedDb.name,
        height: breedDb.height,
        weight: breedDb.weight,
        lifeSpan: breedDb.lifeSpan,
        temperament: breedDb.temperament
      };
      res.send(dogFoundDb); //devuelvo los datos que me interesan del perro encontrado por ID
    } else {
      // busco en mi API
      const breedApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${breedId}`
      );
      // console.log("SOY BREED API DATA", breedApi.data);
      let dogFound = {
        image: breedApi.data.reference_image_id,
        name: breedApi.data.name,
        height: breedApi.data.height.metric,
        weight: breedApi.data.weight.metric,
        lifeSpan: breedApi.data.lifeSpan,
        temperament: breedApi.data.temperament
      };
      // console.log("SOY DOG FOUND", dogFound);
      res.send(dogFound);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, heightMin, heightMax, weightMin, weightMax, lifeSpan, temperament, image } = req.body;
    const height = `${heightMin} - ${heightMax}`;
    const weight = `${weightMin} - ${weightMax}`;
    let newDog = await Breed.create({ name, height, weight, lifeSpan, image });
    console.log('SOY TEMPERAMENTO', temperament);
    await newDog.addTemperament(temperament);
    res.send(newDog);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
