const url = 'https://www.freetogame.com/api/games';
const info = new URLSearchParams(window.location.search);
const gamelist = document.querySelector("#gamelist")
const filter = document.querySelector("#filter")
const close = document.querySelector('#close')
const modal = document.querySelector("#modal")
const modaltext = document.querySelector('#modaltext')

async function getGameData(URL) {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        if (info.get('filter') == 'filter'){
            displayList(filtergames(data.games))
        } else {
            displayList(data.games)
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

async function getGenres(URL) {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        let genres = []
        for (let i = 0; i < games.length; i++){
            if (!genres.includes(data[i].genre)) {
                    genres.push(data[i].genre)
            }
        }
        return genres
    } catch (error) {
        console.error('Error:', error);
    }
}

function filtergames(array){
    let filteredarray = Array()
    for (let i = 0; i < array.length; i++) {
        if (array[i].genres.includes(info.get('genre'))){
            filteredarray.push(array[i])
        }
    }
    return filteredarray
}

const displayList = (games) => {

    for (let i = 0; i < games.length; i++) {
        const li = document.createElement('li')
        li.classList.toggle('game');
        const icon = document.createElement('img')
        icon.src = `images/${games[i].icon}`
        icon.alt = `${games[i].name}`
        icon.width = '100'
        icon.height = '100'
        icon.loading = "lazy"
        const name = document.createElement('p')
        name.textContent = `${games[i].name}`
        const genres = document.createElement('ul')
        for (a=0; a < games[i].genrelist.length; a++) {
            const genre = document.createElement('li')
            genre.textContent = `${games[i].genrelist[a]}`
            genres.appendChild(genre)
        }
        const button = document.createElement('button')
        button.textContent = 'more info'
        button.addEventListener("click", () => {
            modal.showModal();
            modaltext.innerHTML = ``
            const boxart = document.createElement('img')
            boxart.src = `images/${games[i].boxart}`
            boxart.alt = `${games[i].name}`
            boxart.loading = "lazy"
            modaltext.appendChild(boxart)
            const ul = document.createElement('ul')
            for (a=0; a < games[i].genrelist.length; a++) {
                const genre = document.createElement('li')
                genre.textContent = `${games[i].genrelist[a]}`
                ul.appendChild(genre)
            }
            const description = document.createElement('p')
            description.textContent = `${games[i].description}`
            modaltext.appendChild(boxart)
            modaltext.appendChild(ul)
            modaltext.appendChild(description)
        })
        li.appendChild(icon)
        li.appendChild(name)
        li.appendChild(genres)
        li.appendChild(button)
        gamelist.appendChild(li)
    }
};

getGameData(url)

filter.addEventListener("click", () =>{
    modal.showModal();
    genres = getGenres(url)
    form = `<form method="get" action="index.html"
                <fieldset>
                    <label>genres <select name="genre" required>
                        <option value="" disabled selected>Select a genres...</option>`
    for (let i =0; i<genres.length; i++){
        form += `<option value=${genres[i]}>${genres[i]}</option>`
    }
    form += `</select></label>
                    <input type="submit" name="filter" title="filter" value="filter">
                </fieldset>
            </form>`
})

close.addEventListener("click", () =>{
    modal.close();
})