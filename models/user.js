/********************* */
/** Import des modules */
const { DataTypes } = require('sequelize');
const DB = require('../db.config');

/**************************** */
/** Définition du modèle user */
const User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false    
    },
    pseudo: {
        type: DataTypes.STRING(100),
        allowNul: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true           //ici une validation de données si c'est pas conforme à une email
        }
    },
    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i       //ici une contrainte 
    }
}, { paranoid: true })              //ici une softDelete

/************************************* */
/** synchronisation des modèles en ORM */
// User.sync()
// User.sync({force: true})
// User.sync({alter: true})

module.exports = User;