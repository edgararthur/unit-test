import stringsEn from "../assets/translation/en.json";
import stringsZhCn from "../assets/translation/zh-CN.json";
import stringsZhTw from "../assets/translation/zh-TW.json";

import { Languages, appendStrings } from "../../src-deps/lib-cpn-rn-app-management/src";

/**
 * Call at App init
 */
export function initTranslation() {
  appendStrings(Languages.en, stringsEn);
  appendStrings(Languages.zhCN, stringsZhCn);
  appendStrings(Languages.zhTW, stringsZhTw);
}
