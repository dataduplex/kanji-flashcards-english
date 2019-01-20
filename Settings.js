import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import SettingsList from 'react-native-settings-list';
import ConfigService from './ConfigService';



export default class Settings extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
            shuffleSwitch: ConfigService.getShuffleCards()
        }
        
    }

    
    onShuffleSwitchChange(value) {
        
    }

    render() {

        return (
            <View style={{backgroundColor:'gray',flex:1}}>
              <View style={{flex:1, marginTop:50}}>
                <SettingsList>
                    <SettingsList.Header headerText='Settings' headerStyle={{color:'white'}}/>
                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.state.shuffleSwitch}
                        switchOnValueChange={this.onShuffleSwitchChange}
                        hasSwitch={true}
                        title='Switch Example'/>
                </SettingsList>
                </View>
            </View>

        );

    }

}