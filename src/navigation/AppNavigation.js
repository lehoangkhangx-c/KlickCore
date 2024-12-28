import React, { memo } from "react";
import { Dimensions, Platform } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Chọn chỉ một Stack Navigator
import TabNavigator from "./TabNavigator"; // Nhớ kiểm tra TabNavigator

const { width } = Dimensions.get("window");

// Định nghĩa native stack navigator
const Stack = createNativeStackNavigator();

function AppStackNavigatorMemo() {
  const commonOptionScreen = {
    headerShown: false,
    gestureResponseDistance: { horizontal: width },
    cardStyleInterpolator: Platform.OS === "ios"
      ? CardStyleInterpolators.forHorizontalIOS
      : CardStyleInterpolators.forScaleFromCenterAndroid,
  };

  return (
    <Stack.Navigator
      initialRouteName={"TABNAV"}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        headerTintColor: '#fff',
      })}
    >
      <Stack.Screen
        name={"TABNAV"}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
const AppStackNavigator = memo(AppStackNavigatorMemo, () => true);

//-- Stack gốc của ứng dụng
const RootStack = createNativeStackNavigator(); // Chỉ sử dụng createNativeStackNavigator

function RootStackScreen() {
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          ...DefaultTheme.colors,
          background: "#f0f0f0", // Thêm màu nền tùy chỉnh nếu cần
          card: "#ffffff", // Thêm màu card nếu cần
        },
      }}
    >
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={AppStackNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const RootStackScreenMemo = memo(RootStackScreen, () => true);

export default RootStackScreenMemo;
