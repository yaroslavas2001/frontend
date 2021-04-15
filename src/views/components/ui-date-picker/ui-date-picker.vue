<template>
  <div class="ui-date-picker">
    <slot v-bind="this">
      <div class="input-group" :class="{ view2: view2 }">
        <template v-if="isDateRange && view2">
          <slot name="isDateRange">
            <template v-if="!changeDateManual">
              <div class="isDateRange" @click="targetDatetime">
                {{ inner2DateFormatted.dateFrom }} -
                {{ inner2DateFormatted.dateTo }}
              </div>
            </template>
            <template v-else>
              <div class="twoDateView">
                <input
                  @keydown.enter="onPressEnterLeft"
                  @keydown.tab="onPressEnterLeft"
                  v-model="inner2DateFormatted.dateFrom"
                  :class="[{ transformer: transformer }, 'twoDate', 'left']"
                  :readonly="!changeDateManual"
                />
                <div style="font-size: 15px">&#8212;</div>
                <input
                  @keydown.enter="onPressEnterRight"
                  @keydown.tab="onPressEnterRight"
                  v-model="inner2DateFormatted.dateTo"
                  :class="[{ transformer: transformer }, 'twoDate', 'right']"
                  :readonly="!changeDateManual"
                />
              </div>
            </template>
          </slot>
        </template>
        <template v-else>
          <input
            v-model="innerDateFormatted"
            :class="[{ transformer: transformer }, { focus: iconFocused }]"
            :readonly="!changeDateManual"
            @focus="onFocus"
            @blur="onBlur"
            @keydown.tab="onTab"
            @keydown.enter="onEnter"
          />
        </template>
        <div
          class="icon"
          :class="[{ transformer: transformer }]"
          @click="targetDatetime"
        ></div>
        <template v-if="isDateRange && !view2">
          <span class="delimiter">-</span>
          <input v-model="innerSecondDateFormatted" />
          <div class="icon"></div>
        </template>
      </div>
    </slot>
    <div
      class="date-time-wrapper"
      id="dateTimeWrapper"
      ref="dateTimeWrapper"
      v-if="innerShowDatetime"
    >
      <ui-date-time
        ref="FirstDatePicker"
        :date="this.innerDate"
        :dateSecond="isDateRange ? this.innerSecondDate : null"
        @change="changeDate"
        :minimumDate="minimumDate"
        :minimumView="minimumView"
        :maximumView="maximumView"
        :initialView="initialView"
        :isDateRange="isDateRange"
        :eventDates="eventDates || []"
        :showCurrentDate="showCurrentDate"
        :letSelectAllDays="letSelectAllDays"
      >
      </ui-date-time>
      <!-- <template v-if="isDateRange">
        <ui-date-time
          :date="this.innerSecondDate"
          :dateSecond="this.innerDate"
          :minimumDate="this.minimumDate"
          @change="changeSecondDate"
          :minimumView="minimumView"
          :maximumView="maximumView"
          linkedDatePickerName="FirstDatePicker"
          :isDateRange="isDateRange"
          :eventDates="eventDates"
        ></ui-date-time>
      </template>-->
    </div>
  </div>
</template>

<script lang="ts">
import component from "*.vue";
import moment from "moment";
import { Options, Vue } from "vue-class-component";
// import { defaultCipherList } from 'constants';
// import { Moment, isMoment } from 'moment';
import UiDateTime from "@views/components/ui-date-picker/ui-date-time.vue";

@Options<UiDatePicker>({
  props: {
    modelValue: { type: Date || String },
    value: { type: Date },
    dateSecond: Date,
    asUTC: { type: Boolean, default: true },
    dateFormat: { type: String, default: "DD.MM.YYYY" },
    minimumDate: Date,
    maximumDate: Date,
    initialView: String,
    minimumView: String,
    maximumView: String,
    isDateRange: Boolean,
    view2: Boolean,
    showCurrentDate: Boolean,
    transformer: Boolean,
    eventDates: Array,
    autoCloseWhenChangeDay: Boolean,
    changeDateManual: Boolean,
    letSelectAllDays: Boolean,
  },
  watch: {
    innerShowDatetime() {
      this.iconFocused = this.innerShowDatetime;
    },

    value(value) {
      this.innerDate = this.value;
      this.innerDateFormatted = this.formatDate(this.value);
    },
    // dateFormat(value) {
    //   debugger;
    //   this.innerDate = this.value;
    //   this.innerDateFormatted = this.formatDate(this.value);
    // },
    innerDateFormatted(value) {
      this.oninnerDateFormatted();
    },
    innerSecondDateFormatted(value) {
      this.oninnerDateFormatted();
    },
  },
  emits: ["update:modelValue"],
  components: { UiDateTime },
})
export default class UiDatePicker extends Vue {
  readonly modelValue: Date = new Date();
  readonly value: Date = new Date();
  readonly dateSecond: Date = new Date();
  readonly asUTC: boolean = true;
  readonly dateFormat: string = "DD.MM.YYYY";
  readonly minimumDate: Date = null;
  readonly maximumDate: Date = null;
  readonly initialView: String = "";
  readonly minimumView: string = "months";
  readonly maximumView: string = "years";
  readonly isDateRange: boolean = false;
  readonly view2: boolean = false;
  readonly showCurrentDate: boolean = true;
  readonly transformer: boolean = false;
  readonly eventDates: Array<any> = null;
  readonly autoCloseWhenChangeDay: boolean = true;
  readonly changeDateManual: boolean = false;
  readonly letSelectAllDays: boolean = false;
  // @Prop({ type: Date, default: () => new Date() }) value: Date;
  // @Prop({ type: Date, default: () => new Date() }) dateSecond: Date;
  // @Prop({ type: Boolean, default: true }) asUTC: boolean;
  // @Prop({ default: "DD.MM.YYYY", type: String }) dateFormat: string;
  // // ограничение даты снизу
  // @Prop({ default: null, type: Date }) minimumDate: Date;
  // @Prop({ default: null, type: Date }) maximumDate: Date;

  // @Prop({ type: String }) initialView: String;
  // @Prop({ default: "months", type: String }) minimumView: string;
  // @Prop({ default: "years", type: String }) maximumView: string;

  // //включен диапазон дат
  // @Prop({ default: false, type: Boolean }) isDateRange: boolean;
  // @Prop({ default: false, type: Boolean }) view2: boolean;

  // // показывать текущую дату
  // @Prop({ default: true, type: Boolean }) showCurrentDate: boolean;

  // //показывать рамку только активации элемента
  // @Prop({ default: false, type: Boolean }) transformer: boolean;

  // @Prop({ default: null }) eventDates: Array<any>;
  // @Prop({ default: true, type: Boolean }) autoCloseWhenChangeDay: boolean; //закрывать после выбора дня месяца
  // @Prop({ default: false, type: Boolean }) changeDateManual: boolean; //разрешить редактирование даты вручную
  // @Prop({ default: false, type: Boolean }) letSelectAllDays: boolean;

  innerDate = this.modelValue;
  innerDateFormatted = this.formatDate(this.modelValue);
  innerSecondDate = this.dateSecond;
  innerSecondDateFormatted = this.formatDate(this.dateSecond);
  inner2DateFormatted: { dateFrom: Date; dateTo: Date } = {
    dateFrom: this.innerDateFormatted,
    dateTo: this.innerSecondDateFormatted,
  };

  innerShowDatetime = false;
  isFirstChoice = true;
  iconFocused = false;
  firstClick = true;

  // @Watch("innerShowDatetime")
  // onInnerShowDatetime() {
  //   this.iconFocused = this.innerShowDatetime;
  // }
  // set dateFormat(value) {
  //   this.innerDate = this.value;
  //   this.innerDateFormatted = this.formatDate(this.value);
  // }
  // get dateFormat() {
  //   return this._dateFormat;
  // }
  created() {
    // asUTC
    this.innerDate = this.modelValue;

    this.innerDateFormatted = this.formatDate(this.modelValue);

    document.body.addEventListener("click", this.clickOutside.bind(this));
  }
  destroyed() {
    document.body.removeEventListener("click", this.clickOutside.bind(this));
  }
  mounted() {
    // console.log("dateFormat", this.dateFormat, this.innerDateFormatted);
  }
  // @Watch("value")
  // onChangeDate() {
  //   this.innerDate = this.value;
  //   this.innerDateFormatted = this.formatDate(this.value);
  // }

  // @Watch("innerDate")
  // onInnerDate(){
  //    this.$emit("input", this.getFormatDate(this.innerDate));
  // }

  // @Watch("innerDateFormatted")
  // @Watch("innerSecondDateFormatted")
  oninnerDateFormatted() {
    if (this.isDateRange) {
      if (this.view2) {
        this.inner2DateFormatted = {
          dateFrom: this.formatDate(this.innerDate),
          dateTo: this.formatDate(this.innerSecondDate),
        };
      }
      this.$emit(
        "inputrange",
        this.getFormatDate(this.innerDate),
        this.getFormatDate(this.innerSecondDate)
      );
    } else {
      this.$emit("input", this.getFormatDate(this.innerDate));
      this.$emit("update:modelValue", this.getFormatDate(this.innerDate));
      if (this.changeDateManual) {
        return;
      }

      var x = this.formatDateRev(this.innerDateFormatted);
      if (x != "Invalid Date") {
        this.innerDate = x;
      } else this.innerDateFormatted = this.formatDate(this.innerDate);

      this.$emit("input", this.getFormatDate(this.innerDate));
      this.$emit("update:modelValue", this.getFormatDate(this.innerDate));
    }
  }

  getFormatDate(date: Date): Date {
    if (!this.asUTC) {
      return date;
    }
    const temp = new Date(date);

    var now_utc = Date.UTC(
      temp.getFullYear(),
      temp.getMonth(),
      temp.getDate(),
      temp.getHours(),
      temp.getMinutes(),
      temp.getSeconds()
    );
    return new Date(now_utc);
  }

  //--------------------------------------------
  changeDate(date: Date, type: string) {
    if (this.isDateRange) {
      if (this.isFirstChoice) {
        this.changeFirstDate(date);
      } else {
        if (this.innerDate > date) {
          let swap = this.innerDate;
          this.innerDate = date;
          this.innerDateFormatted = this.formatDate(this.innerDate);
          date = swap;
          this.innerSecondDate = date;
          this.innerSecondDateFormatted = this.formatDate(this.innerSecondDate);
          this.changeFirstDate(this.innerDate);
          this.isFirstChoice = !this.isFirstChoice;
          if (this.autoCloseWhenChangeDay && type == "days") {
            this.innerShowDatetime = false;
          }
          return;
        }
        this.changeSecondDate(date);
      }
      this.isFirstChoice = !this.isFirstChoice;
    } else {
      this.changeFirstDate(date);
    }
    if (this.autoCloseWhenChangeDay && this.isFirstChoice && type == "days") {
      this.innerShowDatetime = false;
    }
  }

  changeFirstDate(date: Date) {
    this.innerDate = date;
    this.innerDateFormatted = this.formatDate(this.innerDate);
    this.$emit(
      "inputRage",
      this.getFormatDate(this.innerDate),
      this.getFormatDate(this.innerSecondDate)
    );
  }

  changeSecondDate(date: Date) {
    this.innerSecondDate = date;
    this.innerSecondDateFormatted = this.formatDate(this.innerSecondDate);
    this.$emit(
      "inputRage",
      this.getFormatDate(this.innerDate),
      this.getFormatDate(this.innerSecondDate)
    );
  }

  targetDatetime() {
    this.innerShowDatetime = !this.innerShowDatetime;
    this.iconFocused = this.innerShowDatetime;
  }
  formatDate(date: Date) {
    var moment = require("moment");
    var now = moment(date);
    moment.lang("ru");
    return now.format(this.dateFormat);
  }
  formatDateRev(value: String) {
    var moment = require("moment");
    var now = moment(value, this.dateFormat);
    moment.lang("ru");
    return now.toDate();
  }

  isClickedToDatePicker(event: MouseEvent): boolean {
    // const box = this.$refs.dateTimeWrapper as HTMLElement;
    const boxId = document.getElementById("dateTimeWrapper");
    if (!boxId) {
      return false;
    }
    const rect = boxId.getBoundingClientRect();
    if (!rect) {
      return false;
    }
    const dx = event.clientX - rect.left;
    const dy = event.clientY - rect.top;
    return dx > 0 && dx < rect.width && dy > 0 && dy < rect.height;
  }

  clickOutside(event: any) {
    if (this.isClickedToDatePicker(event)) {
      if (this.isDateRange) {
        // this.isFirstChoice = true;
        // if (this.isFirstChoice && this.innerDate > this.innerSecondDate) {
        //   var k = this.innerDate;
        //   this.changeFirstDate(this.innerSecondDate);
        //   this.changeSecondDate(k);
        // }
      }
    } else {
      if (!(this.$el == event.target || this.$el.contains(event.target))) {
        if (this.innerShowDatetime) {
          this.innerShowDatetime = false;
        }
      }
    }
  }
  onPressEnterLeft() {
    if (moment(this.inner2DateFormatted.dateFrom, "DD.MM.YYYY").isValid) {
      this.innerDate = moment(
        this.inner2DateFormatted.dateFrom,
        this.dateFormat
      ).toDate();
      this.oninnerDateFormatted();
    } else {
      this.inner2DateFormatted.dateFrom = this.formatDate(this.innerDate);
    }
  }
  onPressEnterRight() {
    if (moment(this.inner2DateFormatted.dateTo, "DD.MM.YYYY").isValid) {
      this.innerSecondDate = moment(
        this.inner2DateFormatted.dateTo,
        this.dateFormat
      ).toDate();
      this.oninnerDateFormatted();
    } else {
      this.inner2DateFormatted.dateTo = this.formatDate(this.innerSecondDate);
    }
  }
  onFocus(el: any) {
    // this.iconFocused = true;
    // if (this.changeDateManual){

    //       this.innerShowDatetime = false
    // }
    // else{
    //   this.targetDatetime()

    // }
    this.innerShowDatetime = true;
  }
  onEnter(el: any) {
    if (this.changeDateManual) {
      if (moment(this.innerDateFormatted, this.dateFormat).isValid()) {
        var now = moment(this.innerDateFormatted, this.dateFormat);
        this.innerDate = now.toDate();
      }
    }
    el.target.blur();
    this.innerShowDatetime = false;
    this.iconFocused = false;
  }
  onTab(el: any) {
    if (this.changeDateManual) {
      if (moment(this.innerDateFormatted, this.dateFormat).isValid()) {
        var now = moment(this.innerDateFormatted, this.dateFormat);
        this.innerDate = now.toDate();
        this.$emit("input", this.getFormatDate(this.innerDate));
        this.$emit("update:modelValue", this.getFormatDate(this.innerDate));
      } else {
        this.innerDateFormatted = this.formatDate(this.innerDate);
      }
    }
    el.target.blur();
    this.innerShowDatetime = false;
    this.iconFocused = false;
  }

  onBlur(el: any) {
    if (this.changeDateManual) {
      if (moment(this.innerDateFormatted, this.dateFormat).isValid()) {
        var now = moment(this.innerDateFormatted, this.dateFormat);
        this.innerDate = now.toDate();
        this.$emit("input", this.getFormatDate(this.innerDate));
        this.$emit("update:modelValue", this.getFormatDate(this.innerDate));
      } else {
        this.innerDateFormatted = this.formatDate(this.innerDate);
      }
    }
  }
}
</script>

<style lang="less">
@uiDatePickerBorderRadius: 0;

@uiDatePickerColor: #99a4c0;
@uiDatePickerBorderColor: #394e72;
@uiDatePickerBgColor: #293b5a;
@uiDatePickerFocusBgColor: #293b5a;
@uiDatePickerBorderColorFocus: #293b5a;

// @uiDatePickerBgColorFocus:#1b283f;

.ui-date-picker {
  // width: 150px;
  border-radius: @uiDatePickerBorderRadius;
  background-color: @uiDatePickerBgColor;
  .border-nofocus {
    border: 1px solid @uiDatePickerBorderColor;
  }
  .border-focus {
    // border-right: none;
    border: 1px solid @uiDatePickerBorderColorFocus;
    // border-top: 1px solid  @uiDatePickerBorderColorFocus;
    // border-bottom: 1px solid  @uiDatePickerBorderColorFocus;
  }
  .twoDateView {
    display: flex;
    // border: 1px solid red;
    align-items: center;
    input:focus {
      border: none;
    }
    .left {
      padding: 7px 5px 7px 10px;
      text-align: right;
    }
    .right {
      padding: 7px 10px 7px 5px;
    }
  }
  .isDateRange {
    padding: 0.375em 0.75em;
  }
  .input-group {
    // display: flex;
    position: relative;
    // min-height: 35px;
    input {
      padding: 0.375em 0.75em;
      background: @uiDatePickerBgColor;
      font-size: 1rem;
      //font-family: ProximaNova, sans-serif;
      color: @uiDatePickerColor;
      border: 1px solid @uiDatePickerBorderColor;

      // border-right: none;
      display: flex;
      width: 100%;

      &:focus {
        border: 1px solid @uiDatePickerBorderColorFocus;
        // border-top: 1px solid  @uiDatePickerBorderColorFocus;
        // border-bottom: 1px solid  @uiDatePickerBorderColorFocus;
        outline: none !important;
        //  border: 1px solid #394e72;
      }
      &.focus {
        border: 1px solid @uiDatePickerBorderColorFocus;
        // border-top: 1px solid  @uiDatePickerBorderColorFocus;
        // border-bottom: 1px solid  @uiDatePickerBorderColorFocus;
      }
    }
    .icon {
      // &.focus{
      //   border-right: 1px solid @uiDatePickerBorderColorFocus;
      //   border-top: 1px solid  @uiDatePickerBorderColorFocus;
      //   border-bottom: 1px solid  @uiDatePickerBorderColorFocus;
      // }
      // display: flex;
      // background-color: #fff;
      // border-right: 1px solid  @uiDatePickerBorderColor;
      // border-bottom: 1px solid  @uiDatePickerBorderColor;
      // border-top: 1px solid  @uiDatePickerBorderColor;
      // border: 1px solid @uiDatePickerBorderColor;
      position: absolute;
      right: 15px;

      top: calc(50% - 1em / 2);
      border-left: none;
      // padding: 0 15px 0 10px;
      cursor: pointer;
      font-family: TirScript;
      color: #99a4c0;
      align-items: center;
    }
    &.view2 {
      align-items: center;
      border-radius: @uiDatePickerBorderRadius;
      .icon {
        margin: 0 10px;
        position: unset;
      }
    }
    .icon::before {
      content: "\e90c";
    }
    .delimiter {
      color: rgba(0, 0, 0, 0.2);
      padding: 0 15px;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
  .date-time-wrapper {
    // position: relative;
    margin-top: 10px;
    z-index: 1000;
    position: absolute;
    // &:before {
    //   position: absolute;
    //   content: "";
    //   border-left: 9px solid transparent;
    //   border-right: 9px solid transparent;
    //   border-bottom: 9px solid #818387;
    //   border-bottom-color: rgba(0, 0, 0, 0.2);
    //   top: -8px;
    //   left: 10px;
    // }
    // &:after {
    //   position: absolute;
    //   content: "";
    //   border-left: 8px solid transparent;
    //   border-right: 8px solid transparent;
    //   border-bottom: 8px solid #fff;
    //   top: -7px;
    //   left: 11px;
    // }
  }
  & + & {
    margin-left: 20px;
  }
}

.ui-date-picker {
  .input-group {
    input {
      &.transformer {
        border: none;
        background-color: #1b283f;
        cursor: default;
      }

      &:focus {
        background-color: @uiDatePickerFocusBgColor;
        outline: none !important;
        // border: 1px solid #394e72;
        cursor: pointer;
        // color:#aab5d1;
      }
    }
    .icon {
      &.transformer {
        color: transparent;
        border: none;
        cursor: default;
      }
    }
  }
  .view2 {
    border: 1px solid @uiDatePickerBorderColor;
    border-radius: @uiDatePickerBorderRadius;
    display: flex;
    input {
      width: 110px;
      margin: 1px;
    }
    .icon {
      border: none;
    }
    input {
      border: none;
    }
    input:focus {
      border: none;
    }
  }
}
</style>
