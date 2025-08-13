
const Util = {}

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
      + 'details"><img src="' + game.thumbnail 
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
    }
    return details
}

Util.buildGameFilter = async function(data){
    let filter = '<form action="/games/filter/" method="get">'
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

module.exports = Util