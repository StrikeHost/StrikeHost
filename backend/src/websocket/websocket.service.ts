import { Socket } from 'socket.io';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from 'src/user/user.entity';
import { Agent } from 'src/agent/agent.entity';
import { ServerMessageType } from 'src/enums/WebsocketMessageType';
import { InstanceRepository } from 'src/instance/instance.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WebsocketService {
  private _agentClients: string[];
  private _frontendClients: string[];
  private _clientSockets: Record<string, Socket>;
  /* Client ID to Agent ID */
  private _agentSocketMap: Record<string, string>;
  /* Agent ID to Client ID */
  private _agentSocketReverseMap: Record<string, string>;
  /* Client ID to User ID */
  private _frontendSocketMap: Record<string, string>;
  /* User ID to Client ID */
  private _frontendSocketReverseMap: Record<string, string>;

  constructor(
    @InjectRepository(InstanceRepository)
    private instanceRepository: InstanceRepository,
  ) {
    this._agentClients = [];
    this._frontendClients = [];
    this._clientSockets = {};
    this._agentSocketMap = {};
    this._agentSocketReverseMap = {};
    this._frontendSocketMap = {};
    this._frontendSocketReverseMap = {};
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

    // If the client was frontend, deregister it
    if (this._frontendSocketMap[clientId]) {
      delete this._frontendSocketReverseMap[this._frontendSocketMap[clientId]];
      delete this._frontendSocketMap[clientId];
    }

    // If the client was agent, deregister it
    if (this._agentSocketMap[clientId]) {
      delete this._agentSocketReverseMap[this._agentSocketMap[clientId]];
      delete this._agentSocketMap[clientId];
    }
  }

  /**
   * Registers a connection as a frontend one
   *
   * @param {string} clientId
   */
  public registerFrontendConnection(socket: Socket, user: User) {
    const clientId = socket.id;
    this._clientSockets[clientId] = socket; // Save the socket for later usage
    this._frontendClients.push(clientId);
    this._frontendSocketMap[clientId] = user.id;
    this._frontendSocketReverseMap[user.id] = clientId;
  }

  /**
   * Registers a connection as an agent one
   *
   * @param {string} clientId
   */
  public registerAgentConnection(socket: Socket, agent: Agent) {
    const clientId = socket.id;
    this._clientSockets[clientId] = socket; // Save the socket for later usage
    this._agentClients.push(clientId);
    this._agentSocketMap[clientId] = agent.id;
    this._agentSocketReverseMap[agent.id] = clientId;
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

  /**
   * Send a message to the specified client
   *
   * @param {string} clientId
   * @param {ServerMessageType} event
   * @param {any} data
   */
  public sendMessage(clientId: string, event: ServerMessageType, data: any) {
    const success = this._clientSockets[clientId]?.emit(event, data);

    if (success) return;

    // The client isn't connected, log the error
    // TODO: Log the error
  }

  /**
   * Gets any associated frontend connection with a particular instance id
   *
   * @param instanceId
   * @returns
   */
  public async getInstanceFrontendConnection(instanceId: string) {
    const instance = await this.instanceRepository.findOne(instanceId, {
      relations: ['user'],
    });

    if (!instance) {
      throw new NotFoundException();
    }

    const userId = instance.user.id;
    const wsClientId = this._frontendSocketReverseMap[userId];

    return wsClientId;
  }

  public get agentClients() {
    return this._agentClients;
  }

  public get frontendClients() {
    return this._frontendClients;
  }

  /**
   * Returns the socket id associated with the specified agent
   *
   * @param agentId
   * @returns
   */
  public getAgentClientId(agentId: string) {
    return this._agentSocketReverseMap[agentId];
  }
}
