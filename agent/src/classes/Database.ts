import { Database as DatabaseConn } from "sqlite3";
import { promisify } from "util";

import { Instance, SerializedInstance } from "../interfaces/Instance";

/**
 * Utility class for database functions
 */
export class Database {
  private static conn: DatabaseConn;
  private static all: (sql: string, args: any[]) => Promise<any>;
  private static run: (sql: string, args: any[]) => Promise<any>;

  /**
   * Database constructor
   *
   * @param {DatabaseConn} database
   */
  public static init() {
    Database.conn = new DatabaseConn(process.env.DATABASE_PATH);
    Database.all = promisify(Database.conn.all).bind(Database.conn);
    Database.run = promisify(Database.conn.run).bind(Database.conn);
  }

  /**
   * Register a newly-provisioned server
   *
   * @param {Instance} server
   */
  public static createInstance(instance: SerializedInstance) {
    Database.conn.run(
      "INSERT INTO instances (id, data) VALUES (?, ?)",
      instance.instance.id,
      JSON.stringify(instance)
    );
  }

  public static updateInstance(instance: SerializedInstance) {
    Database.conn.run(
      "UPDATE instances SET data = ? WHERE id = ?",
      JSON.stringify(instance),
      instance.instance.id
    );
  }

  /**
   * Delete a previously-provisioned server
   *
   * @param {string} instanceId
   */
  public static deleteInstance(instanceId: string) {
    Database.conn.run("DELETE FROM instances WHERE id = ?", instanceId);
  }

  /**
   * Retrieve details for specified server
   *
   * @param {string} instanceId
   * @returns {Promise<SerializedInstance>}
   */
  public static async getInstance(
    instanceId: string
  ): Promise<SerializedInstance> {
    const results = await Database.all("SELECT * FROM instances WHERE id = ?", [
      instanceId,
    ]);

    return JSON.parse(results[0]["data"]);
  }

  /**
   * Gets an array of all registered servers
   *
   * @returns {Promise<SerializedInstance[]>}
   */
  public static async getAllInstances(): Promise<SerializedInstance[]> {
    const results = await Database.all("SELECT * FROM instances", []);
    return results.map((row: any) => {
      return JSON.parse(row["data"]);
    });
  }

  /**
   * Returns a boolean representing whether the specified server exists
   *
   * @param {string} instanceId
   * @returns {Promise<boolean>}
   */
  public static async instanceExists(instanceId: string): Promise<boolean> {
    const servers = await Database.getAllInstances();

    return servers.some((server) => server.instance.id === instanceId);
  }

  /**
   * Gets the value of a specified setting
   *
   * @param {string} setting
   * @returns {Promise<T | undefined>}
   */
  public static async getSetting<T>(setting: string): Promise<T | undefined> {
    const results = await Database.all("SELECT * FROM settings WHERE key = ?", [
      setting,
    ]);

    if (results.length > 0) {
      return results[0].value;
    }

    return undefined;
  }

  /**
   * Changes the value of a specified setting
   *
   * @param {string} name
   * @param {T} value
   */
  public static async setSetting<T>(name: string, value: T): Promise<void> {
    await Database.run(
      "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",
      [name, value]
    );
  }
}
