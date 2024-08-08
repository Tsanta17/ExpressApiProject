/******************************** */
/**import des modules nécessaires */
const express = require('express')
const userCtrl = require('../controllers/user')
// const User = require('../models/user')
// const bcrypt = require('bcrypt')

/********************************** */
/**Récupération du router d'express */
let router = express.Router();

/******************************* */
/** routage de la ressource user */
// router.get('', (req, res) => {
//     User.findAll()
//         .then(users => res.json({ data: users }))
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.get('/', userCtrl.getAllUsers)

// router.get('/:id', (req, res) => {
//     let userId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!userId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }

//     //récupération de l'user
//     User.findOne({ where: {id: userId}, raw: true })
//     .then(user => {
//         if ((user === null)) {
//             return res.status(404).json({ message: 'this user doesn\'t exist' })
//         } 

//         //user trouvé
//         return res.json({data: user}) 
//     })
//     .catch(err => res.status(500).json({message: 'Database error', error: err}))
// })

router.get('/:id', userCtrl.getUser)

// router.put('', (req, res) => {
//     const {nom, prenom, pseudo, email, password} = req.body

//     //validation des données reçues
//     if (!nom || !prenom || !pseudo || !email || !password) {
//         return res.status(400).json({ message: 'Missing data' })
//     }

//     User.findOne(({ where: {email: email}, raw: true }))
//         .then(user => {
//             //vérification si l'user existe déjà
//             if (user !== null) {
//                 return res.status(409).json({ message: `User ${nom} already exists` })
//             }

//             //hashage du mot de passe user
//             bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
//                 .then(hash => {
//                     req.body.password = hash

//                     //création de l'user
//                     User.create(req.body)
//                         .then(user => res.json({ message: 'User created', data:user }))
//                         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
//                 })
//                 .catch(err => res.status(500).json({ message: 'Hash process error', error: err }))


//         })
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.put('', userCtrl.addUser)

// router.patch('/:id', (req, res) => {
//     let userId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!userId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }

//     //recherche de l'user
//     User.findOne({ where: {id: userId}, raw: true })
//         .then(user => {

//             //vérifier si l'user existe
//             if ((user === null)) {
//                 return res.status(404).json({ message: 'This user doesn\'t exist' })
//             } 

//             //Mise à jour de l'user
//             User.update(req.body, {where : {id : userId}})
//                 .then(user => res.json({ message: 'User updated' }))
//                 .catch(err => res.status(500).json({ message: 'Database error', error: err }))
//         })
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.patch('/:id', userCtrl.updateUser)

// router.post('/untrashed/:id', (req, res) => {
//     let userId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!userId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }
//     User.restore({where : {id: userId}})
//         .then(() => res.status(204).json({}) )
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.post('/untrashed/:id', userCtrl.untrashUser)

// router.delete('/trash/:id', (req, res) => {
//     let userId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!userId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }

//     //Suppression de l'user
//     User.destroy({ where : {id:userId} })
//         .then(() => res.status(204).json({}) )
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.delete('/trash/:id', userCtrl.softDeleteUser)

// router.delete('/:id', (req, res) => {
//     let userId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!userId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }

//     //Suppression de l'user
//     User.destroy({ where : {id:userId}, force: true })
//         .then(() => res.status(204).json({}) )
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.delete('/:id', userCtrl.deleteUser)

module.exports = router