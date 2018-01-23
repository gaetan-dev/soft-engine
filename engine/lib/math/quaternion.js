import Mathf from '../../tools/mathf.js'
import Matrix from './matrix'
import Vector3 from './vector3'

/**
 * The quaternion is an abstract means of representing attitude. It is a four-dimensional vector
 * used to describe a three-dimensional attitude representation.
 */
class Quaternion {
  constructor (x, y, z, w) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  get eulerAngle () {
    return Quaternion.toEulerAngle(this).toDeg
  }

  set eulerAngle (vector) {
    // Convert to radian
    const q = Vector3.toQuaternion(vector.toRad)
    this.x = q.x
    this.y = q.y
    this.z = q.z
    this.w = q.w
  }

  /**
   * Return quaternion conversion from Matrix.
   *
   * @static
   * @param {Matrix} matrix
   * @returns {Quaternion} quaternion
   * @memberof Quaternion
   */
  static fromMatrix (matrix) {
    return Matrix.toQuaternion(matrix)
  }

  /**
   * Return quaternion conversion from Vector3
   *
   * @static
   * @param {Vector3} vector
   * @returns {Quaternion} quaternion
   * @memberof Quaternion
   */
  static fromEulerAngle (vector) {
    return Vector3.toQuaternion(vector)
  }

  /**
   * Return euler angle conversion from quaternion.
   *
   * <pre>
   * Bank = atan2(2 * (q.w * q.x + q.y * q.z)), 1 - 2 * (q.x * q.x + q.y * q.y))
   * Attitude = arcsin(2 * (q.w * q.y - q.z * q.x))
   * Heading = atan2(2 * (q.w * q.z + q.x * q.y), 1 - 2 * (q.y * q.y + q.z * q.z))
   * </pre>
   *
   * @static
   * @param {Quaternion} quaternion
   * @returns {Vector3} eulerAngle
   * @memberof Quaternion
   */
  static toEulerAngle (quaternion) {
    // Roll (x-axis rotation)
    const t0 = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z)
    const t1 = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y)
    const x = Math.atan2(t0, t1)

    // Pitch (y-axis rotation)
    const t2 = Mathf.clamp(2 * (quaternion.w * quaternion.y - quaternion.z * quaternion.x), -1, 1)
    const y = Math.asin(t2)

    // Yaw (z-axis rotation)
    const t3 = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y)
    const t4 = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z)
    const z = Math.atan2(t3, t4)

    return new Vector3(x, y, z)
  }

  lookRotation (lookAt, up) {
    const forward = Vector3.normalize(lookAt)
    Vector3.orthoNormalize(forward, up)
    const right = Vector3.cross(up, forward)

    this.w = Math.sqrt(1 + right.x + up.y + forward.z)
    const w4 = 1 / (4 * this.w)
    this.x = (up.z - forward.y) * w4
    this.y = (forward.x - right.z) * w4
    this.z = (right.y - right.x) * w4
  }
}

export default Quaternion
