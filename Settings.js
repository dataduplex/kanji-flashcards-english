import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import SettingsList from 'react-native-settings-list';
//import ConfigService from './ConfigService';


export default class Settings extends React.Component {
    
    constructor(props) {
        super(props); 

        const { navigation } = this.props;
        //console.log("navigation in settings");
        //console.log(navigation);
        this.ConfigService = navigation.getParam('ConfigService', null);
        //shuffleCards = false;
        //this.updateShuffleFlag = navigation.getParam('updateShuffleFlag', '');
        this.onShuffleSwitchChange = this.onShuffleSwitchChange.bind(this);

        this.state = {
            shuffleCards: this.ConfigService.getShuffleCards()
        }

        //console.log("this in constructor");
        //console.log(this);
        
         
    }

    onShuffleSwitchChange(value) {
        //const { navigation } = this.props;
        //updateShuffleFlag(value);
        //Alert.alert('You tapped the button');   
        
        //console.log("this in onShuffleSwitchChange");
        //console.log(this);
        //console.log("value");
        //console.log(value);
        this.setState(
            prevState => ({
                shuffleCards: value
        }));

        this.ConfigService.setShuffleCards(value);
    }

    render() {

        return (
            <View style={{backgroundColor:'gray',flex:1}}>
              <View style={{flex:1, marginTop:50}}>
                <SettingsList>
                    <SettingsList.Header headerText='Settings' headerStyle={{color:'white'}}/>
                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.state.shuffleCards}
                        switchOnValueChange={this.onShuffleSwitchChange}
                        hasSwitch={true}
                        title='Shuffle cards'/>
                </SettingsList>
                </View>
            </View>

        );

    }

}