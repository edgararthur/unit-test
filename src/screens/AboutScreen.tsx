import {useNavigation} from "@react-navigation/native";
import {
  cpnAppCentralStore,
  Styles as LibStyles,
} from "../../src-deps/lib-cpn-rn-app-management/src";
import * as Mobx from "mobx";
import * as MobxReact from "mobx-react-lite";
import * as React from "react";
import {SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "react-native-paper";

const SCRIPTFILE_TAG = "AboutScreen";

class AboutScreenStore {
  textAbout = "";

  constructor() {
    Mobx.makeAutoObservable(this);

    const cpnMetaData = cpnAppCentralStore.apiClient?.analyticMetaData;

    if (cpnMetaData) {
      this.textAbout = `App Package ID: ${cpnMetaData.appPackageId}\nApp Version: ${cpnMetaData.appPackageVersion}`;
    }
  }
}

const AboutScreen = MobxReact.observer(props => {
  const navigation = useNavigation();
  const [screenStore] = React.useState(() => new AboutScreenStore());

  return (
    <SafeAreaView style={Styles.root}>
      <Text style={LibStyles.TextStyle.regular}>{screenStore.textAbout}</Text>
    </SafeAreaView>
  );
});

const Styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "stretch",
    alignContent: "stretch",
    padding: 10,
  },
});

export default AboutScreen;
