import Color4 from '../../lib/color4'

class Texture {
  // Working with a fix sized texture (512x512, 1024x1024, etc.).
  constructor (filename, width, height) {
    this.width = width
    this.height = height
    this.load(filename)
  }

  load (filename) {
    const _this = this
    const imageTexture = new Image()
    imageTexture.height = this.height
    imageTexture.width = this.width

    imageTexture.onload = function () {
      const internalCanvas = document.createElement('canvas')
      internalCanvas.width = _this.width
      internalCanvas.height = _this.height
      const internalContext = internalCanvas.getContext('2d')
      internalContext.drawImage(imageTexture, 0, 0)
      _this.internalBuffer = internalContext.getImageData(0, 0, _this.width, _this.height)
    }

    imageTexture.src = filename
  }

  // Takes the U & V coordinates exported by Blender
  // and return the corresponding pixel color in the texture
  map (tu, tv) {
    if (this.internalBuffer) {
      // using a % operator to cycle/repeat the texture if needed
      var u = Math.abs(((tu * this.width) % this.width)) >> 0
      var v = Math.abs(((tv * this.height) % this.height)) >> 0

      var pos = (u + v * this.width) * 4

      var r = this.internalBuffer.data[pos]
      var g = this.internalBuffer.data[pos + 1]
      var b = this.internalBuffer.data[pos + 2]
      var a = this.internalBuffer.data[pos + 3]

      return new Color4(r / 255.0, g / 255.0, b / 255.0, a / 255.0)
    } else {
      // Image is not loaded yet
      return new Color4(1, 1, 1, 1)
    }
  }
}

export default Texture
