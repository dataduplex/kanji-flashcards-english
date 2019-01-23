import { AsyncStorage } from "react-native";

export default class ConfigService {

    constructor () {
        this._storeData = this._storeData.bind(this);
        this._retrieveData = this._retrieveData.bind(this);
        this.setShuffleCards = this.setShuffleCards.bind(this);
        this.getShuffleCards = this.getShuffleCards.bind(this);
        
        this.shuffleCards = false;
        this._retrieveData();
    }

    setShuffleCards = function(flag) {
        this.shuffleCards = flag;
        this._storeData(flag);
    }

    getShuffleCards = function() {
        return this.shuffleCards;
    }


    _storeData = async (flag) => {
        console.log("_storeData Data is called");
        console.log(flag);

        try {
          await AsyncStorage.setItem('ShuffleCards', flag.toString());
          console.log("Stored");
        } catch (error) {
          // Error saving data
          console.error("[ERROR] Error while saving data to local storage");
          console.log(error);
        }
    }


    _retrieveData = async () => {
        console.log("Retrieve Data is called");
        //console.log()
        try {
          const value = await AsyncStorage.getItem('ShuffleCards');
          if (value !== null) {
            // We have data!!
            console.log("Retrieve shuffle cards value");
            console.log(value);
            const flag = (value==='true');
            console.log(flag);
            this.setShuffleCards(flag);
          }
         } catch (error) {
           // Error retrieving data
           console.error("[ERROR] Error while getting data from local storage");
          console.log(error);
         }
      }

}