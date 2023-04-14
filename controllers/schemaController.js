const express = require('express');
const router = express.Router();
const schemasService = require('../services/schemas');

// Ruta para crear o actualizar un esquema
router.post('/', async (req, res) => {
  try {
    const { schema } = req.body;
    const newSchema = await schemasService.createOrUpdateSchema(schema);
    res.status(201).json(newSchema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear o actualizar el esquema' });
  }
});

module.exports = router;
