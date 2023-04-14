const express = require('express');
const router = express.Router();
const { getDefaultSchema } = require('../services/schemas');
const openai = require('openai');

router.post('/pln-to-elastic', async (req, res) => {
  try {
    // Obtenemos la consulta del usuario en lenguaje natural desde el body de la petición
    const { query } = req.body;

    // Obtenemos el nombre de schema por defecto desde la configuración
    const defaultSchemaName = process.env.DEFAULT_SCHEMA_NAME;

    // Obtenemos el schema por defecto desde la base de datos
    const schema = await getDefaultSchema(defaultSchemaName);

    // Utilizamos la librería OpenAI API para obtener una consulta estructurada de Elasticsearch
    const prompt = `Given the following natural language query: ${query}, what Elasticsearch query should be run on the following schema: ${JSON.stringify(schema)}`;
    const engine = 'text-davinci-002';
    const completions = await openai.complete({
      engine,
      prompt,
      maxTokens: 512,
      n: 1,
      stop: '\n',
    });

    // Enviamos la consulta estructurada como respuesta
    res.json({ query: completions.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar en Elasticsearch' });
  }
});

module.exports = router;
