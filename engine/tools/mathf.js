class Mathf {
  // Clamping values to keep them between 0 and 1
  static clamp (value, min, max) {
    if (typeof min === 'undefined') { min = 0 }
    if (typeof max === 'undefined') { max = 1 }

    return Math.max(min, Math.min(value, max))
  }

  // Interpolating the value between 2 vertices
  // min is the starting point, max the ending point
  // and gradient the % between the 2 points
  static interpolate (min, max, gradient) {
    return min + (max - min) * this.clamp(gradient)
  }

  static radToDeg (rad) {
    return rad * 180 / Math.PI
  }

  static degToRad (deg) {
    return deg * Math.PI / 180
  }
}

export default Mathf
