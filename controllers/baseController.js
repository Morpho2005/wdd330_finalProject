const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  news = await utilities.getNews(req, res)
  res.render("index", {title: "Gaming News", news: news})
}

module.exports = baseController