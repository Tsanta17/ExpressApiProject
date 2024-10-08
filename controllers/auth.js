/******************************** */
/**import des modules nécessaires */
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/******************************* */
/** Routage de la ressource auth */
exports.login = async (req, res, next) => {
    const { email, password } = req.body

    //validation des données reçues
    if (!email || !password) {
        return res.status(400).json({ message: 'Bad email or password' })
    }

    try {
        //vérification si l'user existe
        let user = await User.findOne({ where: {email: email}, raw: true })
        if (user === null) {
            return res.status(401).json({ message: 'This account does not exist !' })
        }

         //vérification mot de passe 
        let test = await bcrypt.compare(password, user.password)
        if(!test){
            return res.status(401).json({ message: 'Wrong password' })
        }

        //génération du token
        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})

        return res.json({access_token: token})
        
    } catch (err) {
        if (err.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Database error', error: err })
        }
        res.status(500).json({ message: 'login process error!', error: err })
        
    }

    // User.findOne({ where: {email: email}, raw: true })
    //     .then(user => {
    //         //vérification si l'user existe
    //         if (user === null) {
    //             return res.status(401).json({ message: 'This account does not exist !' })
    //         }

    //         //vérification mot de passe 
    //         bcrypt.compare(password, user.password)
    //         .then(test => {
    //             if(!test){
    //                 return res.status(401).json({ message: 'Wrong password' })
    //             }

    //             //génération du token
    //             const token = jwt.sign({
    //                 id: user.id,
    //                 nom: user.nom,
    //                 prenom: user.prenom,
    //                 email: user.email
    //             }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})

    //             return res.json({access_token: token})
    //         })
    //         .catch(err => res.status(500).json({ message: 'login process error!' }))
    //     })
    //     .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}