import EnumNewsType from "@dataSource/api/RunPay/DataModels/Enums/EnumNewsType";
import newsTranslation from "./news-ranslation";
export default class NewsModel  {
  id: number;
  name: string;
  translations: newsTranslation[];  
  // description:string;
  dateCreate: Date;
  folderName:string;
  type:EnumNewsType;
  image:string;
  zipArchiveFile:string;
}
