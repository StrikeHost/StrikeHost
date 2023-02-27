import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GameType } from "interfaces/Game";

export interface GameIconProps {
  game?: string;
}

export const GameIcon = ({ game }: GameIconProps) => {
  if (!game) {
    return <FontAwesomeIcon icon="exclamation-triangle" />;
  }

  switch (game) {
    case GameType.MINECRAFT:
      return <FontAwesomeIcon icon="cubes" />;
    default:
      return <FontAwesomeIcon icon="exclamation-triangle" />;
  }
};
