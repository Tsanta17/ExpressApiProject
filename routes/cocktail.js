/******************************** */
/**import des modules nécessaires */
const express = require('express')
const checkTokenMidlleware = require('../jsonwebtoken/check')
const cocktailCtrl = require('../controllers/cocktail')

/********************************** */
/**Récupération du router d'express */
let router = express.Router();

router.get('', cocktailCtrl.getAllCocktails)

// router.get('', (req, res) => {
//     Cocktail.findAll()
//         .then(Cocktails => res.json({ data: Cocktails }))
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.get('/:id', cocktailCtrl.getCocktail)

// router.get('/:id', (req, res) => {
//     let CocktailId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!CocktailId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }

//     //récupération de l'Cocktail
//     Cocktail.findOne({ where: {id: CocktailId}, raw: true })
//     .then(Cocktail => {
//         if ((Cocktail === null)) {
//             return res.status(404).json({ message: 'this Cocktail doesn\'t exist' })
//         } 

//         //Cocktail trouvé
//         return res.json({data: Cocktail}) 
//     })
//     .catch(err => res.status(500).json({message: 'Database error', error: err}))
// })

router.put('', checkTokenMidlleware, cocktailCtrl.addCocktail)

// router.put('', checkTokenMidlleware, (req, res) => {
//     const {nom, prenom, pseudo, email, password} = req.body

//     //validation des données reçues
//     if (!nom || !prenom || !pseudo || !email || !password) {
//         return res.status(400).json({ message: 'Missing data' })
//     }

//     Cocktail.findOne(({ where: {email: email}, raw: true }))
//         .then(Cocktail => {
//             //vérification si l'Cocktail existe déjà
//             if (Cocktail !== null) {
//                 return res.status(400).json({ message: `Cocktail ${nom} already exist` })
//             }

//             //hashage du mot de passe Cocktail
//             bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
//                 .then(hash => {
//                     req.body.password = hash

//                     //création de l'Cocktail
//                     Cocktail.create(req.body)
//                         .then(Cocktail => res.json({ message: 'Cocktail created', data:Cocktail }))
//                         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
//                 })
//                 .catch(err => res.status(500).json({ message: 'Hash process error', error: err }))


//         })
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.patch('/:id', checkTokenMidlleware, cocktailCtrl.updateCocktail)

// router.patch('/:id', checkTokenMidlleware, (req, res) => {
//     let CocktailId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!CocktailId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }

//     //recherche de l'Cocktail
//     Cocktail.findOne({ where: {id: CocktailId}, raw: true })
//         .then(Cocktail => {

//             //vérifier si l'Cocktail existe
//             if ((Cocktail === null)) {
//                 return res.status(404).json({ message: 'This Cocktail doesn\'t exist' })
//             } 

//             //Mise à jour de l'Cocktail
//             Cocktail.update(req.body, {where : {id : CocktailId}})
//                 .then(Cocktail => res.json({ message: 'Cocktail updated' }))
//                 .catch(err => res.status(500).json({ message: 'Database error', error: err }))
//         })
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.post('/untrashed/:id', checkTokenMidlleware, cocktailCtrl.untrashCocktail)

// router.post('/untrashed/:id', checkTokenMidlleware, (req, res) => {
//     let CocktailId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!CocktailId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }
//     Cocktail.restore({where : {id: CocktailId}})
//         .then(() => res.status(204).json({}) )
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.delete('/trash/:id', checkTokenMidlleware, cocktailCtrl.trashCocktail)

// router.delete('/trash/:id', checkTokenMidlleware, (req, res) => {
//     let CocktailId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!CocktailId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }

//     //Suppression de l'Cocktail
//     Cocktail.destroy({ where : {id:CocktailId} })
//         .then(() => res.status(204).json({}) )
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

router.delete('/:id', checkTokenMidlleware, cocktailCtrl.deleteCocktail)

// router.delete('/:id', checkTokenMidlleware, (req, res) => {
//     let CocktailId = parseInt(req.params.id);

//     //vérification si le champ Id est présent et cohérent
//     if (!CocktailId) {
//         return res.status(400).json({ message: 'Missing parameter'})
//     }

//     //Suppression du Cocktail
//     Cocktail.destroy({ where : {id:CocktailId}, force: true })
//         .then(() => res.status(204).json({}) )
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }))
// })

module.exports = router