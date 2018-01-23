import Scene from './scene'

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

let scene
// Events
let mousedown = false
let mx = 0
let my = 0

document.addEventListener('DOMContentLoaded', loadDOMCompleted, false)
document.addEventListener('mouseup', stopMove)

document.addEventListener('keydown', e => {
  const speed = 0.1
  switch (e.key) {
    case 'ArrowUp':
      scene.camera.move(0, 1, speed)
      break
    case 'ArrowDown':
      scene.camera.move(0, -1, speed)
      break
    case 'ArrowLeft':
      scene.camera.move(-1, 0, speed)
      break
    case 'ArrowRight':
      scene.camera.move(1, 0, speed)
      break
  }
})

function loadDOMCompleted () {
  scene = new Scene()

  scene.canvas.addEventListener('mousedown', initMove)
  scene.canvas.addEventListener('mousemove', move)

  scene.canvas.addEventListener('wheel', e => {
    scene.camera.zoom(e.deltaY, 0.1)
  })
}

// Initialize the movement
function initMove (e) {
  mousedown = true
  mx = e.clientX
  my = e.clientY
}

function move (e) {
  if (mousedown) {
    var theta = (e.clientX - mx) * Math.PI / 360
    var phi = (e.clientY - my) * Math.PI / 180

    for (let mesh of scene.meshes) {
      mesh.rotate(theta, phi)
    }

    // scene.camera.rotate(theta, phi, 0.1)

    mx = e.clientX
    my = e.clientY
  }
}

function stopMove () {
  mousedown = false
}
