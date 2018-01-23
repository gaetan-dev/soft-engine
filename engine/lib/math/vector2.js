/**
 * Vector 2D
 */
class Vector2 {
  /**
   * Creates an instance of Vector2.
   * @param {float} x
   * @param {float} y
   * @memberof Vector2
   */
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  toString () {
    return `{x: ${this.x}, y: ${this.y}}`
  }

  equals (vector) {
    return this.x === vector.x && this.y === vector.y
  }

  /**
   * Return Vector2's length.
   *
   * @returns {float} Length
   * @memberof Vector2
   */
  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Return Vector2's length squared.
   *
   * @returns {float} Length squared
   * @memberof Vector2
   */
  lengthSquared () {
    return (this.x * this.x + this.y * this.y)
  }

  /**
   * Normalize the vector2.
   *
   * @memberof Vector2
   */
  normalize () {
    var len = this.length()
    if (len === 0) {
      return
    }
    var num = 1.0 / len
    this.x *= num
    this.y *= num
  }

  /**
   * Return Vector2 zero.
   *
   * @static
   * @returns {Vector2} (0, 0)
   * @memberof Vector2
   */
  static zero () {
    return new Vector2(0, 0)
  }

  /**
   * Return the copy.
   *
   * @static
   * @param {Vector2} vector
   * @returns {Vector2} Copy
   * @memberof Vector2
   */
  static copy (vector) {
    return new Vector2(vector.x, vector.y)
  }

  /**
   * Normalize the vector.
   *
   * @static
   * @param {Vector2} vector
   * @returns {Vector2} Vector normalized
   * @memberof Vector2
   */
  static normalize (vector) {
    var newVector = Vector2.Copy(vector)
    newVector.normalize()
    return newVector
  }

  /**
   * Return distance between A and B.
   *
   * @static
   * @param {Vector2} pointA
   * @param {Vector2} pointB
   * @returns {float} Distance
   * @memberof Vector2
   */
  static distance (value1, value2) {
    return Math.sqrt(Vector2.DistanceSquared(value1, value2))
  }

  /**
   * Return distance squared between A and B.
   *
   * @static
   * @param {Vector2} pointA
   * @param {Vector2} pointB
   * @returns {float} Distance squared
   * @memberof Vector2
   */
  static distanceSquared (value1, value2) {
    var x = value1.x - value2.x
    var y = value1.y - value2.y
    return (x * x) + (y * y)
  }

  /**
   * Return vector negated.
   *
   * @static
   * @param {Vector2} vector
   * @returns {Vector2} Vector negated
   * @memberof Vector2
   */
  static negate (vector) {
    return new Vector2(-vector.x, -vector.y)
  }

  /**
   * Return vector scaled.
   *
   * @static
   * @param {Vector3} vector
   * @param {float} scale
   * @returns {Vector2} Vector scaled
   * @memberof Vector2
   */
  static scale (vector, scale) {
    return new Vector2(vector.x * scale, vector.y * scale)
  }

  /**
   * Return VectorA + VectorB.
   *
   * @static
   * @param {Vector2} vectorA
   * @param {Vector2} vectorB
   * @returns {Vector2} A + B
   * @memberof Vector2
   */
  static add (vectorA, vectorB) {
    return new Vector2(vectorA.x + vectorB.x, vectorA.y + vectorB.y)
  }

  /**
   * Return VectorA - VectorB
   *
   * @static
   * @param {Vector2} vectorA
   * @param {Vector2} vectorB
   * @returns {Vector2} A - B
   * @memberof Vector2
   */
  static subtract (vectorA, vectorB) {
    return new Vector2(vectorA.x - vectorB.x, vectorA.y - vectorB.y)
  }

  static minimize (left, right) {
    var x = (left.x < right.x) ? left.x : right.x
    var y = (left.y < right.y) ? left.y : right.y
    return new Vector2(x, y)
  }

  static maximize (left, right) {
    var x = (left.x > right.x) ? left.x : right.x
    var y = (left.y > right.y) ? left.y : right.y
    return new Vector2(x, y)
  }

  static transform (vector, transformation) {
    var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4])
    var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5])
    return new Vector2(x, y)
  }
}

export default Vector2
