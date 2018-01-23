import Texture from './texture'
import Transform from './transform'
import Vector2 from '../math/vector2'
import Vector3 from '../math/vector3'
import Vertex from './vertex'

class Mesh {
  constructor (name, verticesCount, facesCount) {
    this.name = name
    this.vertices = new Array(verticesCount)
    this.faces = new Array(facesCount)
    this.transform = new Transform()
  }

  rotate (theta, phi) {
    const eulerAngle = this.transform.rotation.eulerAngle
    eulerAngle.x += phi
    eulerAngle.y -= theta

    this.transform.rotation.eulerAngle = eulerAngle
  }

  static createMeshesFromJSON (jsonObject) {
    const meshes = []
    const materials = []

    for (let jsonMaterial of jsonObject.materials) {
      var material = {}

      material.name = jsonMaterial.name
      material.id = jsonMaterial.id
      if (jsonMaterial.diffuseTexture) {
        material.diffuseTextureName = jsonMaterial.diffuseTexture.name
      }

      materials[material.id] = material
    }

    for (let jsonMesh of jsonObject.meshes) {
      const verticesArray = jsonMesh.vertices || jsonMesh.positions
      // Faces
      const indicesArray = jsonMesh.indices

      const uvCount = jsonMesh.uvCount
      let verticesStep = 1

      // Depending of the number of texture's coordinates per vertex
      // we're jumping in the vertices array by 6, 8 & 10 windows frame
      switch (uvCount) {
        case 0:
          verticesStep = 6
          break
        case 1:
          verticesStep = 8
          break
        case 2:
          verticesStep = 10
          break
      }

      // The number of interesting vertices information for us
      const verticesCount = verticesArray.length / verticesStep
      // Number of faces is logically the size of the array divided by 3 (A, B, C)
      const facesCount = indicesArray.length / 3
      const mesh = new Mesh(jsonMesh.name, verticesCount, facesCount)

      // Filling the Vertices array of our mesh first
      for (let i = 0; i < verticesCount; i++) {
        const x = verticesArray[i * verticesStep]
        const y = verticesArray[i * verticesStep + 1]
        const z = verticesArray[i * verticesStep + 2]
        // Loading the vertex normal exported by Blender
        const nx = verticesArray[i * verticesStep + 3]
        const ny = verticesArray[i * verticesStep + 4]
        const nz = verticesArray[i * verticesStep + 5]

        let tc
        if (uvCount > 0) {
          const u = verticesArray[i * verticesStep + 6]
          const v = verticesArray[i * verticesStep + 7]
          tc = new Vector2(u, v)
        } else {
          tc = new Vector2(0, 0)
        }

        mesh.vertices[i] = new Vertex(new Vector3(x, y, z), new Vector3(nx, ny, nz), null, tc)
      }

      // Then filling the Faces array
      for (let i = 0; i < facesCount; i++) {
        var a = indicesArray[i * 3]
        var b = indicesArray[i * 3 + 1]
        var c = indicesArray[i * 3 + 2]
        mesh.faces[i] = {
          A: a,
          B: b,
          C: c
        }
      }

      // Getting the position you've set in Blender
      var position = jsonMesh.position
      mesh.transform.position = new Vector3(position[0], position[1], position[2])
      meshes.push(mesh)

      if (uvCount > 0) {
        const meshTextureId = jsonMesh.materialId
        const meshTextureName = materials[meshTextureId].diffuseTextureName
        mesh.texture = new Texture(meshTextureName, 512, 512)
      }
    }

    return meshes
  }
}

export default Mesh
