/******************************** */
/**import des modules nécessaires */
const jwt = require('jsonwebtoken')

/*********************** */
/** extraction des token */
const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return false
    }

    //on isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]
}

/*************************************** */
/** vétification de la présence du token */
const checkTokenMidlleware = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)
    // console.log('### HEADERS:', req.headers)
    // console.log('### TOKEN: ', token)

    if (!token) {
        return res.status(401).json({ message: 'Holyy shitt!' })
    }

    //vérifié la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {

        // console.log('### ERR_TOKEN:', err)
        // console.log('### DECODED TOKEN:', decodedToken)

        if (err) {
            return res.status(401).json({ message: 'Bad token' })
        }

        next()
    })
}

module.exports = checkTokenMidlleware