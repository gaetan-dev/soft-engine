import Vector3 from './vector3'
import Quaternion from './quaternion'

/**
 * That is, in a 4×4 homogeneous transformation matrix, <br>
 * <pre>
 * column 1 represents the “right” (X) vector,
 * column 2 represents the “up” (Y),
 * column 3 represents the “forward” (Z) vector
 * column 4 represents the translation (origin or position) of the space represented by the transformation matrix ().
 * </pre>
 *
 * <table>
 * <tr> <td> right(x) </td>     <td> up(x) </td>      <td> forward(x) </td>     <td> position(x) </td> </tr>
 * <tr> <td> right(y) </td>     <td> up(y) </td>      <td> forward(y) </td>     <td> position(y) </td> </tr>
 * <tr> <td> right(z) </td>     <td> up(z) </td>      <td> forward(z) </td>     <td> position(z) </td> </tr>
 * <tr> <td> 0 </td>            <td> 0 </td>          <td> 0 </td>              <td> 1 </td> </tr>
 * </table>
 */
class Matrix {
  /**
   * Creates an instance of Matrix.
   * @param {float[]} values
   * @memberof Matrix
   */
  constructor (values) {
    this.m = values || []
  }

  /**
   *
   * @returns {float[]}
   * @memberof Matrix
   */
  toArray () {
    return this.m
  }

  /**
   * Check if this matrix is equal to matrix parameter.
   *
   * @param {Matrix} matrix Matrix to be compared
   * @returns {boolean}
   * @memberof Matrix
   */
  equals (matrix) {
    return (this.m[0] === matrix.m[0] && this.m[1] === matrix.m[1] && this.m[2] === matrix.m[2] && this.m[3] === matrix.m[3] && this.m[4] === matrix.m[4] && this.m[5] === matrix.m[5] && this.m[6] === matrix.m[6] && this.m[7] === matrix.m[7] && this.m[8] === matrix.m[8] && this.m[9] === matrix.m[9] && this.m[10] === matrix.m[10] && this.m[11] === matrix.m[11] && this.m[12] === matrix.m[12] && this.m[13] === matrix.m[13] && this.m[14] === matrix.m[14] && this.m[15] === matrix.m[15])
  }

  /**
   * Check if this matrix is an identity matrix.
   *
   * @returns {boolean} Is identity matrix
   * @memberof Matrix
   */
  isIdentity () {
    if (this.m[0] !== 1.0 || this.m[5] !== 1.0 || this.m[10] !== 1.0 || this.m[15] !== 1.0) {
      return false
    }
    if (this.m[12] !== 0.0 || this.m[13] !== 0.0 || this.m[14] !== 0.0 || this.m[4] !== 0.0 || this.m[6] !== 0.0 || this.m[7] !== 0.0 || this.m[8] !== 0.0 || this.m[9] !== 0.0 || this.m[11] !== 0.0 || this.m[12] !== 0.0 || this.m[13] !== 0.0 || this.m[14] !== 0.0) {
      return false
    }
    return true
  }

  /**
   * Get matrix determinant.
   *
   * @returns {float} determinant
   * @memberof Matrix
   */
  getDeterminant () {
    const temp1 = (this.m[10] * this.m[15]) - (this.m[11] * this.m[14])
    const temp2 = (this.m[9] * this.m[15]) - (this.m[11] * this.m[13])
    const temp3 = (this.m[9] * this.m[14]) - (this.m[10] * this.m[13])
    const temp4 = (this.m[8] * this.m[15]) - (this.m[11] * this.m[12])
    const temp5 = (this.m[8] * this.m[14]) - (this.m[10] * this.m[12])
    const temp6 = (this.m[8] * this.m[13]) - (this.m[9] * this.m[12])
    return ((((this.m[0] * (((this.m[5] * temp1) - (this.m[6] * temp2)) + (this.m[7] * temp3))) - (this.m[1] * (((this.m[4] * temp1) - (this.m[6] * temp4)) + (this.m[7] * temp5)))) + (this.m[2] * (((this.m[4] * temp2) - (this.m[5] * temp4)) + (this.m[7] * temp6)))) - (this.m[3] * (((this.m[4] * temp3) - (this.m[5] * temp5)) + (this.m[6] * temp6))))
  }

  /**
   * Invert this matrix.
   *
   * @memberof Matrix
   */
  invert () {
    const l1 = this.m[0]
    const l2 = this.m[1]
    const l3 = this.m[2]
    const l4 = this.m[3]
    const l5 = this.m[4]
    const l6 = this.m[5]
    const l7 = this.m[6]
    const l8 = this.m[7]
    const l9 = this.m[8]
    const l10 = this.m[9]
    const l11 = this.m[10]
    const l12 = this.m[11]
    const l13 = this.m[12]
    const l14 = this.m[13]
    const l15 = this.m[14]
    const l16 = this.m[15]
    const l17 = (l11 * l16) - (l12 * l15)
    const l18 = (l10 * l16) - (l12 * l14)
    const l19 = (l10 * l15) - (l11 * l14)
    const l20 = (l9 * l16) - (l12 * l13)
    const l21 = (l9 * l15) - (l11 * l13)
    const l22 = (l9 * l14) - (l10 * l13)
    const l23 = ((l6 * l17) - (l7 * l18)) + (l8 * l19)
    const l24 = -(((l5 * l17) - (l7 * l20)) + (l8 * l21))
    const l25 = ((l5 * l18) - (l6 * l20)) + (l8 * l22)
    const l26 = -(((l5 * l19) - (l6 * l21)) + (l7 * l22))
    const l27 = 1.0 / ((((l1 * l23) + (l2 * l24)) + (l3 * l25)) + (l4 * l26))
    const l28 = (l7 * l16) - (l8 * l15)
    const l29 = (l6 * l16) - (l8 * l14)
    const l30 = (l6 * l15) - (l7 * l14)
    const l31 = (l5 * l16) - (l8 * l13)
    const l32 = (l5 * l15) - (l7 * l13)
    const l33 = (l5 * l14) - (l6 * l13)
    const l34 = (l7 * l12) - (l8 * l11)
    const l35 = (l6 * l12) - (l8 * l10)
    const l36 = (l6 * l11) - (l7 * l10)
    const l37 = (l5 * l12) - (l8 * l9)
    const l38 = (l5 * l11) - (l7 * l9)
    const l39 = (l5 * l10) - (l6 * l9)
    this.m[0] = l23 * l27
    this.m[4] = l24 * l27
    this.m[8] = l25 * l27
    this.m[12] = l26 * l27
    this.m[1] = -(((l2 * l17) - (l3 * l18)) + (l4 * l19)) * l27
    this.m[5] = (((l1 * l17) - (l3 * l20)) + (l4 * l21)) * l27
    this.m[9] = -(((l1 * l18) - (l2 * l20)) + (l4 * l22)) * l27
    this.m[13] = (((l1 * l19) - (l2 * l21)) + (l3 * l22)) * l27
    this.m[2] = (((l2 * l28) - (l3 * l29)) + (l4 * l30)) * l27
    this.m[6] = -(((l1 * l28) - (l3 * l31)) + (l4 * l32)) * l27
    this.m[10] = (((l1 * l29) - (l2 * l31)) + (l4 * l33)) * l27
    this.m[14] = -(((l1 * l30) - (l2 * l32)) + (l3 * l33)) * l27
    this.m[3] = -(((l2 * l34) - (l3 * l35)) + (l4 * l36)) * l27
    this.m[7] = (((l1 * l34) - (l3 * l37)) + (l4 * l38)) * l27
    this.m[11] = -(((l1 * l35) - (l2 * l37)) + (l4 * l39)) * l27
    this.m[15] = (((l1 * l36) - (l2 * l38)) + (l3 * l39)) * l27
  }

  /**
   * Multiply matrix by vector3
   *
   * <pre>
   * | m11 m12 m13 m14 |   | a |   | am11 bm12 cm13 dm14 |
   * | m21 m22 m23 m24 | x | b | = | am21 bm22 cm23 dm24 |
   * | m31 m32 m33 m34 |   | c |   | am31 bm32 cm33 dm34 |
   * | m41 m42 m43 m44 |   | 1 |   | am41 bm42 cm43 dm44 |
   * </pre>
   *
   * @param {Vector3} vector
   * @memberof Matrix
   */
  multiplyVector3 (vector) {
    this.m[0] *= vector.x
    this.m[1] *= vector.y
    this.m[2] *= vector.z
    this.m[3] *= 1

    this.m[4] *= vector.x
    this.m[5] *= vector.y
    this.m[6] *= vector.z
    this.m[7] *= 1

    this.m[8] *= vector.x
    this.m[9] *= vector.y
    this.m[10] *= vector.z
    this.m[11] *= 1

    this.m[12] *= vector.x
    this.m[13] *= vector.y
    this.m[14] *= vector.z
    this.m[15] *= 1
  }

  /**
   * Return the zero matrix.
   *
   * @static
   * @returns {Matrix} Zero matrix
   * @memberof Matrix
   */
  static zero () {
    return new Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }

  /**
   * Return the identity matrix.
   *
   * @static
   * @returns {Matrix} Identity matrix
   * @memberof Matrix
   */
  static identity () {
    return new Matrix([1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0])
  }

  /**
   *
   *
   * @static
   * @param {Matrix} source Matrix to be copied
   * @returns {Matrix} New copied matrix
   * @memberof Matrix
   */
  static copy (source) {
    return new Matrix([source.m[0], source.m[1], source.m[2], source.m[3], source.m[4], source.m[5], source.m[6], source.m[7], source.m[8], source.m[9], source.m[10], source.m[11], source.m[12], source.m[13], source.m[14], source.m[15]])
  }

  /**
   * Compute multiply matrix between this matrix and the parameter matrix.
   *
   * @param {Matrix} matrixA First matrix to multiply
   * @param {Matrix} matrixB Second matrix to multiply
   * @returns {Matrix} Multiply matrix
   * @memberof Matrix
   */
  static multiply (matrixA, matrixB) {
    const result = new Matrix()
    result.m[0] = matrixA.m[0] * matrixB.m[0] + matrixA.m[1] * matrixB.m[4] + matrixA.m[2] * matrixB.m[8] + matrixA.m[3] * matrixB.m[12]
    result.m[1] = matrixA.m[0] * matrixB.m[1] + matrixA.m[1] * matrixB.m[5] + matrixA.m[2] * matrixB.m[9] + matrixA.m[3] * matrixB.m[13]
    result.m[2] = matrixA.m[0] * matrixB.m[2] + matrixA.m[1] * matrixB.m[6] + matrixA.m[2] * matrixB.m[10] + matrixA.m[3] * matrixB.m[14]
    result.m[3] = matrixA.m[0] * matrixB.m[3] + matrixA.m[1] * matrixB.m[7] + matrixA.m[2] * matrixB.m[11] + matrixA.m[3] * matrixB.m[15]
    result.m[4] = matrixA.m[4] * matrixB.m[0] + matrixA.m[5] * matrixB.m[4] + matrixA.m[6] * matrixB.m[8] + matrixA.m[7] * matrixB.m[12]
    result.m[5] = matrixA.m[4] * matrixB.m[1] + matrixA.m[5] * matrixB.m[5] + matrixA.m[6] * matrixB.m[9] + matrixA.m[7] * matrixB.m[13]
    result.m[6] = matrixA.m[4] * matrixB.m[2] + matrixA.m[5] * matrixB.m[6] + matrixA.m[6] * matrixB.m[10] + matrixA.m[7] * matrixB.m[14]
    result.m[7] = matrixA.m[4] * matrixB.m[3] + matrixA.m[5] * matrixB.m[7] + matrixA.m[6] * matrixB.m[11] + matrixA.m[7] * matrixB.m[15]
    result.m[8] = matrixA.m[8] * matrixB.m[0] + matrixA.m[9] * matrixB.m[4] + matrixA.m[10] * matrixB.m[8] + matrixA.m[11] * matrixB.m[12]
    result.m[9] = matrixA.m[8] * matrixB.m[1] + matrixA.m[9] * matrixB.m[5] + matrixA.m[10] * matrixB.m[9] + matrixA.m[11] * matrixB.m[13]
    result.m[10] = matrixA.m[8] * matrixB.m[2] + matrixA.m[9] * matrixB.m[6] + matrixA.m[10] * matrixB.m[10] + matrixA.m[11] * matrixB.m[14]
    result.m[11] = matrixA.m[8] * matrixB.m[3] + matrixA.m[9] * matrixB.m[7] + matrixA.m[10] * matrixB.m[11] + matrixA.m[11] * matrixB.m[15]
    result.m[12] = matrixA.m[12] * matrixB.m[0] + matrixA.m[13] * matrixB.m[4] + matrixA.m[14] * matrixB.m[8] + matrixA.m[15] * matrixB.m[12]
    result.m[13] = matrixA.m[12] * matrixB.m[1] + matrixA.m[13] * matrixB.m[5] + matrixA.m[14] * matrixB.m[9] + matrixA.m[15] * matrixB.m[13]
    result.m[14] = matrixA.m[12] * matrixB.m[2] + matrixA.m[13] * matrixB.m[6] + matrixA.m[14] * matrixB.m[10] + matrixA.m[15] * matrixB.m[14]
    result.m[15] = matrixA.m[12] * matrixB.m[3] + matrixA.m[13] * matrixB.m[7] + matrixA.m[14] * matrixB.m[11] + matrixA.m[15] * matrixB.m[15]

    return result
  }

  /**
   * Return the transpose matrix.
   *
   * @static
   * @param {Matrix} matrix Matrix to be transposed
   * @returns {Matrix} Transposed matrix
   * @memberof Matrix
   */
  static transpose (matrix) {
    const result = new Matrix([matrix.m[0], matrix.m[4], matrix.m[8], matrix.m[12], matrix.m[1], matrix.m[5], matrix.m[9],
      matrix.m[13], matrix.m[2], matrix.m[6], matrix.m[10], matrix.m[14], matrix.m[3], matrix.m[7], matrix.m[11], matrix.m[15]])

    return result
  }

  /**
   * Return the rotation matrix about x-axis.
   *
   * <pre>
   * | 1             0              0 |
   * | 0    cos(angle)    -sin(angle) |
   * | 0    sin(angle)     cos(angle) |
   * </pre>
   *
   * @static
   * @param {float} angle
   * @returns {Matrix} Rotation matrix x-axis
   * @memberof Matrix
   */
  static rotationX (angle) {
    const result = Matrix.zero()
    const s = Math.sin(angle)
    const c = Math.cos(angle)
    result.m[0] = 1.0
    result.m[15] = 1.0
    result.m[5] = c
    result.m[10] = c
    result.m[9] = -s
    result.m[6] = s

    return result
  }

  /**
   * Return the rotation matrix about y-axis.
   *
   * <pre>
   * |  cos(angle)    0    sin(angle) |
   * |           0    1             0 |
   * | -sin(angle)    0    cos(angle) |
   * </pre>
   *
   * @static
   * @param {float} angle
   * @returns {Matrix} Rotation matrix y-axis
   * @memberof Matrix
   */
  static rotationY (angle) {
    const result = Matrix.zero()
    const s = Math.sin(angle)
    const c = Math.cos(angle)
    result.m[5] = 1.0
    result.m[15] = 1.0
    result.m[0] = c
    result.m[2] = -s
    result.m[8] = s
    result.m[10] = c

    return result
  }

  /**
   * Return the rotation matrix about z-axis.
   *
   * <pre>
   * | cos(angle)    -sin(angle)    0 |
   * | sin(angle)     cos(angle)    0 |
   * |          0              0    1 |
   * </pre>
   *
   * @static
   * @param {float} angle
   * @returns {Matrix} Rotation matrix z-axis
   * @memberof Matrix
   */
  static rotationZ (angle) {
    const result = Matrix.zero()
    const s = Math.sin(angle)
    const c = Math.cos(angle)
    result.m[10] = 1.0
    result.m[15] = 1.0
    result.m[0] = c
    result.m[1] = s
    result.m[4] = -s
    result.m[5] = c

    return result
  }

  static rotationAxis (axis, angle) {
    const s = Math.sin(-angle)
    const c = Math.cos(-angle)
    const c1 = 1 - c
    axis.normalize()
    const result = Matrix.zero()
    result.m[0] = (axis.x * axis.x) * c1 + c
    result.m[1] = (axis.x * axis.y) * c1 - (axis.z * s)
    result.m[2] = (axis.x * axis.z) * c1 + (axis.y * s)
    result.m[3] = 0.0
    result.m[4] = (axis.y * axis.x) * c1 + (axis.z * s)
    result.m[5] = (axis.y * axis.y) * c1 + c
    result.m[6] = (axis.y * axis.z) * c1 - (axis.x * s)
    result.m[7] = 0.0
    result.m[8] = (axis.z * axis.x) * c1 - (axis.y * s)
    result.m[9] = (axis.z * axis.y) * c1 + (axis.x * s)
    result.m[10] = (axis.z * axis.z) * c1 + c
    result.m[11] = 0.0
    result.m[15] = 1.0

    return result
  }

  static rotationYawPitchRoll (yaw, pitch, roll) {
    return Matrix.multiply(Matrix.multiply(Matrix.rotationZ(roll), Matrix.rotationX(pitch)), Matrix.rotationY(yaw))
  }

  static scaling (x, y, z) {
    const result = Matrix.zero()
    result.m[0] = x
    result.m[5] = y
    result.m[10] = z
    result.m[15] = 1.0

    return result
  }

  static translation (x, y, z) {
    const result = Matrix.identity()
    result.m[12] = x
    result.m[13] = y
    result.m[14] = z

    return result
  }

  /**
   * Initialize the view transformation matrix. <br>
   * Builds a left-handed look-at matrix.
   *
   * <pre>
   * This method uses the following formula to compute the returned matrix:
   * zaxis = normal(cameraTarget - cameraPosition)
   * xaxis = normal(cross(cameraUpVector, zaxis))
   * yaxis = cross(zaxis, xaxis)
   * </pre>
   *
   * <table>
   * <tr> <td> xaxis.x </td>           <td> yaxis.x </td>          <td> zaxis.x </td>         <td> 0 </td> </tr>
   * <tr> <td> xaxis.y </td>           <td> yaxis.y </td>          <td> zaxis.y </td>         <td> 0 </td> </tr>
   * <tr> <td> xaxis.z </td>           <td> yaxis.z </td>          <td> zaxis.z </td>         <td> 0 </td> </tr>
   * <tr> <td> -dot(xaxis, cameraPosition) </td>  <td> -dot(yaxis, cameraPosition) </td>  <td> -dot(zaxis, cameraPosition) </td>  <td> 1 </td> </tr>
   * </table>
   *
   * @static
   * @param eye {Vector3} Camera position
   * @param target {Vector3} Camera target
   * @param up {Vector3} Camera up vector
   * @returns {Matrix} View transformation matrix
   * @memberof Matrix
   */
  static lookAtLH (eye, target, up) {
    const zAxis = Vector3.subtract(target, eye)
    zAxis.normalize()
    const xAxis = Vector3.cross(up, zAxis)
    xAxis.normalize()
    const yAxis = Vector3.cross(zAxis, xAxis)
    yAxis.normalize()

    const ex = -Vector3.dot(xAxis, eye)
    const ey = -Vector3.dot(yAxis, eye)
    const ez = -Vector3.dot(zAxis, eye)

    return new Matrix([xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, ex, ey, ez, 1])
  }

  /**
   * Builds a left-handed perspective projection matrix.
   *
   * <pre>
   * All of the parameters of the PerspectiveLH method are distances in camera space.
   * The parameters describe the dimensions of the view volume.
   * </pre>
   *
   * <table>
   * <tr> <td> 2*znearPlane/width </td>   <td> 0 </td>                      <td> 0 </td>                                              <td> 0 </td> </tr>
   * <tr> <td> 0 </td>                    <td> 2*znearPlane/height </td>    <td> 0 </td>                                              <td> 0 </td> </tr>
   * <tr> <td> 0 </td>                    <td> 0 </td>                      <td> zfarPlane/(zfarPlane-znearPlane) </td>               <td> 1 </td> </tr>
   * <tr> <td> 0 </td>                    <td> 0 </td>                      <td> znearPlane*zfarPlane/(znearPlane-zfarPlane) </td>    <td> 0 </td> </tr>
   * </table>
   *
   * @static
   * @param width {float} Width of the view volume at the near view plane
   * @param height {float} Height of the view volume at the near view plane
   * @param znear {float} Z-value of the near view plane.
   * @param zfar {float} Z-value of the far view plane.
   * @returns {Matrix} Perspective projection matrix
   * @memberof Matrix
   */
  static perspectiveLH (width, height, znear, zfar) {
    const matrix = Matrix.zero()
    matrix.m[0] = (2.0 * znear) / width
    matrix.m[1] = matrix.m[2] = matrix.m[3] = 0.0
    matrix.m[5] = (2.0 * znear) / height
    matrix.m[4] = matrix.m[6] = matrix.m[7] = 0.0
    matrix.m[10] = -zfar / (znear - zfar)
    matrix.m[8] = matrix.m[9] = 0.0
    matrix.m[11] = 1.0
    matrix.m[12] = matrix.m[13] = matrix.m[15] = 0.0
    matrix.m[14] = (znear * zfar) / (znear - zfar)

    return matrix
  }

  /**
   * Builds a left-handed perspective projection matrix based on a field of view.
   *
   * <pre>
   * This method uses the following formula to compute the returned matrix
   * The view space height is represented by h, which is calculated from h = cot(fieldOfViewY/2)
   * The view space width is represented by w, which is calculated from h = w / aspectRatio
   * </pre>
   *
   * <table>
   * <tr> <td> w </td>       <td> 0 </td>       <td> 0 </td>                                             <td> 0 </td> </tr>
   * <tr> <td> 0 </td>       <td> h </td>       <td> 0 </td>                                             <td> 0 </td> </tr>
   * <tr> <td> 0 </td>       <td> 0 </td>       <td> zfarPlane/(zfarPlane-znearPlane) </td>              <td> 1 </td> </tr>
   * <tr> <td> 0 </td>       <td> 0 </td>       <td> -znearPlane*zfarPlane/(zfarPlane-znearPlane) </td>  <td> 0 </td> </tr>
   * </table>
   *
   * @static
   * @param fov {float} Field of view in the y direction, in radians
   * @param aspect {float} Aspect ratio, defined as the view space width divided by height
   * @param znear {float} Z-value of the near view plane
   * @param zfar {float} Z-value of the far view plane
   * @returns {Matrix} Perspective projection matrix
   * @memberof Matrix
   */
  static perspectiveFovLH (fov, aspect, znear, zfar) {
    const matrix = Matrix.zero()
    const tan = 1.0 / (Math.tan(fov * 0.5))
    matrix.m[0] = tan / aspect
    matrix.m[1] = matrix.m[2] = matrix.m[3] = 0.0
    matrix.m[5] = tan
    matrix.m[4] = matrix.m[6] = matrix.m[7] = 0.0
    matrix.m[8] = matrix.m[9] = 0.0
    matrix.m[10] = -zfar / (znear - zfar)
    matrix.m[11] = 1.0
    matrix.m[12] = matrix.m[13] = matrix.m[15] = 0.0
    matrix.m[14] = (znear * zfar) / (znear - zfar)

    return matrix
  }

  /**
   * Return the matrix's quaternion rotation.
   *
   * @static
   * @param {Matrix} matrix
   * @returns {Quaternion} rotation
   * @memberof Matrix
   */
  static toQuaternion (matrix) {
    const q = new Quaternion()
    q.w = Math.sqrt(Math.max(0, 1 + matrix.m[0] + matrix.m[5] + matrix.m[10])) / 2
    q.x = Math.sqrt(Math.max(0, 1 + matrix.m[0] - matrix.m[5] - matrix.m[10])) / 2
    q.y = Math.sqrt(Math.max(0, 1 - matrix.m[0] + matrix.m[5] - matrix.m[10])) / 2
    q.z = Math.sqrt(Math.max(0, 1 - matrix.m[0] - matrix.m[5] + matrix.m[10])) / 2

    q.x *= Math.sign(q.x * (matrix.m[9] - matrix.m[6]))
    q.y *= Math.sign(q.y * (matrix.m[2] - matrix.m[8]))
    q.z *= Math.sign(q.z * (matrix.m[4] - matrix.m[1]))

    return q
  }
}

export default Matrix
