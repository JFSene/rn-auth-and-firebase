/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner, Button, Card, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';


export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyC9ikpUVaxQ4Jx-fQD8QmFUEwjrePmcoKQ',
        authDomain: 'authapp-fde73.firebaseapp.com',
        databaseURL: 'https://authapp-fde73.firebaseio.com',
        projectId: 'authapp-fde73',
        storageBucket: 'authapp-fde73.appspot.com',
        messagingSenderId: '255778622809'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  
renderContent() {
  switch (this.state.loggedIn) {
    case true:
    return (
      <Card>
        <CardSection>
      <Button onPress={() => firebase.auth().signOut()}>
          Log in
      </Button>
      </CardSection>
      </Card>
  );

    case false:
    return <LoginForm />;

    default:
    return (
      <Card>
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      </Card>
  );
  }
}
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
       
            {this.renderContent()}
       
      </View>
    );
  }
}

