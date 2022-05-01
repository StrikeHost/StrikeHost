import { Injectable } from '@nestjs/common';
import { Agent } from 'src/agent/agent.entity';

@Injectable()
export class WebsocketService {
  private _agentClients: string[];
  private _frontendClients: string[];
  private _agentSocketMap: Record<string, string>;
  private _frontendSocketMap: Record<string, string>;

  constructor() {
    this._agentClients = [];
    this._frontendClients = [];
    this._agentSocketMap = {};
    this._frontendSocketMap = {};
  }

  /**
   * Triggered on client disconnect
   *
   * @param {string} clientId
   */
  public onClientDisconnect(clientId: string) {
    // This client should no longer be included in subscriptions
    this._agentClients = this._agentClients.filter((id) => id !== clientId);
    this._frontendClients = this._frontendClients.filter(
      (id) => id !== clientId,
    );
  }

  /**
   * Registers a connection as a frontend one
   *
   * @param {string} clientId
   */
  public registerFrontendConnection(clientId: string) {
    this._frontendClients.push(clientId);
  }

  /**
   * Registers a connection as an agent one
   *
   * @param {string} clientId
   */
  public registerAgentConnection(clientId: string, agent: Agent) {
    this._agentClients.push(clientId);
  }

  /**
   * Is the specified connection an agent?
   *
   * @param {string} clientId
   * @returns {boolean}
   */
  public isAgentConnection(clientId: string): boolean {
    return this._agentClients.some((id) => id === clientId);
  }

  public get agentClients() {
    return this._agentClients;
  }

  public get frontendClients() {
    return this._frontendClients;
  }
}
