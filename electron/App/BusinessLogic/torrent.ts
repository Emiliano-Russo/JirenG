import { ITorrent } from "../Abstraction/Torrent";
const { exec } = require("child_process");
import * as Child_Process from "child_process";

export class Torrent implements ITorrent {
  private childProcess: typeof Child_Process;
  private cmd = "start cmd /k torrent ";

  constructor(childProcess: typeof Child_Process) {
    this.childProcess = childProcess;
  }

  public downloadTorrent(magnetUri: string): void {
    const finalCmd = this.cmd + magnetUri;
    this.childProcess.exec(finalCmd);
  }
}
