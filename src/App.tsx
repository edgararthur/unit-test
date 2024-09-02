/**
 * @format
 */

import React from "react";
import * as MobxReact from "mobx-react-lite";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {
  cpnAppCentralStore,
  initTranslation as initTranslationForLibCpnRnAppMng,
  getLoginScreenStack,
} from "../src-deps/lib-cpn-rn-app-management/src";

import {initTranslation as initTranslationForApp} from "./util/translation";

import SplashScreen from "./screens/SplashScreen";
import MainTabScreen from "./screens/MainTabScreen";

import {
  initAllAppModuleTranslation,
  createAllAppModuleStack,
} from "./app-modules";

function initTranslation() {
  initTranslationForLibCpnRnAppMng();
  initAllAppModuleTranslation();
  initTranslationForApp();
}

// Main
const Stack = createNativeStackNavigator();

const listAppModuleStack = createAllAppModuleStack(Stack);
const stackLoginScreen = getLoginScreenStack(Stack);

const App = MobxReact.observer(() => {
  //@region Hooks
  React.useEffect(() => {
    initTranslation();
  }, []);
  //@endregion

  //@region Render
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {stackLoginScreen}
        {cpnAppCentralStore.credentialState == "logged_in" && (
          <>
            <Stack.Screen name="MainScreen" component={MainTabScreen} />
            {listAppModuleStack}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  //@endregion
});

export default App;
