<template>
  <div class="months">
    <div class="navigation">
      <div class="backward" @click="backward"></div>
      <div class="title_date-picker unselectable" @click.stop="changeYear">
        {{ innerYear }}
      </div>
      <div class="next" @click="next"></div>
    </div>
    <div class="items">
      <template v-for="(month, key) in innerMonths" :key="key">
        <div class="month" :class="month.type">
          <div @click.stop="changeMonth(month)">{{ month.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import moment from "moment";
@Options<UiMonths>({
  props: {
    date: Date,
    minimumDate: Date,
    months: [],
  },
})
export default class UiMonths extends Vue {
  // @Prop({ default: new Date(), type: Date })         date: Date;
  // @Prop({ default: null, type: Date })        minimumDate: Date;
  // @Prop({
  //   default: () => [
  //     "янв",
  //     "фев",
  //     "мар",
  //     "апр",
  //     "май",
  //     "июн",
  //     "июл",
  //     "авг",
  //     "сен",
  //     "окт",
  //     "ноя",
  //     "дек"
  //   ],
  //   type: Array
  // })
  // months: any[];
  readonly date: Date = new Date();
  readonly minimumDate: Date = new Date();
  readonly months: string[] = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  innerMonths: any[] = [];
  innerMonth = this.date.getMonth();
  innerYear = this.date.getFullYear();
  innerDay = this.date.getDate();

  mounted() {
    this.setMonths();
    this.setMonth(this.date);
  }

  setMonths() {
    var self = this;
    this.innerMonths = this.months.map(function (item, index) {
      return {
        number: index,
        name: item,
        type: !self.checkDateActivity(index)
          ? "no-active"
          : self.innerMonth == index
          ? "current"
          : "",
      };
    });
  }
  setMonth(date: Date) {
    this.innerYear = date.getFullYear();
  }
  next() {
    this.setMonth(new Date(this.innerYear + 1, this.innerMonth, 1));
  }
  backward() {
    this.setMonth(new Date(this.innerYear - 1, this.innerMonth, 1));
  }
  changeMonth(month: any) {
    let mon = parseInt(moment(this.date).format("MM")) - 1;
    let day = parseInt(moment(this.date).format("DD"));
    let hour = parseInt(moment(this.date).format("HH"));
    let min = parseInt(moment(this.date).format("mm"));
    let sek = parseInt(moment(this.date).format("ss"));

    // if (year.type != "no-active") {
    // this.$emit("changeYear", new Date(year.number, mon, day,hour,min,sek));Ы
    // this.innerYear = year.number;
    // this.setYears(new Date(year.number, mon, day,hour,min,sek));
    // }

    if (month.type != "no-active") {
      this.$emit(
        "changeMonth",
        new Date(this.innerYear, month.number, day, hour, min, sek)
      );
      this.innerMonth = month.number;
      this.setMonths();
    }
  }
  changeYear() {
    this.$emit("onNavigation");
  }
  /**
   * Проверить активность даты
   */
  checkDateActivity(month: any) {
    if (!this.minimumDate) return true;
    return (
      new Date(this.innerYear, month) >
      new Date(this.minimumDate.getFullYear(), this.minimumDate.getMonth(), 0)
    );
  }
}
</script>

<style lang="less">
// @uiMonthsTitleColor               :#fff;
@uiMonthsColor: #b8c3e0;

@uiMonthsColorHover: #fff;
@uiMonthsBgColorHover: #3e71bb;

@uiMonthsBgColorCurent: #ff7f66;
@uiMonthsBgColorCurentHover: #ff7f66;
@uiMonthsColorCurent: #262838;
@uiMonthsColorNoActive: #465675;

.months {
  .items {
    // width: 210px;
    height: 210px;
    padding: 0.9em 1.2em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    // font-size: 14px;
    font-size: 0.9em;
    .month {
      display: flex;
      align-items: center;
      justify-content: center;
      color: @uiMonthsColor;
      cursor: pointer;
      &:hover > div {
        color: @uiMonthsColorHover;
        background-color: @uiMonthsBgColorHover;
        border-radius: 15px;
        padding: 7px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      &.current > div {
        color: @uiMonthsColorCurent;
        background-color: @uiMonthsBgColorCurentHover;
        border-radius: 15px;
        padding: 7px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      &.no-active {
        color: @uiMonthsColorNoActive;
        cursor: default;
      }
    }
  }
}
</style>
