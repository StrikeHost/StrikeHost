import { Agent } from "./Agent";
import { Handler } from "./handlers/Handler";
import { ServerEvent, ServerEventName } from "../interfaces/ServerEvents";

export class Router {
  protected static routes: Record<string, new (agent: Agent) => Handler> = {};

  public static add<T extends new (agent: Agent) => Handler>(
    event: ServerEventName,
    handler: T
  ) {
    Router.routes[event] = handler;
  }

  public static handle(agent: Agent, event: ServerEvent) {
    const handler = new Router.routes[event.event](agent);
    handler.dispatch(event);
  }
}
