import Mathf from '../../tools/mathf'
import Quaternion from './quaternion'

/**
 * Vector 3D
 */
class Vector3 {
  /**
   * Creates an instance of Vector3.
   * @param {float} x
   * @param {float} y
   * @param {float} z
   * @memberof Vector3
   */
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  get normalized () {
    return Vector3.normalize(this)
  }

  get toDeg () {
    return new Vector3(Mathf.radToDeg(this.x), Mathf.radToDeg(this.y), Mathf.radToDeg(this.z))
  }

  get toRad () {
    return new Vector3(Mathf.degToRad(this.x), Mathf.degToRad(this.y), Mathf.degToRad(this.z))
  }

  toString () {
    return `{x: ${this.x}, y: ${this.y}, z: ${this.z}}`
  }

  equals (vector) {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z
  }

  /**
   * Return Vector3's length.
   *
   * @returns {float} Length
   * @memberof Vector3
   */
  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  /**
   * Return Vector3's length squared.
   *
   * @returns {float} Length squared
   * @memberof Vector3
   */
  lengthSquared () {
    return (this.x * this.x + this.y * this.y + this.z * this.z)
  }

  /**
   * Normalize the vector3.
   *
   * @memberof Vector3
   */
  normalize () {
    const length = this.length()
    if (length === 0) {
      return
    }
    var num = 1.0 / length
    this.x *= num
    this.y *= num
    this.z *= num
  }

  /**
   * Return Vector3 zero.
   *
   * @static
   * @returns {Vector3} (0, 0, 0)
   * @memberof Vector3
   */
  static zero () {
    return new Vector3(0, 0, 0)
  }

  /**
   * Return Vector3 up.
   *
   * @static
   * @returns {Vector3} (0, 1, 0)
   * @memberof Vector3
   */
  static up () {
    return new Vector3(0, 1.0, 0)
  }

  /**
   * Return the copy.
   *
   * @static
   * @param {Vector3} vector
   * @returns {Vector3} Copy
   * @memberof Vector3
   */
  static copy (vector) {
    return new Vector3(vector.x, vector.y, vector.z)
  }

  /**
   * Normalize the vector.
   *
   * @static
   * @param {Vector3} vector
   * @returns {Vector3} Vector normalized
   * @memberof Vector3
   */
  static normalize (vector) {
    var newVector = Vector3.copy(vector)
    newVector.normalize()
    return newVector
  }

  /**
   * Return distance between A and B.
   *
   * @static
   * @param {Vector3} pointA
   * @param {Vector3} pointB
   * @returns {float} Distance
   * @memberof Vector3
   */
  static distance (pointA, pointB) {
    return Math.sqrt(Vector3.DistanceSquared(pointA, pointB))
  }

  /**
   * Return distance squared between A and B.
   *
   * @static
   * @param {Vector3} pointA
   * @param {Vector3} pointB
   * @returns {float} Distance squared
   * @memberof Vector3
   */
  static distanceSquared (pointA, pointB) {
    var x = pointA.x - pointB.x
    var y = pointA.y - pointB.y
    var z = pointA.z - pointB.z
    return (x * x) + (y * y) + (z * z)
  }

  /**
   * Return dot product between left and right.
   *
   * @static
   * @param {Vector3} left
   * @param {Vector3} right
   * @returns {float} Dot product
   * @memberof Vector3
   */
  static dot (left, right) {
    return (left.x * right.x + left.y * right.y + left.z * right.z)
  }

  /**
   * Return cross product between left and right.
   *
   * @static
   * @param {vectro3} left
   * @param {vectro3} right
   * @returns {Vector3} Cross product
   * @memberof Vector3
   */
  static cross (left, right) {
    var x = left.y * right.z - left.z * right.y
    var y = left.z * right.x - left.x * right.z
    var z = left.x * right.y - left.y * right.x
    return new Vector3(x, y, z)
  }

  /**
   * Return vector negated.
   *
   * @static
   * @param {Vector3} vector
   * @returns {Vector3} Vector negated
   * @memberof Vector3
   */
  static negate (vector) {
    return new Vector3(-vector.x, -vector.y, -vector.z)
  }

  /**
   * Return vector scaled.
   *
   * @static
   * @param {Vector3} vector
   * @param {float} scale
   * @returns {Vector3} Vector scaled
   * @memberof Vector3
   */
  static scale (vector, scale) {
    return new Vector3(vector.x * scale, vector.y * scale, vector.z * scale)
  }

  /**
   * Return VectorA + VectorB.
   *
   * @static
   * @param {Vector3} vectorA
   * @param {Vector3} vectorB
   * @returns {Vector3} A + B
   * @memberof Vector3
   */
  static add (vectorA, vectorB) {
    return new Vector3(vectorA.x + vectorB.x, vectorA.y + vectorB.y, vectorA.z + vectorB.z)
  }

  /**
   * Return VectorA - VectorB
   *
   * @static
   * @param {Vector3} vectorA
   * @param {Vector3} vectorB
   * @returns {Vector3} A - B
   * @memberof Vector3
   */
  static subtract (vectorA, vectorB) {
    return new Vector3(vectorA.x - vectorB.x, vectorA.y - vectorB.y, vectorA.z - vectorB.z)
  }

  /**
   * Return VectorA * VectorB
   *
   * @static
   * @param {Vector3} vectorA
   * @param {Vector3} vectorB
   * @returns {Vector3} A * B
   * @memberof Vector3
   */
  static multiply (vectorA, vectorB) {
    return new Vector3(vectorA.x * vectorB.x, vectorA.y * vectorB.y, vectorA.z * vectorB.z)
  }

  /**
   * Return A / B
   *
   * @static
   * @param {Vector3} vectorA
   * @param {Vector3} vectorB
   * @returns {Vector3} A / B
   * @memberof Vector3
   */
  static divide (vectorA, vectorB) {
    return new Vector3(vectorA.x / vectorB.x, vectorA.y / vectorB.y, vectorA.z / vectorB.z)
  }

  static transformCoordinates (vector, transformation) {
    var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12]
    var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13]
    var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14]
    var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15]
    return new Vector3(x / w, y / w, z / w)
  }

  static transformNormal (vector, transformation) {
    var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8])
    var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9])
    var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10])
    return new Vector3(x, y, z)
  }

  static fromArray (array, offset) {
    if (!offset) {
      offset = 0
    }
    return new Vector3(array[offset], array[offset + 1], array[offset + 2])
  }

  /**
   * Return the angle in Radian between A and B.
   *
   * @static
   * @param {Vector3} vectorA
   * @param {Vector3} vectorB
   * @returns {float} angle
   * @memberof Vector3
   */
  static angleRad (vectorA, vectorB) {
    let angle = Math.acos(Vector3.dot(Vector3.normalize(vectorA), Vector3.normalize(vectorB)))
    const cross = Vector3.cross(vectorA, vectorB)
    const dot = Vector3.dot(Vector3.up(), cross)

    return dot < 0 ? -angle : angle
  }

  /**
   * Return the angle in Degrees between A and B.
   *
   * @static
   * @param {Vector3} vectorA
   * @param {Vector3} vectorB
   * @returns {float} angle
   * @memberof Vector3
   */
  static angleDeg (vectorA, vectorB) {
    return Mathf.radToDeg(Vector3.angleRad(vectorA, vectorB))
  }

  /**
   * Return quaternion conversion from Vector3.
   *
   * @static
   * @param {Vector3} vectorA
   * @returns {Quaternion} quaternion
   * @memberof Vector3
   */
  static toQuaternion (vectorA) {
    // Roll (x-axis rotation)
    const cr = Math.cos(vectorA.x / 2)
    const sr = Math.sin(vectorA.x / 2)
    // Pitch (y-axis rotation)
    const cp = Math.cos(vectorA.y / 2)
    const sp = Math.sin(vectorA.y / 2)
    // Yaw (z-axis rotation)
    const cy = Math.cos(vectorA.z / 2)
    const sy = Math.sin(vectorA.z / 2)

    const x = sr * cp * cy + cr * sp * sy
    const y = cr * sp * cy - sr * cp * sy
    const z = cr * cp * sy + sr * sp * cy
    const w = cr * cp * cy - sr * sp * sy

    return new Quaternion(x, y, z, w)
  }

  static orthoNormalize (normal, tangent) {
    normal.normalize()
    tangent.normalize()

    const proj = Vector3.scale(normal, Vector3.dot(tangent, normal))
    const ortho = Vector3.normalize(Vector3.subtract(tangent, proj))

    normal.x = ortho.x
    normal.y = ortho.y
    normal.z = ortho.z
  }
}

export default Vector3
