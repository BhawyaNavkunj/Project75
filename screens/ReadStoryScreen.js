import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ToastAndroid,
  FlatList,
} from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
  state = {
    search: '',
    allStories: [],
    dataSource:[]
  };

  componentDidMount = async () => {
    this.retrieveStories();
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  retrieveStories = async () => {
    try {
      var allStories = [];
      var stories = db
        .collection('Stories')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            allStories.push(doc.data());
            console.log('These are the stories:', allStories);
          });
          this.setState({
            allStories: allStories,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  SearchFilterFunction = async (text) => {
   //passing the inserted text in textinput
      const newData = this.state.allStories.filter((item)=> {
        //applying filter for the inserted text in search bar
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        search: text,
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#E0C8EA', marginBottom: 10 }}>
          <Text style={styles.text}>Bedtime Stories</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <SearchBar
            platform="android"
            placeholder="Search for a story"
            value={this.state.search}
            inputContainerStyle={styles.searchBox}
            onChangeText={(text) => {
              this.SearchFilterFunction(text);
            }}
            onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />
        </View>
        <FlatList
        data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text>  Title: {item.Title}</Text>
                    <Text>  Author : {item.Author}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                /> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    height: 35,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderWidth: 2,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'cursive',
  },
  itemContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    borderColor: 'purple',
    justifyContent:'center',
    alignSelf: 'center',
  }
});
