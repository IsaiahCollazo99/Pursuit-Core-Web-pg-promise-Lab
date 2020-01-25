const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost:5432/facebook_db";
const db = pgp(connectionString);

module.exports = {pgp, db};