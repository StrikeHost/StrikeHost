import { chunksToLinesAsync, streamWrite } from "@rauschma/stringio";
import { ChildProcessByStdio } from "child_process";
import { Readable, Writable } from "stream";

export class ProcessIo {
  /**
   * Child process
   */
  public childProcess: ChildProcessByStdio<Writable, Readable, null>;

  constructor(childProcess: ChildProcessByStdio<Writable, Readable, null>) {
    this.childProcess = childProcess;
  }

  /**
   * Writes text to instance stdin
   *
   * @param input
   */
  public async stdin(input: string) {
    await streamWrite(this.childProcess.stdin, input);
  }

  public async stdout() {
    for await (const line of chunksToLinesAsync(this.childProcess.stdout)) {
      // TODO: Handle stdout
    }
  }
}
