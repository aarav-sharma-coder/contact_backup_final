import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ContactList from '../screens/ContactList';
import BackupScreen from '../screens/BackupScreen';



export const AppTabNavigator = createBottomTabNavigator({
  Backup : {
    screen: BackupScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/backups.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Backup",
    }
  },
  Contacts:{
    screen: ContactList,
    navigationOptions:{
      tabBarIcon:<Image source={require("../assets/MyBackups.png")} style = {{width:20,height:20}}/>,
      tabBarLabel: "Contacts"
    }
  }

});