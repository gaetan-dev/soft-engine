import Color4 from './lib/color4'
import Matrix from './lib/math/matrix'
import Mathf from './tools/mathf'
import Vector2 from './lib/math/vector2'
import Vector3 from './lib/math/vector3'
import Vertex from './lib/model/vertex'

/**
 *
 *
 * @class Device
 */
class Device {
  constructor (canvas) {
    this.workingCanvas = canvas
    this.workingWidth = canvas.width
    this.workingHeight = canvas.height
    this.workingContext = this.workingCanvas.getContext('2d')
    // We then need to keep an history of these Z indexes per pixel on screen
    this.depthbuffer = new Array(this.workingWidth * this.workingHeight)

    // Every cell of the array is mapped to a pixel on the screen.
    // The back buffer size is equal to the number of pixels to draw
    // on screen (width * height) * 4 (R,G,B & Alpha values).
    this.backbuffer = []
  }

  // This function is called to clear the back buffer with a specific color
  clear () {
    // Clearing with black color by default
    this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight)

    // Once cleared with black pixels, we're getting back the associated image data to
    // clear out back buffer
    this.backbuffer = this.workingContext.getImageData(0, 0, this.workingWidth, this.workingHeight)

    // Clearing depth buffer
    for (let i = 0; i < this.depthbuffer.length; i++) {
      // Max possible value
      this.depthbuffer[i] = Number.MAX_SAFE_INTEGER
    }
  }

  // Once everything is ready, we can flush the back buffer
  // into the front buffer.
  present () {
    this.workingContext.putImageData(this.backbuffer, 0, 0)
  }

  // Called to put a pixel on screen at a specific X,Y coordinates
  putPixel (x, y, z, color) {
    this.backbufferdata = this.backbuffer.data
    // As we have a 1-D Array for our back buffer
    // we need to know the equivalent cell index in 1-D based
    // on the 2D coordinates of the screen
    const index = ((x >> 0) + (y >> 0) * this.workingWidth)
    const index4 = index * 4

    if (this.depthbuffer[index] < z) {
      return // Discard
    }

    this.depthbuffer[index] = z

    // RGBA color space is used by the HTML5 canvas
    this.backbufferdata[index4] = color.r * 255
    this.backbufferdata[index4 + 1] = color.g * 255
    this.backbufferdata[index4 + 2] = color.b * 255
    this.backbufferdata[index4 + 3] = color.a * 255
  }

  // Project takes some 3D coordinates and transform them
  // in 2D coordinates using the transformation matrix
  project (vertex, transMat, world) {
    // Transforming the coordinates
    const point2d = Vector3.transformCoordinates(vertex.coordinates, transMat)
    // Transforming the coordinates & the normal to the vertex in the 3D world
    var point3DWorld = Vector3.transformCoordinates(vertex.coordinates, world)
    var normal3DWorld = Vector3.transformCoordinates(vertex.normal, world)

    // The transformed coordinates will be based on coordinate system
    // starting on the center of the screen. But drawing on screen normally starts
    // from top left. We then need to transform them again to have x:0, y:0 on top left.
    const x = point2d.x * this.workingWidth + this.workingWidth / 2.0
    const y = -point2d.y * this.workingHeight + this.workingHeight / 2.0

    return (new Vertex(new Vector3(x, y, point2d.z), normal3DWorld, point3DWorld, vertex.textureCoordinates))
  }

  // The main method of the engine that re-compute each vertex projection during each frame
  render (camera, meshes) {
    // The view matrix is used to transform a model’s vertices from world-space to view-space
    const viewMatrix = Matrix.lookAtLH(camera.transform.position, camera.transform.rotation.eulerAngle, Vector3.up())
    camera.transform.worldMatrix = viewMatrix
    // Vertices that have been transformed into view space need to be transformed by the
    // projection transformation matrix into a space called “clip space”
    const projectionMatrix = Matrix.perspectiveFovLH(0.78, this.workingWidth / this.workingHeight, 0.01, 1.0)

    for (let mesh of meshes) {
      // Beware to apply rotation before translation
      mesh.transform.worldMatrix = Matrix.multiply(Matrix.translation(mesh.transform.position.x, mesh.transform.position.y, mesh.transform.position.z), Matrix.rotationYawPitchRoll(mesh.transform.rotation.eulerAngle.y, mesh.transform.rotation.eulerAngle.x, mesh.transform.rotation.eulerAngle.z))
      mesh.transform.transformMatrix = Matrix.multiply(Matrix.multiply(mesh.transform.worldMatrix, viewMatrix), projectionMatrix)

      // this.verticesRendering(mesh)
      // this.wireframeRendering(mesh)
      this.materialRendering(mesh)
    }
  }

  verticesRendering (mesh) {
    for (let vertex of mesh.vertices) {
      // First, we project the 3D coordinates into the 2D space
      const projectedPoint = this.project(vertex, mesh.transform.transformMatrix, mesh.transform.worldMatrix)
      // Then we can draw on screen
      this.drawPoint(projectedPoint.coordinates)
    }
  }

  wireframeRendering (mesh) {
    // Iterate through all the faces defined and to draw the triangles associated.
    for (let face of mesh.faces) {
      const vertexA = mesh.vertices[face.A]
      const vertexB = mesh.vertices[face.B]
      const vertexC = mesh.vertices[face.C]

      const pixelA = this.project(vertexA, mesh.transform.transformMatrix, mesh.transform.worldMatrix)
      const pixelB = this.project(vertexB, mesh.transform.transformMatrix, mesh.transform.worldMatrix)
      const pixelC = this.project(vertexC, mesh.transform.transformMatrix, mesh.transform.worldMatrix)

      this.drawBline(pixelA.coordinates, pixelB.coordinates)
      this.drawBline(pixelB.coordinates, pixelC.coordinates)
      this.drawBline(pixelC.coordinates, pixelA.coordinates)
    }
  }

  materialRendering (mesh) {
    for (let face of mesh.faces) {
      const vertexA = mesh.vertices[face.A]
      const vertexB = mesh.vertices[face.B]
      const vertexC = mesh.vertices[face.C]

      const pixelA = this.project(vertexA, mesh.transform.transformMatrix, mesh.transform.worldMatrix)
      const pixelB = this.project(vertexB, mesh.transform.transformMatrix, mesh.transform.worldMatrix)
      const pixelC = this.project(vertexC, mesh.transform.transformMatrix, mesh.transform.worldMatrix)

      const color = 1
      this.drawTriangle(pixelA, pixelB, pixelC, new Color4(color, color, color, 1), mesh.texture)
    }
  }

  // drawPoint calls putPixel but does the clipping operation before
  drawPoint (point, color) {
    if (!color) {
      color = new Color4(1.0, 1.0, 0.0, 1.0)
    }

    // Clipping what's visible on screen
    if (point.x >= 0 && point.y >= 0 && point.x < this.workingWidth && point.y < this.workingHeight) {
      // Drawing a yellow point
      this.putPixel(point.x, point.y, point.z, color)
    }
  }

  // Draw a line between 2 vertices using simple algorithm.
  drawLine (pointA, pointB) {
    const dist = pointB.subtract(pointA).length()

    // If the distance between the 2 points is less than 2 pixels
    // We're exiting
    if (dist < 2) {
      return
    }

    // Find the middle point between first & second point
    const middlePoint = pointA.add((pointB.subtract(pointA)).scale(0.5))
    // We draw this point on screen
    this.drawPoint(middlePoint)
    // Recursive algorithm launched between first & middle point
    // and between middle & second point
    this.drawLine(pointA, middlePoint)
    this.drawLine(middlePoint, pointB)
  }

  // There is an optimized way to draw our lines using the Bresenham’s line algorithm.
  drawBline (point0, point1) {
    // Cast to integer
    let x0 = point0.x >> 0
    let y0 = point0.y >> 0
    const x1 = point1.x >> 0
    const y1 = point1.y >> 0
    const dx = Math.abs(x1 - x0)
    const dy = Math.abs(y1 - y0)
    const sx = (x0 < x1) ? 1 : -1
    const sy = (y0 < y1) ? 1 : -1
    let err = dx - dy

    while (true) {
      this.drawPoint(new Vector2(x0, y0))

      if ((x0 === x1) && (y0 === y1)) {
        break
      }
      const e2 = 2 * err
      if (e2 > -dy) {
        err -= dy
        x0 += sx
      }
      if (e2 < dx) {
        err += dx
        y0 += sy
      }
    }
  }

  drawTriangle (v1, v2, v3, color, texture) {
    // Sorting the points in order to always have this order on screen p1, p2 & p3
    // with p1 always up (thus having the Y the lowest possible to be near the top screen)
    // then p2 between p1 & p3
    if (v1.coordinates.y > v2.coordinates.y) {
      const temp = v2
      v2 = v1
      v1 = temp
    }

    if (v2.coordinates.y > v3.coordinates.y) {
      const temp = v2
      v2 = v3
      v3 = temp
    }

    if (v1.coordinates.y > v2.coordinates.y) {
      const temp = v2
      v2 = v1
      v1 = temp
    }

    const p1 = v1.coordinates
    const p2 = v2.coordinates
    const p3 = v3.coordinates

    // Light position
    const lightPos = new Vector3(0, 10, 10)
    // computing the cos of the angle between the light vector and the normal vector
    // it will return a value between 0 and 1 that will be used as the intensity of the color
    const nl1 = this.computeNDotL(v1.worldCoordinates, v1.normal, lightPos)
    const nl2 = this.computeNDotL(v2.worldCoordinates, v2.normal, lightPos)
    const nl3 = this.computeNDotL(v3.worldCoordinates, v3.normal, lightPos)

    const data = {}

    // Computing lines' directions
    let dP1P2
    let dP1P3

    // http://en.wikipedia.org/wiki/Slope
    // Computing slopes
    if (p2.y - p1.y > 0) {
      dP1P2 = (p2.x - p1.x) / (p2.y - p1.y)
    } else {
      dP1P2 = 0
    }

    if (p3.y - p1.y > 0) {
      dP1P3 = (p3.x - p1.x) / (p3.y - p1.y)
    } else {
      dP1P3 = 0
    }

    // First case where triangles are like that:
    // P1
    // -
    // --
    // - -
    // -  -
    // -   - P2
    // -  -
    // - -
    // -
    // P3
    if (dP1P2 > dP1P3) {
      for (let y = p1.y >> 0; y <= p3.y >> 0; y++) {
        data.currentY = y

        if (y < p2.y) {
          data.ndotla = nl1
          data.ndotlb = nl3
          data.ndotlc = nl1
          data.ndotld = nl2

          data.ua = v1.textureCoordinates.x
          data.ub = v3.textureCoordinates.x
          data.uc = v1.textureCoordinates.x
          data.ud = v2.textureCoordinates.x

          data.va = v1.textureCoordinates.y
          data.vb = v3.textureCoordinates.y
          data.vc = v1.textureCoordinates.y
          data.vd = v2.textureCoordinates.y

          this.processScanLine(data, v1, v3, v1, v2, color, texture)
        } else {
          data.ndotla = nl1
          data.ndotlb = nl3
          data.ndotlc = nl2
          data.ndotld = nl3

          data.ua = v1.textureCoordinates.x
          data.ub = v3.textureCoordinates.x
          data.uc = v2.textureCoordinates.x
          data.ud = v3.textureCoordinates.x

          data.va = v1.textureCoordinates.y
          data.vb = v3.textureCoordinates.y
          data.vc = v2.textureCoordinates.y
          data.vd = v3.textureCoordinates.y

          this.processScanLine(data, v1, v3, v2, v3, color, texture)
        }
      }
    } else {
      // Second case where triangles are like that:
      //       P1
      //        -
      //       --
      //      - -
      //     -  -
      // P2 -   -
      //     -  -
      //      - -
      //        -
      //       P3
      for (let y = p1.y >> 0; y <= p3.y >> 0; y++) {
        data.currentY = y

        if (y < p2.y) {
          data.ndotla = nl1
          data.ndotlb = nl2
          data.ndotlc = nl1
          data.ndotld = nl3

          data.ua = v1.textureCoordinates.x
          data.ub = v2.textureCoordinates.x
          data.uc = v1.textureCoordinates.x
          data.ud = v3.textureCoordinates.x

          data.va = v1.textureCoordinates.y
          data.vb = v2.textureCoordinates.y
          data.vc = v1.textureCoordinates.y
          data.vd = v3.textureCoordinates.y

          this.processScanLine(data, v1, v2, v1, v3, color, texture)
        } else {
          data.ndotla = nl2
          data.ndotlb = nl3
          data.ndotlc = nl1
          data.ndotld = nl3

          data.ua = v2.textureCoordinates.x
          data.ub = v3.textureCoordinates.x
          data.uc = v1.textureCoordinates.x
          data.ud = v3.textureCoordinates.x

          data.va = v2.textureCoordinates.y
          data.vb = v3.textureCoordinates.y
          data.vc = v1.textureCoordinates.y
          data.vd = v3.textureCoordinates.y

          this.processScanLine(data, v2, v3, v1, v3, color, texture)
        }
      }
    }
  }

  // drawing line between 2 points from left to right
  // vavb -> vcvd
  // va, vb, vc, vd must then be sorted before
  processScanLine (data, va, vb, vc, vd, color, texture) {
    const pa = va.coordinates
    const pb = vb.coordinates
    const pc = vc.coordinates
    const pd = vd.coordinates

    // Thanks to current Y, we can compute the gradient to compute others values like
    // the starting X (sx) and ending X (ex) to draw between
    // if pa.Y == pb.Y or pc.Y == pd.Y, gradient is forced to 1
    const gradient1 = pa.y !== pb.y ? (data.currentY - pa.y) / (pb.y - pa.y) : 1
    const gradient2 = pc.y !== pd.y ? (data.currentY - pc.y) / (pd.y - pc.y) : 1

    const sx = Mathf.interpolate(pa.x, pb.x, gradient1) >> 0
    const ex = Mathf.interpolate(pc.x, pd.x, gradient2) >> 0

    // Starting Z & ending Z
    const z1 = Mathf.interpolate(pa.z, pb.z, gradient1)
    const z2 = Mathf.interpolate(pc.z, pd.z, gradient2)

    // Interpolating normals on Y
    const snl = Mathf.interpolate(data.ndotla, data.ndotlb, gradient1)
    const enl = Mathf.interpolate(data.ndotlc, data.ndotld, gradient2)

    // Interpolating texture coordinates on Y
    const su = Mathf.interpolate(data.ua, data.ub, gradient1)
    const eu = Mathf.interpolate(data.uc, data.ud, gradient2)
    const sv = Mathf.interpolate(data.va, data.vb, gradient1)
    const ev = Mathf.interpolate(data.vc, data.vd, gradient2)

    // Drawing a line from left (sx) to right (ex)
    for (let x = sx; x < ex; x++) {
      const gradient = (x - sx) / (ex - sx)

      // Interpolating Z, normal and texture coordinates on X
      const z = Mathf.interpolate(z1, z2, gradient)
      const ndotl = Mathf.interpolate(snl, enl, gradient)
      const u = Mathf.interpolate(su, eu, gradient)
      const v = Mathf.interpolate(sv, ev, gradient)

      let textureColor
      if (texture) {
        textureColor = texture.map(u, v)
      } else {
        textureColor = new Color4(1, 1, 1, 1)
      }

      // changing the color value using the cosine of the angle between the light vector and the normal vector
      // and the texture color.
      this.drawPoint(new Vector3(x, data.currentY, z), new Color4(color.r * ndotl * textureColor.r, color.g * ndotl * textureColor.g, color.b * ndotl * textureColor.b, 1))
    }
  }

  // Compute the cosine of the angle between the light vector and the normal vector
  // Returns a value between 0 and 1
  computeNDotL (vertex, normal, lightPosition) {
    var lightDirection = Vector3.subtract(lightPosition, vertex)

    normal.normalize()
    lightDirection.normalize()

    return Math.max(0, Vector3.dot(normal, lightDirection))
  }
}

export default Device
