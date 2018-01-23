class Optimization {
  static getFps () {
    const now = Date.now()
    const currentFps = 1000.0 / (now - this.previousDate)
    this.previousDate = now

    return parseInt(currentFps >> 0)
  }
}

export default Optimization
