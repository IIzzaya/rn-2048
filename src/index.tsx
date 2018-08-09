import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, PanResponderInstance, Button } from 'react-native';
import GridBox from './components/GridBox';
import { Vector2 } from './utils/Vector';
import { GameController, EDirection } from './logic/gameLogic';

interface IProps { };
export default class App extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.gameController = new GameController(this.sizeX, this.sizeY);
    this.state = {
      turns: 0
    }

    this.triggerGesture = this.triggerGesture.bind(this);
  };
  
  state: any;
  sizeX: number = 4;
  sizeY: number = 4;
  gameController: GameController;
  panResponder: PanResponderInstance;
  startPosition: { x: number, y: number } = { x: undefined, y: undefined };
  validLengthSquare: number = 30 * 30;
  isValidMove: boolean = false;

  getSwipeDirection(angle: number) {
    if (angle < Math.PI / 4) return EDirection.right;
    else if (angle < 3 * Math.PI / 4) return EDirection.down;
    else if (angle < 5 * Math.PI / 4) return EDirection.left;
    else if (angle < 7 * Math.PI / 4) return EDirection.up;
    else return EDirection.right;
  }

  triggerGesture(vector: Vector2) {
    console.log('[triggerGesture]');
    if (this.gameController.nextTurn(this.getSwipeDirection(vector.xPlusAnticlockwiseAngle)))
      this.setState({ turns: this.state.turns + 1 });
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gs) => {
        this.startPosition.x = gs.dx;
        this.startPosition.y = gs.dy;
        this.isValidMove = true;
      },
      onPanResponderMove: (e, gs) => {
        if (!this.isValidMove) return;
        const vector = new Vector2(gs.dx - this.startPosition.x, gs.dy - this.startPosition.y);
        if (vector.lengthSquare > this.validLengthSquare) {
          this.isValidMove = false;
          this.triggerGesture(vector);
        }
      },
      onPanResponderRelease: (e, gs) => {
        this.startPosition.x = undefined;
        this.startPosition.y = undefined;
        this.isValidMove = true;
      }
    });
  };

  onRestartBtn = () => {
    this.gameController = new GameController(this.sizeX, this.sizeY);
    this.setState({ turns: 0 });
  }

  render() {
    return (
      <View style={styles.container}>
        <View {...this.panResponder.panHandlers}>

          {this.gameController.isGameOver ?
            (<View>
              <Text style={styles.gameoverBoard}>GAME OVER</Text>
            </View>) : undefined
          }

          <View>
            <Text style={styles.scoreBoard}>{`SCORE: ${this.gameController.score}`}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.information}>{`TURNS: ${this.state.turns}`}</Text>
              <Button title='RESTART' onPress={this.onRestartBtn} />
            </View>
          </View>

          <GridBox gridData={this.gameController.grid} />

          <View>
            <Text style={styles.information}>{'2048!'}</Text>
            <Text style={styles.author}>Created By IIzzaya.</Text>
          </View>

        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scoreBoard: {
    fontSize: 26,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  gameoverBoard: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  information: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  author: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
