<template>
  <div class="days">
    <div class="navigation">
      <div class="backward" @click="backward"></div>
      <div class="title_date-picker" @click.stop="changeMonth">
        {{ moment(new Date(this.innerYear, this.innerMonth, 1)) }}
      </div>
      <div class="next" @click="next"></div>
    </div>
    <div class="items">
      <template v-for="(item, key) in weeks" :key="key">
        <div class="weekday">{{ moment(item, "ddd") }}</div>
      </template>
      <div v-for="day in innerDays" :key="day.date.getTime() + new Date()">
        <slot name="day" v-bind="day">
          <div class="day" :class="day.type" @click="changeDay(day)">
            <span class="backround-current"></span>
            <div>{{ day.number }}</div>
          </div>
        </slot>
      </div>
    </div>
    <div
      class="select-hours icon-clock"
      v-if="allowedToShowView('hours')"
      @click.stop="openHours"
    ></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import moment from "moment";
@Options<UiDays>({
  props: {
    weekday: [],
    date: Date,
    dateSecond: Date,
    allowedToShowView: Function,
    minimumDate: Date,
    maximumDate: Date,
    isDateRange: Boolean,
    eventDates: [],
    showCurrentDay: Boolean,
    letSelectAllDays: Boolean,
  },
  watch: {
    date(value) {
      if (this.isDateRange) {
        if (!this.click) {
          this.innerSecondDate = this.innerDate;
          this.click = !this.click;
        } else {
          if (this.innerDate > this.innerSecondDate) {
            var k = this.innerDate;
            this.innerDate = this.innerSecondDate;
            this.innerSecondDate = k;
          }
          this.click = !this.click;
        }
        this.clearDaysAll();
        this.setMonth(this.date);
      } else {
        this.setMonth(this.date);
      }
    },
  },
})
export default class UiDays extends Vue {
  weekday: string[] = ["Пт", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  date: Date = new Date();
  dateSecond: Date = new Date();
  allowedToShowView: Function;
  minimumDate: Date = null;
  maximumDate: Date = null;
  isDateRange: boolean = false;
  eventDates: Array<any> = [];
  showCurrentDay: boolean = true;
  letSelectAllDays: boolean = true;

  // @Prop({
  //   default: () => ['Пт', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  //   type: Array,
  // })
  // weekday: any[];

  // @Prop({ default: () => new Date(), type: Date }) date: Date;
  // @Prop({ default: () => new Date(), type: Date }) dateSecond: Date;
  // @Prop({ type: Function }) allowedToShowView: Function;
  // @Prop({ default: null, type: Date }) minimumDate: Date;
  // @Prop({ default: null, type: Date }) maximumDate: Date;
  // @Prop({ default: false, type: Boolean }) isDateRange: boolean;
  // @Prop({ default: () => [] }) eventDates: Array<any>;
  // @Prop({ default: true, type: Boolean }) showCurrentDay: boolean;
  // @Prop({ default: true, type: Boolean }) letSelectAllDays: boolean;

  innerDays: any[] = [];
  innerMonth = this.date.getMonth();
  innerYear = this.date.getFullYear();
  innerDay = this.date.getDate();
  innerDate = this.date; // первая дата
  innerSecondDate = this.dateSecond; // вторая дата
  weeks: any[] = [];
  click = false;
  mounted() {
    this.innerMonth = this.date.getMonth();
    this.innerYear = this.date.getFullYear();
    this.innerDay = this.date.getDate();
    this.innerDate = this.date; // первая дата
    this.innerSecondDate = this.dateSecond; // вторая дата
    this.installWeeks();
    this.setMonth(this.date);
  }

  // @Watch("dateSecond")
  // onChangeInnerSecondDate() {
  //   if (this.date > this.dateSecond) {
  //     this.innerDate = this.innerSecondDate;
  //   }
  //   this.clearDaysAll();
  //   this.innerSecondDate = this.dateSecond;
  //   this.setMonth(this.dateSecond);
  // }
  days() {
    return this.innerDays;
  }
  /**
   * Устанавливаем текущий месяц, собираем массив дней, дополняя его до 6 недель
   */
  moment(date: Date, format: string = "DD.MM.YYYY") {
    return moment(date).format(format);
  }
  setMonth(date: Date) {
    this.innerMonth = date.getMonth();
    this.innerYear = date.getFullYear();
    this.innerDays = [];
    var firstDay = new Date(this.innerYear, this.innerMonth, 1).getDay() || 7;
    var days = new Date(this.innerYear, this.innerMonth + 1, 0).getDate();
    var lastDay = new Date(this.innerYear, this.innerMonth, days).getDay() || 7;
    let begin = 2 - firstDay;
    var end = days + (7 - lastDay);
    end = end - begin < 41 ? end + 7 : end;
    for (let index = begin; index <= end; index++) {
      this.innerDays.push({
        type: this.getStyle(index, days),
        number: new Date(this.innerYear, this.innerMonth, index).getDate(),
        date: new Date(this.innerYear, this.innerMonth, index),
      });
    }
  }
  getStyle(index: number, days: any) {
    // return index < 1 || index > days || !this.checkDateActivity(index)
    //   ? "no-active"
    //   : moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
    //       this.innerDate
    //     ) && !this.isDateRange
    //   ? "current"
    //   : moment(new Date(this.innerYear, this.innerMonth, index)).isBetween(
    //       this.innerDate,
    //       this.innerSecondDate,
    //       null,
    //       "()"
    //     )
    //   ? "current-area"
    //   : moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
    //       this.innerSecondDate
    //     )
    //   ? "current-area-end"
    //   : moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
    //       this.innerDate
    //     )
    //   ? "current-area-begin"
    //   : this.eventDates.findIndex(item =>
    //       moment(item.date).isSame(
    //         new Date(this.innerYear, this.innerMonth, index)
    //       )
    //     ) != -1
    //   ? "event-day"
    //   : "";
    var result = "";
    if (index < 1 || index > days || !this.checkDateActivity(index)) {
      result = "no-active";
    }
    if (
      moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
        this.innerDate,
        "day"
      ) &&
      !this.isDateRange
    ) {
      result = "current";
    }
    if (this.isDateRange) {
      if (
        moment(new Date(this.innerYear, this.innerMonth, index)).isBetween(
          this.innerDate,
          this.innerSecondDate,
          null,
          "()"
        )
      )
        result = "current-area";

      if (
        moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
          this.innerSecondDate,
          "day"
        )
      )
        result = "current-area-end";

      if (
        moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
          this.innerDate,
          "day"
        )
      )
        result = "current-area-begin";
    }
    var eventDateIndex =
      this.eventDates.length > 0
        ? this.eventDates.findIndex((item) =>
            moment(item).isSame(
              new Date(this.innerYear, this.innerMonth, index)
            )
          )
        : -1;
    if (
      moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
        this.innerDate,
        "day"
      ) &&
      moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
        this.innerSecondDate,
        "day"
      )
    )
      result = "current-area-begin-single";
    if (eventDateIndex != -1) {
      // if (moment(new Date(this.innerYear, this.innerMonth, index)).isBetween(this.innerDate, this.innerSecondDate, null, "()"))
      //     result = "event-day--" + "red";
      // else {
      result = result + "event-day-" + "green";
      // }
    }
    return result;
  }

  /**
   * Проверить активность даты
   */
  checkDateActivity(day: any) {
    if (!this.minimumDate) return true;
    var x = new Date(this.innerYear, this.innerMonth, day) > this.minimumDate;
    return x;
  }
  next() {
    this.setMonth(new Date(this.innerYear, this.innerMonth + 1, 1));
  }
  backward() {
    this.setMonth(new Date(this.innerYear, this.innerMonth - 1, 1));
  }
  changeMonth() {
    this.$emit("onNavigation");
  }
  changeDay(day: any) {
    let mon = parseInt(moment(this.date).format("MM")) - 1;

    let hour = parseInt(moment(this.date).format("HH"));
    let min = parseInt(moment(this.date).format("mm"));
    let sek = parseInt(moment(this.date).format("ss"));

    if (day.type != "no-active") {
      this.clearDays();
      this.innerDay = day.number;
      day.type = "current";
      this.innerDate = new Date(
        this.innerYear,
        this.innerMonth,
        this.innerDay,
        hour,
        min,
        sek
      );
      this.$emit(
        "changeDay",
        new Date(this.innerYear, this.innerMonth, day.number, hour, min, sek)
      );
    }
  }

  clearDays() {
    for (let index = 0; index < this.innerDays.length; index++) {
      if (this.innerDays[index].type == "current") {
        this.innerDays[index].type = "";
      }
    }
  }
  clearDaysAll() {
    for (let index = 0; index < this.innerDays.length; index++) {
      this.innerDays[index].type = "";
    }
  }
  openHours() {
    this.$emit("changeCurrentView", "hours");
  }
  installWeeks() {
    var moment = require("moment");
    var startOfWeek = moment().startOf("isoWeek");
    var endOfWeek = moment().endOf("isoWeek");

    this.weeks = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      this.weeks.push(day.toDate());
      day = day.clone().add(1, "d");
    }
  }
}
</script>

<style lang="less">
@uiDaysTitleColor: #fff;
@uiDaysColor: #465675;

@uiDaysColorHover: #fff;
@uiDaysBgColorHover: #3e71bb;

@uiDaysBgColorCurrentAreaBegin: #3e71bb;
@uiDaysBgColorCurrentAreaEnd: #3e71bb;

@uiDaysBgColorCurent: #ff7f66;
@uiDaysBgColorCurentHover: #ff7f66;
@uiDaysColorCurent: #fff;
@uiDaysColorNoActive: #b8c3e0;
@uiDaysWeekDayColor: #3b6aae;
@uiDaysBgColorCurrentArea: #dce7f6;
.days {
  .title__days {
    text-transform: capitalize;
    color: @uiDaysTitleColor;
    cursor: pointer;
  }
  .items {
    height: 210px;
    padding: 0.9em 1.2em;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    font-size: 0.9em;

    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      color: @uiDaysColor;
      cursor: pointer;
    }
    .day > div,
    .day.current > div {
      align-items: center;
      justify-content: center;
      display: flex;
      border-radius: 100%;
      width: 1.5em;
      height: 1.5em;
      &:hover {
        color: @uiDaysColorHover;
        background-color: @uiDaysBgColorHover;
      }
    }
    .day.no-active {
      color: @uiDaysColorNoActive;
      cursor: default;
    }
    .day.current > div {
      color: @uiDaysColorCurent;
      background-color: @uiDaysBgColorCurent;
      &:hover {
        background-color: @uiDaysBgColorCurentHover;
      }
    }
    .day.event-day-orange div {
      color: #fff;
      background-color: orange;
    }
    .day.event-day-red div {
      color: #fff;
      background-color: red;
    }
    .day.event-day-green div {
      color: #fff;
      background-color: green;
    }
    .day.current-area-begin {
      color: #fff;
      border-radius: 100% 0 0 100%;

      position: relative;
      .backround-current {
        position: absolute;
        z-index: 1;
        right: 0;
        top: 0;
        height: 100%;
        width: 50%;
        background-color: @uiDaysBgColorCurrentArea;
      }
      div {
        position: relative;
        z-index: 2;
        color: #fff;
        background-color: @uiDaysBgColorCurrentAreaBegin;
        border-radius: 100%;
      }
    }
    .day.current-area {
      background-color: @uiDaysBgColorCurrentArea;
    }
    .day.current-area-end {
      color: #fff;
      border-radius: 0 100% 100% 0;

      position: relative;
      .backround-current {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        height: 100%;
        width: 50%;
        background-color: @uiDaysBgColorCurrentArea;
      }
      div {
        position: relative;
        z-index: 2;
        color: #fff;
        background-color: @uiDaysBgColorCurrentAreaEnd;
        border-radius: 100%;
      }
    }
    .day.current-area-begin-single {
      div {
        color: #fff;
        background-color: #3e71bb;
        border-radius: 100%;
      }
    }
    .weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      color: @uiDaysWeekDayColor;
    }
  }
  .select-hours {
    display: flex;
    font-family: TirScript;
    border-top: 1px solid rgba(0, 0, 0, 0.11);
    padding: 8px 0 10px;
    justify-content: center;
    cursor: pointer;
    &:before {
      font-size: 17px;
      color: #3e71bb;
    }
  }
}
</style>
