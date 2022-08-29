import { Torrent } from "../BusinessLogic/torrent";

var assert = require("assert");
describe("#Torrent", function () {
  it("should execute 'start cmd /k torrent TORRENT_URI'", function () {
    let cmd = "";
    const childProcessMock: any = {
      exec: (command: string) => {
        cmd = command;
      },
    };
    const torrent = new Torrent(childProcessMock);
    torrent.downloadTorrent("TORRENT_URI");
    assert.equal(cmd, "start cmd /k torrent TORRENT_URI");
  });
});
