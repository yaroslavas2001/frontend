export default class NotificationOptions {
  timeOut = 5000;
  message: string = "";
  title: string = "";
  animate: string = "fromTop";
  type: EnumNotificationType;
  top: number = 0;

  constructor(
    title: string,
    message: string,
    type: EnumNotificationType,
    timeOut?: number
  ) {
    this.timeOut = timeOut ? timeOut : this.timeOut;
    this.message = message;
    this.title = title;
    this.type = type;
  }
}

export enum EnumNotificationType {
  Error,
  Success
}
