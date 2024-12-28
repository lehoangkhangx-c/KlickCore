import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Platform } from 'react-native';
import HomePage from '../pages/home';


const Tab = createBottomTabNavigator();
const IOS = Platform.OS === 'ios' ? true : false;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={'HOME'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          // borderTopWidth: 0,
          // height: ,

          // backgroundColor: colors.BG__PRIMARY
        },
        // tabBarActiveTintColor: '#fff',
        // tabBarInactiveTintColor: colors.BUTTON__PRIMARY__DISABLED,
      })}>
      {/* DÙNG để định nghĩa (khai báo) 1 màn hình mới sau này muốn khai báo thì vào đây */}
      {/* Bắt đầu khai báo 1 màn hình */}
      <Tab.Screen
        name={'HOME'}
        options={{
          title: t('home'),
          tabBarLabelStyle: {
            fontWeight: '500',
            fontSize: 16,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home"  size={16} />
          ),
        }}
        component={HomePage}
      />
      {/* Kết thúc khai báo 1 màn hình */}
    </Tab.Navigator>
  );
}
