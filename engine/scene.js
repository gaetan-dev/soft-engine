import Camera from './camera'
import Device from './device'
import IO from './tools/io'
import Vector3 from './lib/math/vector3'

/**
 * Represente Scene View
 */
class Scene {
  constructor () {
    this.canvas = document.getElementById('frontBuffer')
    this.device = new Device(this.canvas)

    this.camera = new Camera(new Vector3(0, 0, 15), new Vector3(0, 0, 0))

    this.meshes = []

    // Import meshes
    IO.loadJSONFileAsync('./models/monkey.babylon', (meshes) => this.loadJSONCompleted(meshes))

    // Calling the HTML5 rendering loop
    window.requestAnimationFrame(() => this.drawingLoop())
  }

  loadJSONCompleted (meshesLoaded) {
    this.meshes = meshesLoaded
  }

  /**
   * Rendering loop handler
   *
   * @memberof Scene
   */
  drawingLoop () {
  // console.log(Optimization.getFps())

    this.device.clear()

    // Doing the various matrix operations
    this.device.render(this.camera, this.meshes)
    // Flushing the back buffer into the front buffer
    this.device.present()

    // Calling the HTML5 rendering loop recursively
    window.requestAnimationFrame(() => this.drawingLoop())
  }
}

export default Scene
