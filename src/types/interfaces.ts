export interface Games {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface NotFound {
  status: number;
  status_message: string;
}

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements?: MinimumSystemRequirements;
  screenshots?: ScreenshotsEntity[] | null;
}

export interface MinimumSystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}
export interface ScreenshotsEntity {
  id: number;
  image: string;
}

export interface SavedGameState {
  game: Game | NotFound | null;
  prevGame: Game | NotFound | null;
  date: number | null;
  id: number | null;
  prevId: number | null;
}
