import { Game, Games, NotFound } from '../types/interfaces';

export const api = {
  url: 'https://free-to-play-games-database.p.rapidapi.com/api',
  options: {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c7d377c265msh77b1e742ca44d4bp197008jsn051078af1095', // add to .env
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    },
  },

  async getAllGames(sortValue?: string, platformValue?: string, genreValue?: string) {
    let hasParam = false;
    let url = this.url + '/games';
    if (genreValue) {
      url += `?category=${genreValue}`;
      hasParam = true;
    }
    if (platformValue) {
      url += `${hasParam ? '&' : '?'}platform=${platformValue}`;
      hasParam = true;
    }
    if (sortValue) {
      url += `${hasParam ? '&' : '?'}sort-by=${sortValue}`;
    }

    console.log(url);

    try {
      const response = await fetch(url, this.options);
      const textResult = await response.text();
      const textToObj: Games[] | NotFound = await JSON.parse(textResult);
      return textToObj;
    } catch (error) {
      console.error(error);
    }
  },

  async getGameById(id: number) {
    try {
      const response = await fetch(`${this.url}/game?id=${id}`, this.options);
      const textResult = await response.text();
      const textToObj: Game | NotFound = await JSON.parse(textResult);
      return textToObj;
    } catch (error) {
      console.error(error);
    }
  },
};
