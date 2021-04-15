import EnumPartnerType from "@dataSource/api/RunPay/DataModels/Enums/EnumPartnerType";


export default class PartnerModel  {
  id: number;
  type: EnumPartnerType;
  image: string;
  url: string;
  dateCreate:Date;
  


  // Id: number;
	// Url?: String;
	// Type: EnumPartnerType;
	// DateCreate: Date;
  // public constructor(id: number, name: string, email:string, password:string ) {
  //   this.id = id;
  //   this.name = name;
  //   this.email = email;
  //   this.password = password;
  // }

  
  // public ToString() {
  //   return `${this.name}`;
  // }
}
