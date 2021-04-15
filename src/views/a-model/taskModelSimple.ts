import IEqual from "scripts/frameworks/iequal";

export default class TaskModelSimple implements IEqual<TaskModelSimple> {
  id: number;

  name: String;
  public constructor(id: number, name: String) {
    this.id = id;

    this.name = name;
  }

  public Equal(object: TaskModelSimple) {
    return this == object;
  }
  public EqualRelation(object: TaskModelSimple): boolean {
    return null;
  }
  public ToString() {
    return `${this.name}`;
  }
  public static NewObjectFromJSon(obj: object) {
    return new TaskModelSimple(obj.Value.id, obj.Value.name);
  }
}
