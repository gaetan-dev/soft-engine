import Matrix from '../math/matrix'
import Vector3 from '../math/vector3'

class Transform {
  constructor (position, rotation, scale) {
    this.position = position || Vector3.zero()
    this.rotation = Vector3.toQuaternion(rotation || Vector3.zero())
    this.scale = scale || new Vector3(1, 1, 1)

    this.worldMatrix = new Matrix()
    this.transformMatrix = new Matrix()
  }

  get right () {
    return new Vector3(this.worldMatrix.m[0], this.worldMatrix.m[4], this.worldMatrix.m[8])
  }

  get up () {
    return new Vector3(this.worldMatrix.m[1], this.worldMatrix.m[5], this.worldMatrix.m[9])
  }

  get forward () {
    return new Vector3(this.worldMatrix.m[2], this.worldMatrix.m[6], this.worldMatrix.m[10])
  }
}

export default Transform
