/******************************** */
/**import des modules nécessaires */
const Cocktail = require('../models/cocktail')

/******************************* */
/** routage de la ressource cocktail */

exports.getAllCocktails = (req, res) => {
    Cocktail.findAll()
        .then(Cocktails => res.json({ data: Cocktails }))
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.getCocktail = async (req, res) => {
    let CocktailId = parseInt(req.params.id);

    //vérification si le champ Id est présent et cohérent
    if (!CocktailId) {
        return res.status(400).json({ message: 'Missing parameter'})
    }

    try {
        //récupération du Cocktail
        let cocktail = await Cocktail.findOne({ where: {id: CocktailId}, raw: true })

        //test si résultat
        if ((cocktail === null)) {
            return res.status(404).json({ message: 'this Cocktail doesn\'t exist' })
        } 

        //renvoi du Cocktail trouvé
        return res.json({data: Cocktail}) 
        
    } catch (err) {
        return res.status(500).json({message: 'Database error', error: err})
    }

}

exports.addCocktail = async (req, res) => {
    const {user_id, nom, description, recette} = req.body

    //validation des données reçues
    if (!user_id || !nom || !description || !recette ) {
        return res.status(400).json({ message: 'Missing data' })
    }

    try {
      //vérification si l'Cocktail existe déjà
        let cocktail =  await Cocktail.findOne(({ where: {nom: nom}, raw: true }))
        if (cocktail !== null) {
            return res.status(400).json({ message: `Cocktail ${nom} already exist` })
        }

        //création du Cocktail
        cocktail = await Cocktail.create(req.body)
        return res.json({ message: 'Cocktail created', data: cocktail })  
    } catch (err) {
        return res.status(500).json({ message: 'Database error', error: err })
    }
    

    // Cocktail.findOne(({ where: {nom: nom}, raw: true }))
    //     .then(Cocktail => {
    //         //vérification si l'Cocktail existe déjà
    //         if (Cocktail !== null) {
    //             return res.status(400).json({ message: `Cocktail ${nom} already exist` })
    //         }

    //         //création du Cocktail
    //         Cocktail.create(req.body)
    //             .then(Cocktail => res.json({ message: 'Cocktail created', data:Cocktail }))
    //             .catch(err => res.status(500).json({ message: 'Database error', error: err }))


    //     })
    //     .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.updateCocktail = (req, res) => {
    let CocktailId = parseInt(req.params.id);

    //vérification si le champ Id est présent et cohérent
    if (!CocktailId) {
        return res.status(400).json({ message: 'Missing parameter'})
    }

    //recherche de l'Cocktail
    Cocktail.findOne({ where: {id: CocktailId}, raw: true })
        .then(Cocktail => {

            //vérifier si l'Cocktail existe
            if ((Cocktail === null)) {
                return res.status(404).json({ message: 'This Cocktail doesn\'t exist' })
            } 

            //Mise à jour de l'Cocktail
            Cocktail.update(req.body, {where : {id : CocktailId}})
                .then(Cocktail => res.json({ message: 'Cocktail updated' }))
                .catch(err => res.status(500).json({ message: 'Database error', error: err }))
        })
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.untrashCocktail = (req, res) => {
    let CocktailId = parseInt(req.params.id);

    //vérification si le champ Id est présent et cohérent
    if (!CocktailId) {
        return res.status(400).json({ message: 'Missing parameter'})
    }
    Cocktail.restore({where : {id: CocktailId}})
        .then(() => res.status(204).json({}) )
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.trashCocktail = (req, res) => {
    let CocktailId = parseInt(req.params.id);

    //vérification si le champ Id est présent et cohérent
    if (!CocktailId) {
        return res.status(400).json({ message: 'Missing parameter'})
    }

    //Suppression de l'Cocktail
    Cocktail.destroy({ where : {id:CocktailId} })
        .then(() => res.status(204).json({}) )
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.deleteCocktail = (req, res) => {
    let CocktailId = parseInt(req.params.id);

    //vérification si le champ Id est présent et cohérent
    if (!CocktailId) {
        return res.status(400).json({ message: 'Missing parameter'})
    }

    //Suppression du Cocktail
    Cocktail.destroy({ where : {id:CocktailId}, force: true })
        .then(() => res.status(204).json({}) )
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}