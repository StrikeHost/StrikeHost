import { Agent } from "../Agent";
import { ServerEvent } from "../../interfaces/ServerEvents";

export abstract class Handler {
  protected agent: Agent;

  public constructor(agent: Agent) {
    this.agent = agent;
  }

  public abstract dispatch(event: ServerEvent): void;
}
