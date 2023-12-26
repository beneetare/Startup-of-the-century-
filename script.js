// script.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x87CEEB }), // Face 0
    new THREE.MeshBasicMaterial({ color: 0xFF6347 }), // Face 1
    new THREE.MeshBasicMaterial({ color: 0x32CD32 }), // Face 2
    new THREE.MeshBasicMaterial({ color: 0xFFFF00 }), // Face 3
    new THREE.MeshBasicMaterial({ color: 0x8A2BE2 }), // Face 4
    new THREE.MeshBasicMaterial({ color: 0xFF69B4 }), // Face 5
];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

const wireframeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
const wireframeCube = new THREE.Mesh(geometry, wireframeMaterial);
scene.add(wireframeCube);

camera.position.z = 5;

let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

let zoomSpeed = 0.1;

document.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('click', toggleRotation);
slider = document.getElementById('zoomSlider');
slider.addEventListener('input', handleZoomChange);

function handleMouseMove(event) {
    if (!isDragging) return;

    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    cube.rotation.x += deltaMove.y * 0.01;
    cube.rotation.y += deltaMove.x * 0.01;
    wireframeCube.rotation.copy(cube.rotation);

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function toggleRotation() {
    cube.userData.isSpinning = !cube.userData.isSpinning;
    wireframeCube.userData.isSpinning = cube.userData.isSpinning;
}

function handleZoomChange(event) {
    const zoomLevel = parseFloat(event.target.value);
    camera.position.z = zoomLevel * 5; // Adjust the factor as needed
}


const animate = function () {
    requestAnimationFrame(animate);

    if (cube.userData.isSpinning) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        wireframeCube.rotation.copy(cube.rotation);
    }

    renderer.render(scene, camera);
};

animate();