import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import WriteStoryScreen from './screens/WriteStoryScreen';
import ReadStoryScreen from './screens/ReadStoryScreen';
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {
  render(){
  return (
    <AppContainer/>
  );
}}

const tabNavigator = createBottomTabNavigator({
  WriteStoryScreen: {screen:WriteStoryScreen},
  ReadStoryScreen: {screen:ReadStoryScreen}
},
{
defaultNavigationOptions:({navigation})=>({
  tabBarIcon:({})=>{
    const routeName = navigation.state.routeName
    if(routeName==="WriteStoryScreen"){
      return(
      <Image style={{width:40,height:30}}
      source={require('./assets/write.png')}/>
      )}
    else if(routeName==="ReadStoryScreen"){
      return(
      <Image style={{width:30,height:30}}
      source={require('./assets/read.jpg')}/>
      )}
  }
})
})

const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  TabNavigator:{screen:tabNavigator}
})

const AppContainer = createAppContainer(switchNavigator)

