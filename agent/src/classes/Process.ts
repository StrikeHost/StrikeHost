import { Readable, Writable } from "stream";
import { spawn, exec, ChildProcessByStdio, execSync } from "child_process";

import { Instance } from "./Instance";
import { ProcessIo } from "./ProcessIo";

export class Process {
  /**
   * Parent instance
   */
  private readonly instance: Instance;

  /**
   * Docker image name
   */
  private readonly dockerImage: string;

  /**
   * Docker container id.
   * Null if not initialised.
   */
  private containerId: string;

  /**
   * The external container port.
   * For the internal server port, see Instance.
   */
  private readonly port: number;

  /**
   * Custom arguments for starting the instance
   */
  private readonly customArguments: Record<string, string>;

  /**
   * Manages the process stdin/stdout
   */
  private io: ProcessIo | null = null;

  /**
   * Child process
   */
  public childProcess: ChildProcessByStdio<Writable, Readable, null> | null =
    null;

  constructor(
    instance: Instance,
    dockerImage: string,
    containerId: string,
    port: number,
    customArguments: Record<string, string>
  ) {
    this.instance = instance;
    this.dockerImage = dockerImage;
    this.containerId = containerId;
    this.port = port;
    this.customArguments = customArguments;
  }

  /**
   * Create docker instance. Returns container id
   */
  public provision(): string {
    const dockerArgs = [
      "docker",
      "create",
      `-p=${this.port}:${this.port}`,
      `--expose=${this.port}`,
      `--name=${this.instance.id}`,
      ...this.getCustomArguments(),
      `${this.dockerImage}`,
    ];

    const containerId = execSync(dockerArgs.join(" "));

    console.log(`Provisioned instance: ${containerId}`);

    return containerId.toString();
  }

  /**
   * Start docker instance
   */
  public async start() {
    if (this.isRunning()) {
    }

    const args = this.getDockerStartCommand();
    this.childProcess = spawn("docker", args, {
      stdio: ["pipe", "pipe", process.stderr],
    });

    this.io = new ProcessIo(this.childProcess);
    this.io.stdout();
  }

  /**
   * Stop docker instance
   *
   * @returns {Promise<void>}
   */
  public async stop(): Promise<void> {
    if (!this.isRunning()) {
      throw `Cannot stop instance ${this.instance.id} that is not running`;
    }

    try {
      this.getDockerStopCommand().forEach(async (command) => {
        this.io!.stdin(command);
      });
    } catch {
      await this.kill();
    }
  }

  /**
   * Delete the docker container
   */
  public async delete(): Promise<void> {
    if (this.isRunning()) {
      await this.stop();
    }

    exec(`docker rm ${this.containerId}`);
  }

  /**
   * Forcefully kill the process
   */
  public async kill(): Promise<void> {
    this.childProcess?.kill();
  }

  public isRunning() {
    const results = execSync("docker ps");
    return results.includes(this.containerId);
  }

  private getDockerStartCommand(): string[] {
    if (!this.containerId) {
      throw `Instance ${this.instance.id} not provisioned`;
    }

    return ["start", "-i", this.containerId];
  }

  private getDockerStopCommand(): string[] {
    return ["stop"];
  }

  private getCustomArguments(): string[] {
    return Object.keys(this.customArguments).map(
      (key) => `-e ${key}="${this.customArguments[key]}"`
    );
  }
}
