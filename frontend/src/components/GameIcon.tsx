import {
  faCubes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GameType } from "interfaces/Game";

export interface GameIconProps {
  game?: string;
}

export const GameIcon = ({ game }: GameIconProps) => {
  if (!game) {
    return <FontAwesomeIcon icon={faExclamationTriangle} />;
  }

  switch (game) {
    case GameType.MINECRAFT:
      return <FontAwesomeIcon icon={faCubes} />;
    default:
      return <FontAwesomeIcon icon={faExclamationTriangle} />;
  }
};
