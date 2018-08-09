import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface IProps {
  value: number,
  color?: string
}
export default class GridBox extends Component<IProps> {
  render() {
    const { value, color } = this.props;

    let backgroundColor;
    if (!color) {
      switch (value) {
        case 0:
          backgroundColor = 'lightgrey';
          break;
        case 2:
          backgroundColor = 'orange';
          break;
        case 4:
          backgroundColor = 'gold';
          break;
        case 8:
          backgroundColor = 'yellow';
          break;
        case 16:
          backgroundColor = 'yellowgreen';
          break;
        case 32:
          backgroundColor = 'greenyellow';
          break;
        case 64:
          backgroundColor = 'green';
          break;
        case 128:
          backgroundColor = 'springgreen';
          break;
        case 256:
          backgroundColor = 'cyan';
          break;
        case 512:
          backgroundColor = 'blue';
          break;
        case 1024:
          backgroundColor = 'blueviolet';
          break;
        case 2048:
          backgroundColor = 'purple';
          break;
        case 4096:
          backgroundColor = 'violet';
          break;
        case 8192:
          backgroundColor = 'pink';
          break;
        case 16384:
          backgroundColor = 'red';
          break;
        default:
          backgroundColor = 'darkred';
      }
    } else backgroundColor = color;

    const textStyle = value < 1000? styles.textLarge : (value < 10000 ? styles.textMiddle : styles.textSmall);
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={textStyle}>{value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  textLarge: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
  textMiddle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
  textSmall: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
});
