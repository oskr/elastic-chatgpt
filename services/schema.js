const { Schema } = require('../models');
const { Op } = require('sequelize');

// Este método obtiene el schema por defecto con el nombre indicado en la configuración
const getDefaultSchema = async () => {
  const defaultSchemaName = require('../config').defaultSchemaName;
  const schema = await Schema.findOne({ where: { name: defaultSchemaName } });
  return schema;
};

// Este método crea un nuevo schema si no existe con el nombre indicado en la configuración, 
// o actualiza un schema existente si el nombre coincide
const createOrUpdateSchema = async (schemaName, schemaBody) => {
  schemaName = schemaName || require('../config').defaultSchemaName;
  const [schema, created] = await Schema.findOrCreate({ where: { name: schemaName } });
  if (!created) {
    await schema.update({ body: schemaBody });
  }
  return schema;
};

// Este método obtiene todos los schemas que contienen la palabra dada en su nombre
const getSchemasByKeyword = async (keyword) => {
  const schemas = await Schema.findAll({
    where: {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },
  });
  return schemas;
};

module.exports = {
  getDefaultSchema,
  createOrUpdateSchema,
  getSchemasByKeyword,
};
