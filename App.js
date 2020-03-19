import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
import * as firebase from 'firebase';
import Pie from './Pie';

var firebaseConfig = {
  apiKey: 'AIzaSyA3XgkHjk85b3Yg2AWoiEYBWIQuJVIO3cA',
  authDomain: 'ass2-60d96.firebaseapp.com',
  databaseURL: 'https://ass2-60d96.firebaseio.com',
  projectId: 'ass2-60d96',
  storageBucket: 'ass2-60d96.appspot.com',
  messagingSenderId: '501786813264',
  appId: '1:501786813264:web:2e7c463f17be8b74314255',
};

firebase.initializeApp(firebaseConfig);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salesPrice: '',
      salesdata: [],
    };
    // console.log(salesdata);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child('salesdata')
      .once('value', snapshot => {
        const data = snapshot.val();
        if (snapshot.val()) {
          console.log('data:', data);
          const initMessages = [];
          Object.keys(data).forEach(salesPrice =>
            initMessages.push(data[salesPrice]),
          );
          this.setState({
            salesdata: initMessages,
          });
          console.log('salesdata after setstate :', this.state.salesdata);
        }
      });

    firebase
      .database()
      .ref()
      .child('salesdata')
      .on('child_added', snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            salesPrice: [data, ...prevState.salesdata],
          }));
        }
      });
  }

  addItem() {
    if (!this.state.salesPrice) return;

    const newMessage = firebase
      .database()
      .ref()
      .child('salesdata')
      .push();
    newMessage.set(this.state.salesPrice, () =>
      this.setState({salesPrice: ''}),
    );
    //console.log('salesprice:', salesPrice),
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.msgBox}>
          <TextInput
            placeholder="Enter the sales"
            value={this.state.salesPrice}
            style={styles.txtInput}
            onChangeText={text =>
              this.setState({salesPrice: text})
            }></TextInput>

          <Button title="SEND" onPress={this.addItem}></Button>
        </View>
        <ScrollView>
          {/* <FlatList
            data={this.state.salesdata}
            renderItem={({item}) => (
              <View style={styles.listItemContainer}>
                <Text style={styles.listItem}>{item}</Text>
              </View>
            )}
            />*/}
        </ScrollView>
        <View>
          {console.log('Pie data')}
          <Pie data={this.state.salesdata} />
          {console.log('data', this.state.salesdata)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //marginTop: Constants.statusBarHeight,
    backgroundColor: '#eee',
  },
  msgBox: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  txtInput: {
    flex: 1,
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
  },
  listItem: {
    fontSize: 20,
    padding: 10,
  },
});
