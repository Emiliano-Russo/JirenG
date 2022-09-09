
export interface IFeedback{
    setEvent : (event: Electron.IpcMainEvent, channel:string) => void;
    sendFeedBack: (text:string) => void;
}