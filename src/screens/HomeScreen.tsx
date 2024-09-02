import {useNavigation} from "@react-navigation/native";
import * as Mobx from "mobx";
import * as MobxReact from "mobx-react-lite";
import * as React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";

import {Components as LibComponents} from "../../src-deps/lib-cpn-rn-app-management/src";

import { initializeAllModuleStore } from "../app-modules";

class HomeScreenStore {
  constructor() {
    Mobx.makeAutoObservable(this);
  }

  *btnLaunchSightOnClick(navigation: any) {
    navigation.navigate(`sight_MainScreen` as never);
  }
}

const HomeScreen = MobxReact.observer(props => {
  const navigation = useNavigation();
  const [screenStore] = React.useState(() => new HomeScreenStore());

  React.useEffect(() => {
    (async () => {
      await initializeAllModuleStore();
    })().then();
  }, []);

  return (
    <SafeAreaView style={Styles.root}>
      <View style={{flex: 1, alignSelf: "stretch", justifyContent: "center"}}>
        <LibComponents.AppModuleListView
          style={{
            alignSelf: "stretch",
            marginTop: 10,
            marginHorizontal: 10,
          }}
        />
      </View>
      <LibComponents.LogoView />
    </SafeAreaView>
  );
});

const Styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 10,
  },
});

export default HomeScreen;
