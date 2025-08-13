const gameModel = require("../models/games-model")
const utilities = require("../utilities/")

const gameCont = {}

/* ***************************
 *  Build games by list view
 ***************************/
gameCont.buildGameList = async (req, res, next) => {
    try {
        const data = await gameModel.getGames()
        let list = await utilities.buildGameList(data)
        if (req.query.genre) {
            let filtered = []
            for (let game of data) {
                if (game.genre === req.query.genre) {
                    filtered.push(game)
                }
            }
            list = await utilities.buildGameList(filtered)
        }
        const filter = await utilities.buildGameFilter(data)
        res.render("games/list", {
            title: "Game List",
            list,
            filter
        })
    } catch (error) {
        next(error)
    }
}

/* ***************************
 *  Build individual game view
 ***************************/
gameCont.buildByGameId = async (req, res, next) => {
    try {
        const gameId = req.params.gameId
        const data = await gameModel.getGameById(gameId)
        const game = await utilities.buildGameDetails(data)
        res.render("games/detail", {
            title: game.title,
            game
        })
    } catch (error) {
        next(error)
    }
}

module.exports = gameCont