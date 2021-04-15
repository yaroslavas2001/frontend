import _Vue from "vue";
import * as enRes from "./resources/localization.ru.json";
import * as ruRes from "./resources/localization.ru.json";
import * as frRes from "./resources/localization.fr.json";
// todo dynamic import resources

class LocaleProvider {
  private static _instance: LocaleProvider;
  private resouces = {
    en: enRes,
    ru: ruRes,
    fr: frRes,
  };
  private lang = [
    { id: 0, langCode: "ru", name: "Русский" },
    { id: 1, langCode: "en", name: "English" },
    { id: 2, langCode: "fr", name: "Le français" },
    { id: 3, langCode: "de", name: "Deutsch" },
    { id: 4, langCode: "ro", name: "Românesc" },
  ];
  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
  get currentLang() {
    const loc = localStorage.getItem("locale") || "ru";
    if (loc == "undefined") {
      return "en";
    }
    return "ru";
  }
  set currentLang(value: string) {
    localStorage.setItem("locale", value);
  }
  get localeResource(): Object {
    return (this.resouces as any)[this.currentLang];
  }
  getTranslate(key: string) {
    const res = (this.localeResource as any).default;
    if (!res) {
      //console.error(`Ресурсы ключа: ${key} для языка ${this.currentLang} не найдены!`);
      return key;
    }
    if (!res.hasOwnProperty(key)) {
      //console.error(`Ресурсы ключа: ${key} для языка ${this.currentLang} не найдены!`);
      return key;
    }
    return (res as any)[key];
  }
  getLangCodeById(id: number): string {
    return this.lang.find((item) => item.id == id).langCode;
  }
  getLangNameById(id: number): string {
    return this.lang.find((item) => item.id == id).name;
  }
  getLangObjectById(id: number): { id: number; langCode: string; name: string } {
    return this.lang.find((item) => item.id == id);
  }
}

const myClassInstance = LocaleProvider.Instance;
export default myClassInstance;
