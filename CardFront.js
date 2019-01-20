import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import KanjiService from './KanjiService';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

//import Icon from 'react-native-ionicons';
export default class CardFront extends React.Component {
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const bgColor = navigation.getParam('bgColor', 'lightskyblue');
        const underlayColor = navigation.getParam('underlayColor', 'lightskyblue');
        const index = navigation.getParam('kanjiIndex', 0);
        const grade = navigation.getParam('kanjiGrade', 1);

        firstKanji = KanjiService.getKanjiByGrade(grade, index);

        this.state = {
          grade : grade,
          index: index,
          kanji : firstKanji["New"],
          engMeaning : firstKanji["English meaning"],
          readings : firstKanji["Readings"],
          bgColor: bgColor,
          underlayColor: underlayColor 
        };

        this._onPressButton = this._onPressButton.bind(this);
        this.showPreviousCard = this.showPreviousCard.bind(this);
        this.showNextCard = this.showNextCard.bind(this);
        /*
        grade : "1",
          kanjiIndex: "0",
          kanji : "離",
          engMeaning: "detach",
          readings: "リ、はな-れる、はな-す\nri, hana-reru, hana-su"*/
    }


    _onPressButton() {
        Alert.alert('You tapped the button1')
    }

    showPreviousCard() {

        index = this.state.index-1;
        if (index < 0) {
            index = 0;
        }

        prevKanji = KanjiService.getKanjiByGrade(this.state.grade, index);

        this.setState(prevState => ({
           ...prevState,
           index: index,
           kanji: prevKanji["New"],
           engMeaning: prevKanji["English meaning"],
           readings: prevKanji["Readings"]
        }));
    }

    showNextCard() {
        index = this.state.index+1;
        if (index >= KanjiService.kanjiByGrade[this.state.grade].length) {
            index = KanjiService.kanjiByGrade[this.state.grade].length - 1;
        }

        nextKanji = KanjiService.getKanjiByGrade(this.state.grade, index);

        this.setState(prevState => ({
           ...prevState,
           index: index,
           kanji: nextKanji["New"],
           engMeaning: nextKanji["English meaning"],
           readings: nextKanji["Readings"]
        }));
    }

    static navigationOptions = {
        title: 'Kanji',
    };

    render() {

        var styles = StyleSheet.create({
            button1 : {
              flex:1,
              borderRadius: 0,
              borderWidth: 0,
              //backgroundColor: 'powderblue',
              alignItems: 'center',
              justifyContent: 'center'
            }, 
            frontText: {padding: 20,
              fontSize: 60,
              color: 'black'}
        });

        const cardBProps = {
            bgColor : this.state.bgColor,
            underlayColor: this.state.underlayColor,
            kanjiIndex : this.state.index,
            kanjiGrade : this.state.grade,
            engMeaning : this.state.engMeaning,
            readings : this.state.readings,
            kanji: this.state.kanji 
        };

        /*const { navigation } = this.props;
        const bgColor = navigation.getParam('bgColor', 'lightskyblue');
        const index = navigation.getParam('kanjiIndex', 0);
        const grade = navigation.getParam('kanjiGrade', 1);
        
                                <Text style={ { fontSize : 15 } }>Prev</Text>

        */

        /*backgroundColor: 'teal',alignItems: 'center',
              justifyContent: 'center'*/
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 5, flexDirection: 'column'}}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('CardB', cardBProps)} 
                underlayColor={this.state.underlayColor}
                style={ [styles.button1, {backgroundColor: this.state.bgColor}] }>
                    <Text style={ styles.frontText }>{this.state.kanji}</Text>
                </TouchableHighlight>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableHighlight onPress={ this.showPreviousCard } 
                        underlayColor={this.state.underlayColor}
                        style = { [styles.button1, {backgroundColor: this.state.bgColor}] }>
                            <Icon name='arrow-back' />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 2}}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('CardB', cardBProps)} 
                        underlayColor={this.state.underlayColor} 
                        style = { [styles.button1, {backgroundColor: this.state.bgColor}] }>
                            <Icon name='flip' />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableHighlight onPress={ this.showNextCard } 
                        underlayColor={this.state.underlayColor}
                        style = { [styles.button1, {backgroundColor: this.state.bgColor}] }>
                            <Icon name='arrow-forward' />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );    
    
    }

}