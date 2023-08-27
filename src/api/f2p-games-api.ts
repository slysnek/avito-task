export const api = {
  url: 'https://free-to-play-games-database.p.rapidapi.com/api',
  options: {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c7d377c265msh77b1e742ca44d4bp197008jsn051078af1095', // add to .env
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    },
  },

  async getAllGames() {
    try {
      const response = await fetch(`${this.url}/games`, this.options);
      const textResult = await response.text();
      const textToObj = await JSON.parse(textResult);
      return textToObj;
    } catch (error) {
      console.error(error);
    }
  },

  async getGameById(id: number) {
    try {
      const response = await fetch(`${this.url}/game?id=${id}`, this.options);
      const textResult = await response.text();
      const textToObj = await JSON.parse(textResult);
      console.log(textToObj);
      return textToObj;
    } catch (error) {
      console.error(error);
    }
  },
};
