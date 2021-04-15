<template>
  <div ref="wrapper" class="notification-wrapper">
    <transition-group name="list">
      <div
        v-for="item in notifications"
        :key="item"
        class="notification"
        :class="getClassByType(item.type)"
        :style="{ top: item.top + 'px' }"
      >
        <!-- <div class="icon-container">
          <i :class="getIconClassByType(item.type)"></i>
        </div> -->
        <div class="content-container ml-2">
          <div class="title">{{ item.title }}</div>
          <div class="content pb-4">{{ item.message }}</div>
          <div class="close icon-ic-12" @click="removeArray(item)"></div>
        </div>
      </div>
    </transition-group>
    <!-- <transition-group name="list">
      <div
        class="notification notification-error"
        v-for=" (item, index) in notificationsError"
        :key="index + '-error'"
        :style="{'top': item.top + 'px'}"
      >
        <div class="icon-container">
          <i class="icon-close"></i>
        </div>
        <div class="content-container">
          <div class="title">{{item.title}}</div>
          <div class="content">{{item.message}}</div>
          <div class="close icon-close" @click="removeArray(item)"></div>
        </div>
      </div>
    </transition-group>-->
  </div>
</template>
<script lang="ts">
import { Events } from "../../../dataSource/api/plugins/events";
import { Options, Vue } from "vue-class-component";
import { ref } from "vue";
import NotificationOptions, {
  EnumNotificationType,
} from "./model/notificationOptions";
@Options<UiNotificaton>({
  props: {
    eventBus: Events,
  },
})
export default class UiNotificaton extends Vue {
  // setup() {
  //   let test = ref(0);
  //   return { test };
  // }
  notificationsSuccess = new Array<NotificationOptions>();
  notificationsError = new Array<NotificationOptions>();
  notifications = new Array<NotificationOptions>();
  eventBus = new Events<NotificationOptions>();
  message = "";
  type = "";
  // @ViewChild('wrapper', { static: true }) wrapperEl;
  heightEl = 75;
  offset = 16;
  created() {
    console.log("created ui-notification");
    this.eventBus.on(this.show);
  }
  getClassByType(type: EnumNotificationType) {
    switch (type) {
      case EnumNotificationType.Error:
        return "notification-error";
      case EnumNotificationType.Success:
        return "notification-success";
    }
  }
  getIconClassByType(type: EnumNotificationType) {
    switch (type) {
      case EnumNotificationType.Error:
        return "icon-close";
      case EnumNotificationType.Success:
        return "icon-check";
    }
  }
  getAddedElementHeight(type: EnumNotificationType): number {
    // const cssClass =
    //   type === EnumNotificationType.Error
    //     ? "notification-error"
    //     : "notification-success";
    const el = this.$refs.wrapper as HTMLElement;
    // const childs = el.querySelectorAll("." + cssClass);
    const childs = el.querySelectorAll(".notification");
    if (childs && childs.length > 0) {
      return childs[childs.length - 1].clientHeight + this.offset;
    }
    return 0;
  }
  show(ev: NotificationOptions): void {
    // switch (ev.type) {
    //   case EnumNotificationType.Error:
    //     this.notificationsError.push(ev);
    //     break;
    //   case EnumNotificationType.Success:
    //     this.notificationsSuccess.push(ev);
    //     break;
    // }
    this.notifications.push(ev);
    setTimeout(() => {
      this.changePositionArray(ev, this.getAddedElementHeight(ev.type));
    });

    setTimeout(this.removeArray.bind(this, ev), ev.timeOut);
  }
  changePositionArray(ev: NotificationOptions, height: number): void {
    this.notifications.filter((x) => x !== ev).map((x) => (x.top += height));
    // this.notificationsError.filter(x => x !== ev).map(x => (x.top += height));
    // this.notificationsSuccess.filter(x => x !== ev).map(x => (x.top += height));
  }
  removeArray(notification: NotificationOptions): void {
    // switch (notification.type) {
    //   case EnumNotificationType.Error:
    //     this.notificationsError = this.notificationsError.filter(
    //       x => x !== notification
    //     );
    //     break;
    //   case EnumNotificationType.Success:
    //     this.notificationsSuccess = this.notificationsSuccess.filter(
    //       x => x !== notification
    //     );
    //     break;
    // }

    this.notifications = this.notifications.filter((x) => {
      x !== notification;
    });
  }
}
</script>

<style lang="less" scoped>
.notification-wrapper {
  .notification {
    transition: all 0.5s;
    position: absolute;
    top: 0;
    width: 350px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    color: #60718e;
    right: 80px;
    opacity: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 50000;
    &.list-enter-active,
    &.list-leave-active {
      transition: all 0.5s;
    }
    &.list-enter,
    &.list-leave-to {
      opacity: 0;
    }
    &.list-enter {
      transform: translateY(-100%);
    }
    &.list-leave-to {
      transform: translateY(25%);
    }
    .icon-container {
      padding: 20px 15px 20px 10px;
    }
    .title {
      padding: 5px 0;
      font-size: 13px;
      color: #3c547a;
      font-family: "ProximaNova";
      font-weight: bold;
    }
    .content-container {
      overflow: hidden;
      margin-right: 15px;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      line-clamp: 5;
      box-orient: vertical;
      &.content {
        color: #60718e;
        font-size: 13px;
        padding: 20px;
        font-family: "ProximaNova";
      }
    }
    &.notification-error {
      border-left: 5px solid #e6737b;
    }
    &.notification-success {
      border-left: 5px solid #9ad6b6;
    }
    i {
      display: flex;
      width: 19px;
      height: 19px;
      align-items: center;
      justify-content: center;
    }
    .icon-container {
      .icon-close {
        background: #e6737b;
        border-radius: 50%;
        color: white;
        &::before {
          font-size: 8px;
        }
      }
    }
    .icon-check {
      background: #9ad6b6;
      border-radius: 50%;
      color: white;
      &::before {
        font-size: 8px;
      }
    }

    i.success {
      // background-image: url('/Images/icon/success-notification.png');
    }
    .content-container .close {
      position: absolute;
      top: 14px;
      right: 15px;
      cursor: pointer;
      // opacity: 1;
      font-size: 10px;
    }
  }
}
</style>
