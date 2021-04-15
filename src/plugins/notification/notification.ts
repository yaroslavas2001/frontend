// import { App } from "vue";
import { createVNode, App, render, h } from "vue";
// import { Options, Vue } from "vue-class-component";
import UiNotification from "./ui-notification.vue";
import NotificationOptions, { EnumNotificationType } from "./model/notificationOptions";
import { Events } from "../../../dataSource/api/plugins/events";
// import { createApp } from "@vue/composition-api";

export default class Notification {
  private mounted = false;
  private $root: any;
  private eventBus: Events<NotificationOptions> = new Events<NotificationOptions>();
  constructor() {
    this.eventBus = new Events<NotificationOptions>();
  }

  success(message: string, title = ""): void {
    this.open(new NotificationOptions(title, message, EnumNotificationType.Success));
  }
  error(message: string, title = "Ошибка"): void {
    this.open(new NotificationOptions(title, message, EnumNotificationType.Error));
  }
  private open(data: NotificationOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.mounted) {
        this.mount(UiNotification, { props: { eventBus: this.eventBus } });
      }
      this.mounted = true;

      this.eventBus.trigger(data);
    });
  }
  mount = (component, { props = {}, children = {}, element = null, app = null } = {}) => {
    console.log("MOUNT");

    let el = element ? element : this.createElement();
    if (element == null) {
      document.querySelector("body").appendChild(el);
    }

    let vNode = h(component, props, children);
    if (app && app._context) {
      vNode.appContext = app._context;
    }

    render(vNode, el);

    const destroy = () => {
      if (el) {
        render(null, el);
      }
      el = null;
      vNode = null;
    };

    return { vNode, destroy, el };
  };
  private createElement = () => typeof document !== "undefined" && document.createElement("div");
}

// }
