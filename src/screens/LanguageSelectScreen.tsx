import {useNavigation} from "@react-navigation/native";
import {
  cpnAppCentralStore,
  Languages,
} from "../../src-deps/lib-cpn-rn-app-management/src";
import * as Mobx from "mobx";
import * as MobxReact from "mobx-react-lite";
import * as React from "react";
import {SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "react-native-paper";

import SettingMenuItem from "../../src-deps/lib-cpn-rn-app-management/src/components/SettingMenuItem";

const SCRIPTFILE_TAG = "LanguageSelectScreen";

class LanguageSelectScreenStore {
  constructor() {
    Mobx.makeAutoObservable(this);
  }
}

const LanguageSelectScreen = MobxReact.observer(props => {
  const navigation = useNavigation();
  const [screenStore] = React.useState(() => new LanguageSelectScreenStore());

  //@region Funcs
  const changeLanguage = (lang: string) => {
    const TAG = "changeLanguage";

    cpnAppCentralStore
      .setLanguage(lang)
      .then(() => {})
      .catch(err => {
        console.error(`${SCRIPTFILE_TAG}. ${TAG}. Err=`, err);
      });
  };
  //@endregion

  return (
    <SafeAreaView style={Styles.root}>
      <SettingMenuItem
        label="English"
        onPress={() => {
          changeLanguage(Languages.en);
        }}
        showForwardButton={false}
      />
      <SettingMenuItem
        label="简体中文"
        onPress={() => {
          changeLanguage(Languages.zhCN);
        }}
        showForwardButton={false}
      />
      <SettingMenuItem
        label="繁體中文"
        onPress={() => {
          changeLanguage(Languages.zhTW);
        }}
        showForwardButton={false}
      />
    </SafeAreaView>
  );
});

const Styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "stretch",
    alignContent: "stretch",
  },
});

export default LanguageSelectScreen;
