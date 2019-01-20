import { AsyncStorage } from "react-native";

class ConfigService {

    constructor () {
        this.shuffleCards = false;
        await this._retrieveData();
    }

    setShuffleCards = function(flag) {
        this.shuffleCards = flag;
    }

    getShuffleCards = function() {
        return this.shuffleCards;
    }


    _storeData = async () => {
        try {
          await AsyncStorage.setItem('ShuffleCards', this.shuffleCards);
        } catch (error) {
          // Error saving data
          console.error("[ERROR] Error while saving data to local storage");
          console.log(error);
        }
    }


    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('ShuffleCards');
          if (value !== null) {
            // We have data!!
            console.log(value);
            this.setShuffleCards(value);
          }
         } catch (error) {
           // Error retrieving data
           console.error("[ERROR] Error while getting data from local storage");
          console.log(error);
         }
      }

}

let cs = new ConfigService();
export default cs;