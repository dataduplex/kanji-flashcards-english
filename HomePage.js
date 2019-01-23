import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import ConfigService from './ConfigService';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.cs = new ConfigService(); 
    }


    componentDidMount() {
        this.props.navigation.setParams({
            ConfigService: this.cs
        });
    }

    /*updateShuffleFlag = (flag) => {
        this.setState(
            prevState => ({
                ...prevState,
                shuffleCards: flag
            }));
        ConfigService.setShuffleCards(flag);    
    };*/

    /*static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
      };*/

    static navigationOptions = ({ navigation }) => {

        //console.log("navigation");
        //console.log(navigation);

        const {params = {}} = navigation.state;
        //console.log("params");
        //console.log(params);
        return {
            headerTitle: "Home",
            headerRight: (
                <TouchableHighlight onPress={ () => navigation.navigate('Settings', {
                                                ConfigService: params.ConfigService,
                                        }) } 
                        underlayColor="white" 
                        style = {{backgroundColor: 'transparent'}}>
                    <View style={{padding:10}}>
                        <Icon name='settings'/>
                    </View>
                </TouchableHighlight>
            ),
        };    
      };

    render() {

    const styles = StyleSheet.create({
            button1 : {
              flex:1,
              borderRadius: 0,
              borderWidth: 0,
              //backgroundColor: 'powderblue',
              alignItems: 'center',
              justifyContent: 'center'
            }, 
            buttonText: {padding: 20,
              fontSize: 24,
              color: 'white'}
    });


    const colors = {
        grade1 : {
            main: "indianred",
            ol: "lightcoral"
        },
        grade2 : {
            main: "coral",
            ol: "tomato"
        },
        grade3 : {
            main: "khaki",
            ol: "darkkhaki"
        },
        grade4 : {
            main: "mediumseagreen",
            ol: "seagreen"
        },
        grade5 : {
            main: "dodgerblue",
            ol: "lightskyblue"
        },
        grade6 : {
            main: "mediumpurple",
            ol: "indigo"
        },
        gradeS : {
            main: "orchid",
            ol: "violet"
        }
    }

      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
            {/*<View style={{flex: 1, backgroundColor: 'powderblue'}} />*/}
            <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', {
                configService: this.cs,
                bgColor : colors.grade1.main, underlayColor: colors.grade1.ol, kanjiGrade : 1, kanjiIndex : 0     
            })} underlayColor={colors.grade1.ol}
            style={ [styles.button1, {backgroundColor: colors.grade1.main}] }>
                <Text style={ styles.buttonText }>Grade 1</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', {
                configService: this.cs,
                bgColor : colors.grade2.main, underlayColor: colors.grade2.ol, kanjiGrade : 2, kanjiIndex : 0     
            })} underlayColor={colors.grade2.ol}
            style={ [styles.button1, {backgroundColor: colors.grade2.main}] }>
                <Text style={ styles.buttonText }>Grade 2</Text>
            </TouchableHighlight>
            {/*<View style={{flex: 1, backgroundColor: 'lightblue'}} />*/}
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', {
                    configService: this.cs,
                    bgColor : colors.grade3.main, underlayColor: colors.grade3.ol, kanjiGrade : 3, kanjiIndex : 0     
                })} underlayColor={colors.grade3.ol}
                style={ [styles.button1, {backgroundColor: colors.grade3.main}] }>
                    <Text style={ styles.buttonText }>Grade 3</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', {
                    configService: this.cs,
                    bgColor : colors.grade4.main, underlayColor: colors.grade4.ol, kanjiGrade : 4, kanjiIndex : 0     
                })} underlayColor={colors.grade4.ol}
                style={ [styles.button1, {backgroundColor: colors.grade4.main}] }>
                    <Text style={ styles.buttonText }>Grade 4</Text>
                </TouchableHighlight>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', {
                    configService: this.cs,
                    bgColor : colors.grade5.main, underlayColor: colors.grade5.ol, kanjiGrade : 5, kanjiIndex : 0     
                })} underlayColor={colors.grade5.ol}
                style={ [styles.button1, {backgroundColor: colors.grade5.main}] }>
                    <Text style={ styles.buttonText }>Grade 5</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', {
                    configService: this.cs,
                    bgColor : colors.grade6.main, underlayColor: colors.grade6.ol, kanjiGrade : 6, kanjiIndex : 0     
                })} underlayColor={colors.grade6.ol}
                style={ [styles.button1, {backgroundColor: colors.grade6.main}] }>
                    <Text style={ styles.buttonText }>Grade 6</Text>
                </TouchableHighlight>
            </View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('CardF', {
                    configService: this.cs,
                    bgColor : colors.gradeS.main, underlayColor: colors.gradeS.ol, kanjiGrade : "S", kanjiIndex : 0     
                })} underlayColor={colors.gradeS.ol}
                style={ [styles.button1, {backgroundColor: colors.gradeS.main}] }>
                    <Text style={ styles.buttonText }>Grade S</Text>
            </TouchableHighlight>
      </View>
      );
    }
  }