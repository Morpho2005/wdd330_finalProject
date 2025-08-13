const express = require("express")
const Util = {}
const jwt = require("jsonwebtoken")

Util.getNews = async function (req, res) {
    try {
        const response = await fetch('https://gaming-news-two.vercel.app/');
        const data = await response.json();
        let html = '<ul>';
        data.forEach(item => {
            html += `<li class="news-item"><a href="${item.source}" target="_blank">${item.title}</a>
            <p>${item.description}</p>
            <span>${item.updated}</span>
            </li>`;
        });
        html += '</ul>';
        return html;
    } catch (error) {
        console.error("Error fetching games:", error);
        throw error;
    }
}

Util.buildGameList = async function(data){
    let list
    if(data.length > 0){
    list = '<div class="game-display">'
    data.forEach(game => { 
      list += '<div class="game-item">'
      list += '<h2>'
      list += '<a href="../games/id/' + game.id +'" title="View ' 
      + game.title + ' details">' 
      + game.title + '</a>'
      list += '</h2>'
      list +=  '<a href="../games/id/'+ game.id 
      + '" title="View ' + game.title 
      + ' details"><img src="' + game.thumbnail 
      +'" alt="Image of '+ game.title 
      +'" /></a>'
      list += '</div>'
    })
    list += '</div>'
  }
    return list
}

Util.buildGameDetails = async function(data){
    let details = ''
    if(data){
        details += '<h1>' + data.title + '</h1>'
        details += '<img src="' + data.thumbnail + '" alt="Image of ' + data.title + '" />'
        details += '<p>' + data.short_description + '</p>'
        details += '<p>Genre: ' + data.genre + '</p>'
        details += '<p>Platform: ' + data.platform + '</p>'
        details += '<p>Release Date: ' + data.release_date + '</p>'
        details += '<p>Developer: ' + data.developer + '</p>'
        details += '<p>Publisher: ' + data.publisher + '</p>'
        details += '<p>Game Link: <a href="' + data.game_url + '" target="_blank">Play Now</a></p>'
        details += '<p>FreeToGame Link: <a href="' + data.freetogame_profile_url + '" target="_blank">View Profile</a></p>'
    }
    return details
}

Util.buildGameFilter = async function(data){
    let filter = '<form class="game-filter" action="/games/" method="get">'
    filter += '<label for="genre">Genre:</label>'
    filter += '<select name="genre" id="genre">'
    filter += '<option value="">All</option>'
    const genres = [...new Set(data.map(game => game.genre))];
    let uniqueGenres = [];
    genres.forEach(genre => {
        if (!uniqueGenres.includes(genre)) {
            uniqueGenres.push(genre);
            filter += `<option value="${genre}">${genre}</option>`;
        }
    });
    filter += '</select>'
    filter += '<button type="submit">Filter</button>'
    filter += '</form>'
    return filter
}

/* ************************
 * Constructs the tool HTML link
 ************************** */
Util.makeGreeting = (req, res) => {
  let greeting
  if (res.locals.accountData.account_type  == 'Client') {
    greeting = `<h2>Hello ${res.locals.accountData.account_firstname}</h2>`
  } else {
    greeting = `<h2>Hello ${res.locals.accountData.account_firstname}</h2>`
    greeting += `<h3> inventory management </h3>`
    greeting += `<a href="/inv"><button>manage Inventory</button></a>`
  }
  return greeting
}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
 if (req.cookies.jwt) {
  jwt.verify(
   req.cookies.jwt,
   process.env.ACCESS_TOKEN_SECRET,
   function (err, accountData) {
    if (err) {
     req.flash("Please log in")
     res.clearCookie("jwt")
     return res.redirect("/account/login")
    }
    res.locals.accountData = accountData
    res.locals.loggedin = 1
    next()
   })
 } else {
  next()
 }
}

/* ************************
 * Constructs the tool HTML link
 ************************** */
Util.getTools = (req, res) => {
  let tools
  /*if (res.locals.loggedin) {
    tools = '<a title="Click to log out" href="/account/logout">Log Out</a>'
    tools += '<a title="Click to view account" href="/account">Welcome Back</a>'
  } else {*/
    tools = '<a title="Click to log in" href="/account/login">My Account</a>'
  //}
  return tools
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util