import Mesh from '../lib/model/mesh'

class IO {
  // Loading the JSON file in an asynchronous manner and
  // calling back with the function passed providing the array of meshes loaded
  static loadJSONFileAsync (fileName, callback) {
    let jsonObject = {}
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.overrideMimeType('application/json')
    xmlhttp.open('GET', fileName, true)
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        jsonObject = JSON.parse(xmlhttp.responseText)
        callback(Mesh.createMeshesFromJSON(jsonObject))
      }
    }
    xmlhttp.send(null)
  }
}

export default IO
