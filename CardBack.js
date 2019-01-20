import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Alert, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import KanjiService from './KanjiService';

export default class CardBack extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const bgColor = navigation.getParam('bgColor', 'lightskyblue');
        const index = navigation.getParam('kanjiIndex', 0);
        const grade = navigation.getParam('kanjiGrade', 1);
        const kanji = navigation.getParam('kanji', '');
        const engMeaning = navigation.getParam('engMeaning', '');
        const readings = navigation.getParam('readings', '');
        const underlayColor = navigation.getParam('underlayColor', '');

        this.state = {
          grade : grade,
          index: index,
          kanji : kanji,
          engMeaning : engMeaning,
          readings : readings,
          bgColor: bgColor,
          underlayColor: underlayColor 
        };

        //this._onPressButton = this._onPressButton.bind(this);
        this.showPreviousCard = this.showPreviousCard.bind(this);
        this.showNextCard = this.showNextCard.bind(this);

    }


    static navigationOptions = {
        title: 'Meaning',
    };


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


    render() {


        const cardFProps = {
            bgColor : this.state.bgColor,
            underlayColor: this.state.underlayColor,
            kanjiIndex : this.state.index,
            kanjiGrade : this.state.grade,
            engMeaning : this.state.engMeaning,
            readings : this.state.readings,
            kanji: this.state.kanji 
        };

        var styles = StyleSheet.create({
            button1 : {
              flex:1,
              borderRadius: 0,
              borderWidth: 0,
              //backgroundColor: 'powderblue',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }, 
            kanjiText: {padding: 20,
              fontSize: 25,
              color: 'black'},
            meaningText: {padding: 20,
                fontSize: 30,
                color: 'black'},
            readingText: {
                padding: 20,
                fontSize: 15,
                color: 'black'
            }       
        });
//Math.floor((Math.random() * 100) + 1);

        return ( 
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 5, flexDirection: 'row'}}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', {
                    bgColor : this.state.bgColor, kanjiGrade : 1, kanjiIndex : 0 
                })}
                underlayColor={this.state.underlayColor}  
                style={ [styles.button1, {backgroundColor: this.state.bgColor}] }>
                    <View style={{flex: 1, 
                                flexDirection: 'column', 
                                alignItems: 'center',
                                justifyContent: 'center'}}>
                        <Text style={ styles.kanjiText }>{this.state.kanji}</Text>
                        <Text style={ styles.meaningText }>{this.state.engMeaning}</Text>
                        <Text style={ styles.readingText }>{this.state.readings}</Text>
                    </View>
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
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', cardFProps)} 
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