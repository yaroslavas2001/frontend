import ItemService from "dataSource/api/Pharmacies/Admin/Services/ItemService";
import SearchRequest from "../../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import FilterRequest from "../../../dataSource/api/Pharmacies/Common/Extensions/Models/FilterRequest";

export default class ViewModelFilter extends FilterRequest {
  moment = require("moment");
  private _searchStringGiftCategoryID?: string = null;
  public get searchStringGiftCategoryID(): string {
    return this._searchStringGiftCategoryID;
  }
  public set searchStringGiftCategoryID(v: string) {
    this._searchStringGiftCategoryID = v;
    this.applySearch({ SearchValue: v }, ...this.searchFieldNamesGiftCategoryID);
  }
  private _searchStringOrderStatus?: string = null;
  public get searchStringOrderStatus(): string {
    return this._searchStringOrderStatus;
  }
  public set searchStringOrderStatus(v: string) {
    this._searchStringOrderStatus = v;
    this.applySearch({ SearchValue: v }, ...this.searchFieldNamesOrderStatus);
  }
  private _searchString?: string = null;
  public get searchString(): string {
    return this._searchString;
  }
  public set searchString(v: string) {
    this._searchString = v;
    this.applySearch({ SearchValue: v }, ...this.searchFieldNames);
  }
  private _searchStringQuestionText?: string = null;
  public get searchStringQuestionText(): string {
    return this._searchString;
  }
  public set searchStringQuestionText(v: string) {
    this._searchStringQuestionText = v;
    this.applySearch({ SearchValue: v }, ...this.searchFieldNamesQuestionText);
  }

  private _searchStringTitle?: string = null;
  public get searchStringTitle(): string {
    return this._searchStringTitle;
  }
  public set searchStringTitle(v: string) {
    this._searchStringTitle = v;
    this.applySearch({ SearchValue: v }, ...this.searchFieldTitle);
  }

  private _searchStringName?: string = null;
  public get searchStringName(): string {
    return this._searchStringName;
  }
  public set searchStringName(v: string) {
    this._searchStringName = v;
    this.applySearch({ SearchValue: v }, ...this.searchFieldNameNames);
  }

  private _dateFrom?: Date = null;
  public get dateFrom(): Date {
    return this._dateFrom;
  }
  public set dateFrom(v: Date) {
    this._dateFrom = v;
    this.applySearch({ SearchFrom: this.moment(v).format("YYYY-MM-DD") }, ...this.searchFromFieldNames);
  }
  private _dateTo?: Date = null;
  public get dateTo(): Date {
    return this._dateTo;
  }
  public set dateTo(v: Date) {
    this._dateTo = v;
    this.applySearch({ SearchTo: this.moment(v).format("YYYY-MM-DD") }, ...this.searchToFieldNames);
  }

  private _dateFromDate?: Date = null;
  public get dateFromDate(): Date {
    return this._dateFromDate;
  }
  public set dateFromDate(v: Date) {
    this._dateFromDate = v;
    this.applySearch({ SearchFrom: this.moment(v).format("YYYY-MM-DD") }, ...this.searchFromFieldNamesDate);
  }
  private _dateToDate?: Date = null;
  public get dateToDate(): Date {
    return this._dateToDate;
  }
  public set dateToDate(v: Date) {
    this._dateToDate = v;
    this.applySearch({ SearchTo: this.moment(v).format("YYYY-MM-DD") }, ...this.searchToFieldNamesDate);
  }
  searchFieldNamesOrderStatus: string[] = ["OrderStatusID"];
  searchFieldNamesGiftCategoryID: string[] = ["GiftCategoryID"];
  searchFieldNamesQuestionText: string[] = ["QuestionText"];
  searchFieldNames: string[] = ["Login"];
  searchFieldTitle: string[] = ["Title"];
  searchFieldNameNames: string[] = ["Name"];
  searchFromFieldNames: string[] = ["LastLogin"];
  searchToFieldNames: string[] = ["LastLogin"];
  searchToFieldNamesDate: string[] = ["Date"];
  searchFromFieldNamesDate: string[] = ["Date"];
  constructor(obj?: Partial<FilterRequest>) {
    super(
      obj || {
        Pagination: {
          Skip: 0,
          Take: 10,
        },
      }
    );
  }
  private applySearch(request: Partial<SearchRequest>, ...fieldNames: string[]) {
    if (this.Search == null) {
      this.Search = [];
    }

    fieldNames.forEach((fieldName) => {
      let originalSearch = this.Search.find((x) => x.FieldName === fieldName);
      if (originalSearch == null) {
        this.Search.push(
          new SearchRequest(
            Object.assign(request, {
              FieldName: fieldName,
            })
          )
        );
      } else {
        Object.assign(originalSearch, request);
      }
    });
  }
}
