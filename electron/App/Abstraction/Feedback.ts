export interface IFeedback {
  setComunication: (event: Electron.IpcMainEvent, channel: string) => void;
  sendFeedBack: (arg: any) => void;
  setChannel: (channel: string) => void;
}
