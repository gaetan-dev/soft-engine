/**
 * RGBA Color
 */
class Color4 {
  /**
   * Creates an instance of Color4.
   * @param {float} r Red
   * @param {float} g Green
   * @param {float} b Bleue
   * @param {float} a Alpha
   * @memberof Color4
   */
  constructor (r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }
  /**
   *
   *
   * @returns {string}
   * @memberof Color4
   */
  toString () {
    return `{r: ${this.r}, g: ${this.g}, b: ${this.b}, a: ${this.a}`
  }
}

export default Color4
