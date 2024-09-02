import * as MobxReact from "mobx-react-lite";
import {SafeAreaView, StyleSheet, Image} from "react-native";
import React from "react";
import {useNavigation, CommonActions} from "@react-navigation/native";
import {
  initApp,
  cpnAppCentralStore,
  Components as LibComponents
} from "../../src-deps/lib-cpn-rn-app-management/src";

import { initializeAllModuleStore } from "../app-modules";

const SplashScreen = MobxReact.observer(props => {
  const navigation = useNavigation();

  const goTo = (screenName: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screenName}],
      }),
    );
  };

  React.useEffect(() => {
    (async () => {
      await initApp();
      await initializeAllModuleStore();

      if (cpnAppCentralStore.credentialState !== "logged_in") {
        goTo("LoginScreen");
      } else {
        goTo("MainScreen");
      }
    })().then();
  }, []);

  return (
    <SafeAreaView style={Styles.root}>
      <LibComponents.LogoView />
    </SafeAreaView>
  );
});

const Styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  }
});

export default SplashScreen;
