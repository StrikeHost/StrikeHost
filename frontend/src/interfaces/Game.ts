export interface Game {
  id: GameType;
  name: string;
  slug: string;
  images?: Image[];
}

export interface Image {
  id: string;
  game?: Game;
  name: string;
  slug: string;
  gameId?: GameType;
  min_memory?: number;
  docker_name: string;
  versions?: ImageVersion[];
}

export interface ImageVersion {
  id: string;
  name: string;
  image?: Image;
  arguments: Record<string, string>;
}

export interface PackRequirements {
  memory: number;
  storage: number;
}

export enum GameType {
  MINECRAFT = "minecraft",
}
