const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const breedRouter = require('./breed.js');
const temperamentRouter = require('./temperament.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/breed', breedRouter);
router.use('/temperament', temperamentRouter);

module.exports = router;
