import { api } from "../utils/api";
import { Instance } from "../interfaces/Instance";

export class InstanceService {
  /**
   * Gets all instances for a user
   *
   * @param {string} discordId
   * @returns {Promise<Instance[]>}
   */
  public static async getInstances(discordId: string): Promise<Instance[]> {
    const instances = await api.get<Instance[]>(
      `/discord/user/${discordId}/instances`
    );

    return instances.data;
  }

  /**
   * Starts an instance
   *
   * @param {string} instanceId
   * @returns {Promise<void>}
   */
  public static async startInstance(instanceId: string): Promise<void> {
    await api.post(`/discord/instance/${instanceId}/start`);
  }

  /**
   * Stops an instance
   *
   * @param {string} instanceId
   * @returns {Promise<void>}
   */
  public static async stopInstance(instanceId: string): Promise<void> {
    await api.post(`/discord/instance/${instanceId}/stop`);
  }
}
