// config.js
import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

const DEV_PORT = 8080;

const DBS = {
  mongo: "MONGODB",
  memory: "MEMORY",
  filesystem: "FILE",
  sql: "SQL",
  mariadb: "MARIADB"
}

const config = {
  envs,
  persistences:DBS,
  server: {
    PORT: process.env.PORT ?? DEV_PORT,
    routes: {
      base: "/api",
      productos:"/api/productos",
      carrito:"/api/carrito",
      sessions: "/api/sessions"
    }
  }
}

export default config;