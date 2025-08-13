const url = "https://www.freetogame.com/api/games";

const getGames = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.forEach(game => {
            game.genre = game.genre.trim();
        });
        return data;
    } catch (error) {
        console.error("Error fetching games:", error);
        throw error;
    }
};

const getGameById = async (gameId) => {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        let i = 0
        let d = 0
        while (d==0 && i < data.length) {
            if (data[i].id == gameId) {
                d = data[i];
            }
            i++;

        }
        return d;
    } catch (error) {
        console.error("Error fetching game by ID:", error);
        throw error;
    }
};

module.exports = {
    getGames,
    getGameById
};
