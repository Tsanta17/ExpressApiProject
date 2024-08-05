/****************** */
/** Import des modules nécessaires */
const { Sequelize } = require('sequelize')

/****************** */
/** Connexion à la bdd */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false        
    }
)

/************************************* */
/** synchronisation des modèles en ORM */
// sequelize.sync(err => {
//     console.log('Database sync OK!', err)
// })

module.exports = sequelize
