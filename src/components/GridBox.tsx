import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ColorBlock from './ColorBlock';

interface IProps {
  gridData: number[][],
  backgroundColor?: string
}
export default class GridBox extends Component<IProps> {
  render() {
    const { gridData, backgroundColor } = this.props;

    let rows: any = [];
    gridData.forEach((row, i) => {
      let cells: any = [];
      row.forEach((value, j) => {
        cells.push((
          <View style={styles.cell} key={`${i}-${j}`}>
            <ColorBlock value={value} />
          </View>
        ));
      })
      rows.push(
        (<View style={styles.row} key={`${i}`}>
          {cells}
        </View>)
      );
    })

    if (backgroundColor)
      return (
        <View style={[styles.containerPadding, { backgroundColor }]}>
          <View style={[styles.container, { backgroundColor }]}>
            {rows}
          </View>
        </View >
      );
    else
      return (
        <View style={styles.containerPadding}>
          <View style={styles.container}>
            {rows}
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#aaaaaa',
    width: 300,
    height: 300,
  },
  containerPadding: {
    padding: 5,
    backgroundColor: '#aaaaaa',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 5
  }
});
