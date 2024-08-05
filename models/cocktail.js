/********************* */
/** Import des modules */
const { DataTypes } = require('sequelize');
const DB = require('../db.config');

/**************************** */
/** Définition du modèle cocktail */
const Cocktail = DB.define('Cocktail', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false    
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNul: false,
    },
    recette: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNul: false,
    }
}, { paranoid: true })              //ici une softDelete

/************************************* */
/** synchronisation des modèles en ORM */
// Cocktail.sync()
// Cocktail.sync({force: true})
// Cocktail.sync({alter: true})

module.exports = Cocktail;