require('dotenv').config()

module.exports = {

    development: {
        username: "root",
        password: process.env.LOCAL_PASSWORD,
        database: "galleryport_dev",
        host: "localhost",
        dialect: "mysql"
    },

    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql"
    },

    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
}