import { GameServerInstance } from "../interfaces/GameServerInstance";
import { GameServerType } from "../enums/GameServerType";

export const SampleGameServer: GameServerInstance = {
  id: "test",
  storage: 10,
  port: 25565,
  memory: 1024,
  is_running: false,
  docker_id: "test",
  version: "1.17.1",
  docker_volume_id: "test",
  type: GameServerType.MINECRAFT,
};

export const SampleGameServer2: GameServerInstance = {
  id: "test2",
  storage: 10,
  port: 25566,
  memory: 1024,
  is_running: false,
  docker_id: "test2",
  version: "1.17.1",
  docker_volume_id: "test2",
  type: GameServerType.MINECRAFT,
};
