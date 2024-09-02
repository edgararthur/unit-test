import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Image} from "react-native";

import {
  getStrings,
  Styles as LibStyles,
  Components as LibComponents,
} from "../../src-deps/lib-cpn-rn-app-management/src";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import LanguageSelectScreen from "./LanguageSelectScreen";
import AboutScreen from "./AboutScreen";

const TabForMainScreen = createBottomTabNavigator();
const StackForProfileScreen = createNativeStackNavigator();

const imgHome = require("../assets/images/ic_home.png");
const imgProfile = require("../assets/images/ic_profile.png");
const imgBack = require("../../src-deps/lib-cpn-rn-app-management/src/assets/images/ic_back.png")

function ProfileStack() {
  const strings = getStrings();

  return (
    <StackForProfileScreen.Navigator screenOptions={{headerShown: false}}>
      <StackForProfileScreen.Screen
        name="ProfileMainScreen"
        component={ProfileScreen}
      />
      <StackForProfileScreen.Screen
        name="LanguageSelectScreen"
        component={LanguageSelectScreen}
        options={{
          ...LibStyles.getStackHeaderWithBackStyle(),
          headerTitle: strings.language
        }}
      />
      <StackForProfileScreen.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          ...LibStyles.getStackHeaderWithBackStyle(),
          headerTitle: strings.about
        }}
      />
    </StackForProfileScreen.Navigator>
  );
}

export default function MainTabScreen() {
  const strings = getStrings();

  return (
    <TabForMainScreen.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: LibStyles.CommonStyles.tabBar,
      }}>
      <TabForMainScreen.Screen
        key="HomeScreen"
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <LibComponents.TabBarLabel
              focused={focused}
              label={strings.tab_home}
            />
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={imgHome}
              style={LibStyles.getTabBarIconStyle(focused)}
            />
          ),
        }}
      />
      <TabForMainScreen.Screen
        key="ProfileScreen"
        name="ProfileScreen"
        component={ProfileStack}
        options={{
          tabBarLabel: ({focused}) => (
            <LibComponents.TabBarLabel
              focused={focused}
              label={strings.tab_profile}
            />
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={imgProfile}
              style={LibStyles.getTabBarIconStyle(focused)}
            />
          ),
        }}
      />
    </TabForMainScreen.Navigator>
  );
}
