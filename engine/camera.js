import Transform from './lib/model/transform'

/**
 *
 *
 * @class Camera
 */
class Camera {
  constructor (position, rotation) {
    this.transform = new Transform(position, rotation)
  }

  zoom (forward, speed) {
    if (this.transform.position.z < 2) { return }

    this.transform.position.z += forward * speed
  }

  move (right, up, speed) {
    this.transform.position.x += this.transform.right.x * right * speed
    this.transform.position.y += this.transform.up.y * -up * speed

    this.rotate(right, -up, speed)
  }

  rotate (theta, phi, speed) {
    const eulerAngle = this.transform.rotation.eulerAngle
    eulerAngle.x -= theta
    eulerAngle.y -= phi

    this.transform.rotation.eulerAngle = eulerAngle
  }

  rotateLookAt (theta, phi, speed) {

  }
}

export default Camera
