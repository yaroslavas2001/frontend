export default interface SheduleModel {
  Id: number;
  Name: string;
  TimeWork: { From: Date; To: Date };
  Active: boolean;
}
