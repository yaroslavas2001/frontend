<template>
  <div class="hours">
    <div class="navigation">
      <div class="backward" @click="backward"></div>
      <div class="title_date-picker" @click="changeDays">
        {{ m }}
      </div>
      <div class="next" @click="next"></div>
    </div>
    <div
      class="back-to-days"
      v-if="!allowedToShowView('minutes')"
      @click="openDays"
    ></div>
    <div class="items">
      <template v-for="(hour, index) in innerHours" :key="index">
        <div class="hour" :class="hour.type" @click.stop="changeHour(hour)">
          <div>{{ hour.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import moment from "moment";
@Options<UiHours>({
  props: {
    date: Date,
    allowedToShowView: Function,
  },
})
export default class UiHours extends Vue {
  // @Prop({ default: () => new Date(), type: Date })
  // date: Date;
  // @Prop({ type: Function })
  // allowedToShowView: Function;
  readonly date: Date = new Date();
  readonly allowedToShowView: Function;

  innerHours: any[] = [];
  innerMonth = this.date.getMonth();
  innerYear = this.date.getFullYear();
  innerDay = this.date.getDate();
  innerHour = this.date.getHours();
  get m() {
    let x = moment(
      new Date(this.innerYear, this.innerMonth, this.innerDay)
    ).format("DD.MM.YYYY");
    // console.log("x", x);
    return x;
  }
  created() {
    this.innerMonth = this.date.getMonth();
    this.innerYear = this.date.getFullYear();
    this.innerDay = this.date.getDate();
    this.innerHour = this.date.getHours();
    // console.log("ssssssssssssssssssssssssssssssssssssss");
  }

  mounted() {
    // console.log(`mouned`, this.innerHours);

    this.setDay(this.date);
    for (let index = 0; index < 24; index++) {
      this.innerHours.push({
        name:
          index.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) + ":00",
        number: index,
        type: index == this.innerHour ? "current" : "",
      });
    }
  }

  // getMonths() {
  //   return this.months.map(function(item, index) {
  //     return { number: index, name: item };
  //   });
  // }

  setDay(date: Date) {
    this.innerDay = date.getDate();
  }
  next() {
    this.setDay(new Date(this.innerYear, this.innerMonth, this.innerDay + 1));
  }
  backward() {
    this.setDay(new Date(this.innerYear, this.innerMonth, this.innerDay - 1));
  }
  changeHour(hour: any) {
    if (hour.type == "") {
      this.clearHours();
      hour.type = "current";
    }
    this.innerHour = hour.number;
    this.$emit(
      "changeHour",
      new Date(this.innerYear, this.innerMonth, this.innerDay, hour.number, 0)
    );
  }
  changeDays() {
    this.$emit("onNavigation");
  }
  clearHours() {
    for (let index = 0; index < this.innerHours.length; index++) {
      if (this.innerHours[index].type == "current") {
        this.innerHours[index].type = "";
      }
    }
  }
  openDays() {
    this.$emit("changeCurrentView", "days");
  }
}
</script>

<style lang="less">
@uiHoursBgColorCurent: #ff7f66;
@uiHoursBgColorCurentHover: #ff7f66;
.hours {
  .items {
    // width: 210px;
    height: 210px;
    padding: 0.9em 1.2em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 1fr);
    // font-size: 14px;
    font-size: 0.9em;
    .hour {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover > div {
        color: #fff;
        background-color: #3e71bb;
        border-radius: 15px;
        padding: 5px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      & > div {
        padding: 5px 0px;
      }
    }
    .hour.current > div {
      color: #fff;
      background-color: @uiHoursBgColorCurent;
      border-radius: 15px;

      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      &:hover {
        background-color: @uiHoursBgColorCurentHover;
      }
    }
  }
  .back-to-days {
    display: flex;
    font-family: TirScript;
    border-bottom: 1px solid rgba(0, 0, 0, 0.11);
    padding: 20px 0 12px;
    justify-content: center;
    cursor: pointer;
    &:before {
      font-size: 17px;
      content: "\e90c";
      color: #3e71bb;
    }
  }
}
</style>
