export enum EDirection {
  up, down, right, left
}

export class GameController {
  constructor(sizeX: number, sizeY: number) {
    let grid: number[][] = [];

    for (let j = 0; j < sizeY; j++) {
      let row: number[] = [];
      for (let i = 0; i < sizeX; i++)
        row.push(0);
      grid.push(row);
    }
    this._grid = grid;
    this._sizeX = sizeX;
    this._sizeY = sizeY;

    this.generateNewBlock();
    this.generateNewBlock();
  }

  private _grid: number[][];
  private _score: number = 0;
  private _sizeX: number;
  private _sizeY: number;

  public get grid() {
    return this._grid;
  }

  public get isGameOver() {
    for (let j = 0; j < this._sizeY; j++) {
      for (let i = 0; i < this._sizeX; i++) {
        if (this._grid[j][i] === 0) return false;
        if (i !== 0) {
          if (this._grid[j][i] === this._grid[j][i - 1])
            return false;
        }
        if (i !== this._sizeX - 1) {
          if (this._grid[j][i] === this._grid[j][i + 1])
            return false;
        }
        if (j !== 0) {
          if (this._grid[j][i] === this._grid[j - 1][i])
            return false;
        }
        if (j !== this._sizeY - 1) {
          if (this._grid[j][i] === this._grid[j + 1][i])
            return false;
        }
      }
    }
    return true;
  }

  public get score(): number {
    return this._score;
  }

  public nextTurn(direction: EDirection): boolean {
    let isValid = false;
    let newGrid = JSON.parse(JSON.stringify(this._grid));
    switch (direction) {
      case EDirection.up:
        moveUp(newGrid);
        this._score += mergeUp(newGrid);
        moveUp(newGrid);
        break;
      case EDirection.down:
        moveDown(newGrid);
        this._score += mergeDown(newGrid);
        moveDown(newGrid);
        break;
      case EDirection.left:
        moveLeft(newGrid);
        this._score += mergeLeft(newGrid);
        moveLeft(newGrid);
        break;
      case EDirection.right:
        moveRight(newGrid);
        this._score += mergeRight(newGrid);
        moveRight(newGrid);
        break;
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(this._grid)) {
      isValid = true;
      this._grid = newGrid;
    }

    if (isValid) {
      this.generateNewBlock();
      return true;
    } else return false;
  }

  private generateNewBlock() {
    let randomX: number;
    let randomY: number;

    do {
      randomX = Math.floor((Math.random() * this._sizeX));
      randomY = Math.floor((Math.random() * this._sizeY));
    } while (this._grid[randomY][randomX] !== 0)

    this._grid[randomY][randomX] = 2; // Math.floor((Math.random() * 2) + 1) * 2;
  }
}

function moveUp(grid: number[][]) {
  for (let x = 0; x < grid[0].length; x++) {
    let tmp: number[] = [];
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] !== 0) {
        tmp.push(grid[y][x]);
        grid[y][x] = 0;
      }
    }
    for (let y = 0; y < tmp.length; y++)
      grid[y][x] = tmp[y];
  }
}

function mergeUp(grid: number[][]) {
  let score = 0;
  for (let x = 0; x < grid[0].length; x++) {
    let tmp: number[] = [];
    for (let y = 0; y < grid.length - 1; y++) {
      if (grid[y][x] === 0) continue;
      if (grid[y][x] === grid[y + 1][x]) {
        tmp.push(grid[y][x] * 2);
        score += grid[y][x] * 2;
        grid[y][x] = 0;
        grid[y + 1][x] = 0;
      } else {
        tmp.push(grid[y][x]);
        grid[y][x] = 0;
      }
    }
    for (let y = 0; y < tmp.length; y++)
      grid[y][x] = tmp[y];
  }
  return score;
}

function moveDown(grid: number[][]) {
  for (let x = 0; x < grid[0].length; x++) {
    let tmp: number[] = [];
    for (let y = grid.length - 1; y >= 0; y--) {
      if (grid[y][x] !== 0) {
        tmp.push(grid[y][x]);
        grid[y][x] = 0;
      }
    }
    for (let y = 0; y < tmp.length; y++)
      grid[grid.length - y - 1][x] = tmp[y];
  }
}

function mergeDown(grid: number[][]) {
  let score = 0;
  for (let x = 0; x < grid[0].length; x++) {
    let tmp: number[] = [];
    for (let y = grid.length - 1; y > 0; y--) {
      if (grid[y][x] === 0) continue;
      if (grid[y][x] === grid[y - 1][x]) {
        tmp.push(grid[y][x] * 2);
        score += grid[y][x] * 2;
        grid[y][x] = 0;
        grid[y - 1][x] = 0;
      } else {
        tmp.push(grid[y][x]);
        grid[y][x] = 0;
      }
    }
    for (let y = 0; y < tmp.length; y++)
      grid[grid.length - y - 1][x] = tmp[y];
  }
  return score;
}

function moveLeft(grid: number[][]) {
  for (let y = 0; y < grid.length; y++) {
    let tmp: number[] = [];
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== 0) {
        tmp.push(grid[y][x]);
        grid[y][x] = 0;
      }
    }
    for (let x = 0; x < tmp.length; x++)
      grid[y][x] = tmp[x];
  }
}

function mergeLeft(grid: number[][]) {
  let score = 0;
  for (let y = 0; y < grid.length; y++) {
    let tmp: number[] = [];
    for (let x = 0; x < grid[0].length - 1; x++) {
      if (grid[y][x] === 0) continue;
      if (grid[y][x] === grid[y][x + 1]) {
        tmp.push(grid[y][x] * 2);
        score += grid[y][x] * 2;
        grid[y][x] = 0;
        grid[y][x + 1] = 0;
      } else {
        tmp.push(grid[y][x]);
        grid[y][x] = 0;
      }
    }
    for (let x = 0; x < tmp.length; x++)
      grid[y][x] = tmp[x];
  }
  return score;
}

function moveRight(grid: number[][]) {
  for (let y = 0; y < grid.length; y++) {
    let tmp: number[] = [];
    for (let x = grid[0].length - 1; x >= 0; x--) {
      if (grid[y][x] !== 0) {
        tmp.push(grid[y][x]);
        grid[y][x] = 0;
      }
    }
    for (let x = 0; x < tmp.length; x++)
      grid[y][grid[0].length - 1 - x] = tmp[x];
  }
}

function mergeRight(grid: number[][]) {
  let score = 0;
  for (let y = 0; y < grid.length; y++) {
    let tmp: number[] = [];
    for (let x = grid[0].length - 1; x > 0; x--) {
      if (grid[y][x] === 0) continue;
      if (grid[y][x] === grid[y][x - 1]) {
        tmp.push(grid[y][x] * 2);
        score += grid[y][x] * 2;
        grid[y][x] = 0;
        grid[y][x - 1] = 0;
      } else {
        tmp.push(grid[y][x]);
        grid[y][x] = 0;
      }
    }
    for (let x = 0; x < tmp.length; x++)
      grid[y][grid[0].length - 1 - x] = tmp[x];
  }
  return score;
}

