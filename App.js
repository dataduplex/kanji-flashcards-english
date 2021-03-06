import React from 'react';
import HomePage from './HomePage';
import CardFront from './CardFront';
import Settings from './Settings';

import { createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator(
  {
    Home: HomePage,
    CardF: CardFront,
    Settings: Settings
  },
  {
    initialRouteName: "Home"
  });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  render() {
    return <AppContainer />;
    ; 
  }
}

