export class Vector2 {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public x: number;
  public y: number;

  public get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public get lengthSquare() {
    return this.x * this.x + this.y * this.y;
  }

  static dotProduct(v1: Vector2, v2: Vector2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  public dotProduct(v: Vector2) {
    return v.x * this.x + v.y * this.y;
  }

  static angle(v1: Vector2, v2: Vector2) {
    return Math.acos(this.dotProduct(v1, v2) / (v1.length * v2.length));
  }

  public angle(v: Vector2) {
    return Math.acos(this.dotProduct(v) / (v.length * this.length));
  }

  public get xPlusAnticlockwiseAngle() {
    return this.y > 0 ? this.angle(new Vector2(1, 0)) : 2 * Math.PI - this.angle(new Vector2(1, 0));
  }
}