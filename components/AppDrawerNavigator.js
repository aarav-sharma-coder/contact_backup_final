import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyBackupScreen from '../screens/MyBackupScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import BackupScreen from '../screens/BackupScreen';
import {Icon } from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon:<Icon name="home" type ="fontawesome5"/>
    }
    },
   Notifications:{
       screen: NotificationScreen,
       navigationOptions:{
           drawerIcon:<Icon name="bell" type="fontawesome5"/>
       }
   },
   Settings:{
       screen: SettingScreen,
       navigationOptions:{
           drawerIcon:<Icon name="Settings" type="fontawesome5"/>
       }
   },
  
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })