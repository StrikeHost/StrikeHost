export interface InheritableGameComponents {
  arguments?: Record<string, string>;
  docker_name?: string;
  min_memory?: number;
  min_storage?: number;
  min_cpu?: number;
}

export interface Game extends InheritableGameComponents {
  id: GameType;
  name: string;
  slug: string;
  images?: Image[];
}

export interface Image extends InheritableGameComponents {
  id: string;
  game?: Game;
  name: string;
  slug: string;
  gameId?: GameType;
  versions?: ImageVersion[];
}

export interface ImageVersion extends InheritableGameComponents {
  id: string;
  name: string;
  image?: Image;
}

export interface PackRequirements {
  memory: number;
  storage: number;
}

export enum GameType {
  MINECRAFT = "minecraft",
}
