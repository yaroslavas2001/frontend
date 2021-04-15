import EnumNewsType from "@dataSource/api/RunPay/DataModels/Enums/EnumNewsType";
import VacancyTranslation from "@dataSource/api/RunPay/Admin/IServices/Models/UserMobile/VacancyTranslation";
export default class JobModel  {
  id               : number;
  name             : string;
  translations     : VacancyTranslation[];
  
}
