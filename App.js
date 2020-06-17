/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import Block from './components/Block';
import Navigation from './navigation';

class InstagramUI extends Component {
  render() {
    return (
      <Block >
        <Navigation />
      </Block>
    );
  }
}
export default InstagramUI;

const styles = StyleSheet.create({
  container: {

  }
});