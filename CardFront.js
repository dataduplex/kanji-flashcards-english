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

        this.bgColor = navigation.getParam('bgColor', 'lightskyblue');
        this.underlayColor = navigation.getParam('underlayColor', 'lightskyblue');
        this.grade = navigation.getParam('kanjiGrade', 1);
        this.ConfigService = navigation.getParam('configService', null);

        this.firstKanji = KanjiService.getKanjiByGrade(this.grade, 0);
        this.gradeCount = KanjiService.getGradeCount(this.grade);

        this.prevStack = [];

        this.state = {
            index: 0,
            kanji : this.firstKanji["New"],
            engMeaning : this.firstKanji["English meaning"],
            readings : this.firstKanji["Readings"],
            showMeaning: false
        };

        this._onPressButton = this._onPressButton.bind(this);
        this.handlePreviousButton = this.handlePreviousButton.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
        this.handleFlipButton = this.handleFlipButton.bind(this);
        this.randomIntFromInterval = this.randomIntFromInterval.bind(this);
        
    }



    /*componentDidMount() {
        console.log("Inside componentDidMount");
        this.setState(prevState => ({
            ...prevState,
            showMeaning: false
         }));
    }*/


    _onPressButton() {
        Alert.alert('You tapped the button1')
    }

    handleFlipButton() {
        
        /*const { navigation } = this.props;
        navigation.navigate('CardB', {
            bgColor : this.bgColor,
            underlayColor: this.underlayColor,
            kanjiGrade : this.grade,
            kanjiIndex : this.state.index,
            engMeaning : this.state.engMeaning,
            readings : this.state.readings,
            kanji: this.state.kanji,
            configService: this.ConfigService
        });*/

        this.setState(prevState => ({
            ...prevState,
            showMeaning: !prevState.showMeaning
         }));

    }


    randomIntFromInterval(min,max) // min and max included
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    handlePreviousButton() {
        console.log("handlePreviousButton this.ConfigService.getShuffleCards()");
        console.log(this.ConfigService.getShuffleCards());
        if (this.ConfigService.getShuffleCards()) {
            if (this.prevStack.length>0) {
                index = this.prevStack.pop();
            }
        } else {
            index = this.state.index-1;
            if (index < 0) {
                index = 0;
            }
        }   
        
        prevKanji = KanjiService.getKanjiByGrade(this.grade, index);

        this.setState(prevState => ({
           ...prevState,
           index: index,
           kanji: prevKanji["New"],
           engMeaning: prevKanji["English meaning"],
           readings: prevKanji["Readings"]
        }));
    }

    handleNextButton() {
        console.log("handleNextButton this.ConfigService.getShuffleCards()");
        console.log(this.ConfigService.getShuffleCards());

        if (this.ConfigService.getShuffleCards()) {
            this.prevStack.push(this.state.index);
            index = this.randomIntFromInterval(0, this.gradeCount-1);
        } else {
            index = this.state.index+1;
            if (index >= KanjiService.kanjiByGrade[this.grade].length) {
                index = KanjiService.kanjiByGrade[this.grade].length - 1;
            }
        }

        nextKanji = KanjiService.getKanjiByGrade(this.grade, index);    

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

        if (this.state.showMeaning) {
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
    
            return ( 
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 5, flexDirection: 'row'}}>
                    <TouchableHighlight onPress={this.handleFlipButton}
                    underlayColor={this.underlayColor}  
                    style={ [styles.button1, {backgroundColor: this.bgColor}] }>
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
                            <TouchableHighlight onPress={ this.handlePreviousButton } 
                            underlayColor={this.underlayColor}
                            style = { [styles.button1, {backgroundColor: this.bgColor}] }>
                                <Icon name='arrow-back' />
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 2}}>
                            <TouchableHighlight onPress={this.handleFlipButton} 
                            underlayColor={this.underlayColor} 
                            style = { [styles.button1, {backgroundColor: this.bgColor}] }>
                                <Icon name='flip' />
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableHighlight onPress={ this.handleNextButton } 
                            underlayColor={this.underlayColor}
                            style = { [styles.button1, {backgroundColor: this.bgColor}] }>
                                <Icon name='arrow-forward' />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            );

        } else {
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
                    <TouchableHighlight onPress={this.handleFlipButton} 
                    underlayColor={this.underlayColor}
                    style={ [styles.button1, {backgroundColor: this.bgColor}] }>
                        <Text style={ styles.frontText }>{this.state.kanji}</Text>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TouchableHighlight onPress={ this.handlePreviousButton } 
                            underlayColor={this.underlayColor}
                            style = { [styles.button1, {backgroundColor: this.bgColor}] }>
                                <Icon name='arrow-back' />
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 2}}>
                            <TouchableHighlight onPress={this.handleFlipButton} 
                            underlayColor={this.underlayColor} 
                            style = { [styles.button1, {backgroundColor: this.bgColor}] }>
                                <Icon name='flip' />
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableHighlight onPress={ this.handleNextButton } 
                            underlayColor={this.underlayColor}
                            style = { [styles.button1, {backgroundColor: this.bgColor}] }>
                                <Icon name='arrow-forward' />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            );    
        }
    
    }

}