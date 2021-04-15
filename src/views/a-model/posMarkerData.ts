import MapDetailsItemResponse from "@dataSource/api/RunPay/Admin/IServices/Models/Map/MapDetailsItemResponse";
import MapEmployeeItemResponse from "@/views/components/ui/maps/node_modules/@dataSource/api/RunPay/Admin/IServices/Models/Map/MapEmployeeItemResponse";
import ObjectFactory from "scripts/frameworks/objectFactory";
import MarkerTemplate from "../components/ui-maps/markerTemplate";
import Position from "../components/ui-maps/position";

export default class PosMarkerData extends MarkerTemplate {
  // info: MarkerInfo;
  id: number;
  code: string = "";
  address: string = "";
  phone: string = "";
  balance: number;
  draggable: boolean = false;
  businessHours: string;
  photoUrl: string;
  agentName: string;

  employees: Array<MapEmployeeItemResponse>;
  constructor(data: PosMarkerData) {
    super();
    this.id = data.id;
    this.draggable = !!data.draggable;
    this.positionPoint = data.positionPoint == null ? null : new Position(data.positionPoint.lat || 0, data.positionPoint.lng || 0);
    this.typePoint = data.typePoint;
    this.statusPoint = data.statusPoint;
    this.businessHours = data.businessHours;
    this.icon = data.icon;
    this.code = data.code;
    this.address = data.address;
    this.balance = data.balance;
    this.phone = data.phone;
    this.photoUrl = data.photoUrl;
    this.agentName = data.agentName;
  }
  fromResponse(val: MapDetailsItemResponse) {
    (this.id = val.Id), (this.code = val.Code ? val.Code.toString() : "");
    this.address = val.Address ? val.Address.toString() : "";
    this.phone = val.Phone ? val.Phone.toString() : "";
    this.balance = val.Balance || 0;
    this.employees = val.Employees;
    this.businessHours = val.BusinessHours ? val.BusinessHours.toString() : "";
    this.photoUrl = val.PhotoUrl ? val.PhotoUrl.toString() : "";
    this.agentName = val.AgentName ? val.AgentName.toString() : "";
    // console.log("from res: ", this);
  }
}
