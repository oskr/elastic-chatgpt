module.exports = {
  // Configuración de la aplicación
  port: process.env.PORT || 3000,
  defaultSchemaName: 'default_schema',

  // Configuración de la base de datos
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: './test_database.sqlite'
  },
  production: {
    dialect: 'sqlite',
    storage: './production_database.sqlite'
  }
};