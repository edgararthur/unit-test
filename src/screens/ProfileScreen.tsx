import {useNavigation} from "@react-navigation/native";
import {
  cpnAppCentralStore,
  getStrings,
  Styles as LibStyles,
} from "../../src-deps/lib-cpn-rn-app-management/src";
import * as Mobx from "mobx";
import * as MobxReact from "mobx-react-lite";
import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import {Button, Avatar} from "react-native-paper";
import _ from "lodash";

import SettingMenuItem from "../../src-deps/lib-cpn-rn-app-management/src/components/SettingMenuItem";

const imgUserPlaceholder = require("../../src-deps/lib-cpn-rn-app-management/src/assets/images/ic_user_placeholder.png");

class ProfileScreenStore {
  constructor() {
    Mobx.makeAutoObservable(this);
  }
}

const UserMenuItem = MobxReact.observer(() => {
  const [name, setName] = React.useState("");
  const [textOtherInfo, setTextOtherInfo] = React.useState("");

  //@region Hooks
  React.useEffect(() => {
    (async () => {
      await cpnAppCentralStore.refreshUserInfo();

      const userInfo = cpnAppCentralStore.cachedUserInfo;
      if (!userInfo) {
        setName("");
        setTextOtherInfo("");
      } else {
        setName(userInfo.fullname);

        const tel = _.toString(_.chain(userInfo).get("tel", "").value());
        setTextOtherInfo(tel);
      }
    })()
      .then(() => {})
      .catch(err => {});
  }, []);
  //@endregion

  return (
    <SettingMenuItem showForwardButton={false}>
      <Avatar.Image
        size={50}
        source={imgUserPlaceholder}
        style={{backgroundColor: LibStyles.Colors.AppLightGray}}
      />
      <View style={{flex: 1, marginLeft: 15}}>
        <Text
          style={{
            ...LibStyles.TextStyle.bold,
            color: LibStyles.Colors.AppTheme,
          }}>
          {name}
        </Text>
        {textOtherInfo != "" && (
          <Text
            style={{
              ...LibStyles.TextStyle.small,
              color: LibStyles.Colors.AppLightGray,
              marginTop: 2,
            }}>
            {textOtherInfo}
          </Text>
        )}
      </View>
    </SettingMenuItem>
  );
});

const ProfileScreen = MobxReact.observer(props => {
  const navigation = useNavigation();
  const strings = getStrings();
  const [screenStore] = React.useState(() => new ProfileScreenStore());

  //@region Events
  const menuLanguageOnClick = () => {
    navigation.navigate("LanguageSelectScreen" as never);
  };

  const menuAboutOnClick = () => {
    navigation.navigate("AboutScreen" as never);
  };

  const btnLogoutOnClick = async () => {
    await cpnAppCentralStore.logout();
  };
  //@endregion

  return (
    <SafeAreaView style={Styles.root}>
      <UserMenuItem />
      <SettingMenuItem label={strings.language} onPress={menuLanguageOnClick} />
      <SettingMenuItem label={strings.about} onPress={menuAboutOnClick} />
      <View style={{marginTop: 20}} />
      <Button
        style={[
          LibStyles.ButtonStyle.withBorder,
          {
            width: "60%",
            alignSelf: "center",
          },
        ]}
        labelStyle={LibStyles.ButtonStyle.withBorderLabelStyle}
        onPress={btnLogoutOnClick}>
        {strings.logout}
      </Button>
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
  menuText: {
    flex: 1,
  },
  menuForwardImage: {
    resizeMode: "center",
    height: 20,
    width: 20,
    tintColor: LibStyles.Colors.AppTheme,
  },
  menuTouchable: {
    flexDirection: "column",
  },
  menuEntryContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomColor: LibStyles.Colors.AppLightGray,
    borderBottomWidth: 1,
  },
});

export default ProfileScreen;
