<template>
  <div class="ui-shedule">
    <div class="ui-shedule__week">
      <div
        v-for="(item, key) in items"
        :key="key"
        class="day-of-week"
        :class="{ active: item.Active }"
        @click="onActivate(item.Id)"
      >
        <div class="day-of-week__name">{{ item.Name }}</div>
        <div class="day-of-week__time">
          <template v-if="item.TimeWork.From">
            {{
              `${item.TimeWork.From.getHours().toString()}:${item.TimeWork.From.getMinutes()
                .toString()
                .replace(/^(\d)$/, "0$1")}`
            }}</template
          >
          -
          <template v-if="item.TimeWork.To">
            {{
              `${item.TimeWork.To.getHours().toString()}:${item.TimeWork.To.getMinutes()
                .toString()
                .replace(/^(\d)$/, "0$1")}`
            }}
          </template>
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-auto">
        <ui-date-picker
          dateFormat="HH:mm"
          minimumView="minutes"
          maximumView="hours"
          initialView="hours"
          :value="from"
          :asUTC="false"
          @inputRage="changeTimeStart"
        >
        </ui-date-picker>
      </div>
      -
      <div class="col-auto">
        <ui-date-picker
          :dateFormat="'HH:mm'"
          minimumView="minutes"
          maximumView="hours"
          initialView="hours"
          :value="to"
          :asUTC="false"
          @inputRage="changeTimeStop"
        >
        </ui-date-picker>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UiDatePicker from "@views/components/ui-date-picker/ui-date-picker.vue";
import sheduleModel from "@views/components/ui/ui-shedule/shedule-model";
import ScheduleInfo from "dataSource/api/Pharmacies/Admin/Interfaces/Models/StoreService/ScheduleInfo";
export enum WeekDaysEnum {
  /// <summary>
  /// Понедельник
  /// </summary>
  Monday = 1,
  /// <summary>
  /// Вторник
  /// </summary>
  Tuesday = 2,
  /// <summary>
  /// Среда
  /// </summary>
  Wednesday = 4,
  /// <summary>
  /// Четверг
  /// </summary>
  Thursday = 8,
  /// <summary>
  /// Пятница
  /// </summary>
  Friday = 16,
  /// <summary>
  /// Суббота
  /// </summary>
  Saturday = 32,
  /// <summary>
  /// Воскресенье
  /// </summary>
  Sunday = 64,
}
@Options<UiShedule>({
  props: {
    shedules: { type: Object, default: [] },
  },
  components: {
    UiDatePicker,
  },
  watch: {
    shedules(value) {},
  },
})
export default class UiShedule extends Vue {
  readonly shedules: ScheduleInfo[] = [];
  items: sheduleModel[] = [];
  currentDayOfWeek = 0;
  from: Date = null;
  to: Date = null;
  created() {
    let to1 = new Date();
    to1.setHours(18, 0);
    this.to = to1;

    let from1 = new Date();
    from1.setHours(8, 0);
    this.from = from1;

    this.getItems();
    //если есть расписание то заполняем компонент
    // if (this.shedule) this.items = this.shedule;
  }
  refresh() {
    this.items.forEach((item) => {
      item;
    });
  }
  getItems() {
    this.items = [
      {
        Id: 1,
        Name: "пн",
        TimeWork: { From: null, To: null },
        Active: false,
      },
      {
        Id: 2,
        Name: "вт",
        TimeWork: { From: null, To: null },
        Active: false,
      },
      {
        Id: 4,
        Name: "ср",
        TimeWork: { From: null, To: null },
        Active: false,
      },
      {
        Id: 8,
        Name: "чт",
        TimeWork: { From: null, To: null },
        Active: false,
      },
      {
        Id: 16,
        Name: "пт",
        TimeWork: { From: null, To: null },
        Active: false,
      },
      {
        Id: 32,
        Name: "сб",
        TimeWork: { From: null, To: null },
        Active: false,
      },
      {
        Id: 128,
        Name: "вс",
        TimeWork: { From: null, To: null },
        Active: false,
      },
    ];
    this.items.forEach((el) => {
      const x = this.shedules.find((element) => element.WeekDays == el.Id);

      if (x) {
        el.Active = true;
        el.TimeWork.From = new Date(x.From);
        el.TimeWork.To = new Date(x.To);
      }
    });
  }
  onActivate(id: number) {
    const el = this.items.find((item) => item.Id == id);
    el.Active = !el.Active;
    if (!el.Active) {
      // el.TimeWork.From = null;
      // el.TimeWork.To = null;
    } else {
      this.currentDayOfWeek = id;
      if (!el.TimeWork.From && !el.TimeWork.To) {
        this.from = new Date();
        this.from.setHours(8, 0);
        this.to = new Date();
        this.to.setHours(18, 0);
        if (this.currentDayOfWeek == 0) return;
        const item = this.items.find((el) => {
          return el.Id == this.currentDayOfWeek;
        });
        item.TimeWork.From = new Date(this.from);
        item.TimeWork.To = new Date(this.to);
      }
    }
    this.$emit(
      "change-schedule",
      this.items.filter((el) => el.Active)
    );
  }
  changeTimeStart(value: Date, value2: Date) {
    if (this.currentDayOfWeek == 0) return;
    const item = this.items.find((el) => {
      return el.Id == this.currentDayOfWeek;
    });

    item.TimeWork.From = new Date(value);
    this.$emit(
      "change-schedule",
      this.items.filter((el) => el.Active)
    );
  }
  changeTimeStop(value: Date, value2: Date) {
    if (this.currentDayOfWeek == 0) return;
    const item = this.items.find((el) => {
      return el.Id == this.currentDayOfWeek;
    });

    item.TimeWork.To = new Date(value);
    this.$emit(
      "change-schedule",
      this.items.filter((el) => el.Active)
    );
  }
}
</script>

<style lang="less">
.ui-shedule {
  .ui-shedule__week {
    display: flex;
    font-size: 14px;
    margin: 10px 0;
    justify-content: space-between;
    .day-of-week {
      min-width: 86px;
      min-height: 50px;
      background: #ffffff;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #343545;
      padding: 5px;
      transition: all 1s;

      .day-of-week__name {
        padding: 5px;
      }
      .day-of-week__time {
        min-height: 1em;
      }
      &.active {
        background: #23a4a2;
        color: white;
      }
      &:hover {
        background: #23a4a2;
        color: white;
        cursor: pointer;
      }
    }
  }
  .ui-date-picker {
    width: 100px;
  }
}
</style>
