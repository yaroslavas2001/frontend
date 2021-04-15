import IEqual from "scripts/frameworks/iequal";

export default class DeviceModel implements IEqual<DeviceModel> {
  id: number;
  name: string;
  roles:number[]

  public constructor(id: number, name: string,roles:number[]) {
    this.id = id;
    this.name = name;
    this.roles = roles;
  }

  public Equal(object: DeviceModel) {
    return this.id == object.id;
  }
  public EqualRelation(object: DeviceModel): boolean {
    return null;
  }
  public ToString() {
    return `${this.name}`;
  }
}
