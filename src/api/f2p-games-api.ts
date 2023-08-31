import { Game, Games, NotFound } from '../types/interfaces';

export const gamesController = new AbortController();
const gamesSignal = gamesController.signal;
export const gameController = new AbortController();
const gameSignal = gamesController.signal;

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

    let retries = 3;
    while (retries > 0) {
      try {
        const response = await fetch(
          url,
          Object.defineProperty(this.options, 'signal', gamesSignal)
        );
        const textResult = await response.text();
        const textToObj: Games[] | NotFound = await JSON.parse(textResult);
        return textToObj;
      } catch (error: unknown) {
        if ((error as Error).name === 'AbortError') {
          console.log('Request was aborted');
        }
        retries--;
      }
    }
    console.error('All retries failed');
    return {
      status: 0,
      status_message: 'Cannot reach the server.',
    };
  },

  async getGameById(id: number) {
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await fetch(
          `${this.url}/game?id=${id}`,
          Object.defineProperty(this.options, 'signal', gameSignal)
        );
        const textResult = await response.text();
        const textToObj: Game | NotFound = await JSON.parse(textResult);
        return textToObj;
      } catch {
        retries--;
      }
    }
    console.error('All retries failed');
    return {
      status: 0,
      status_message: 'Cannot reach the server.',
    };
  },
};
