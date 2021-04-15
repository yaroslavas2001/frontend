import Position from "@/views/components/ui-maps/position";

export default class MarkerModel {
  Id: number;
  Position: Position;
  Icon: String;
  Draggable: boolean = false;
  Type: number;
  Name: string;
  Address: string;
  public constructor(
    id: number,
    position: Position,
    icon: string,
    draggable: boolean = false,
    type: number = 0,
    name: string,
    address: string
  ) {
    this.Id = id;
    this.Position = position;
    this.Icon = icon;
    this.Draggable = draggable;
    this.Type = type;
    this.Name = name;
    this.Address = address;
  }
}
