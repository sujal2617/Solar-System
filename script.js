// script.js

// Set up scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('solarCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(pointLight);

// Sun
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planet Data
const planets = [
    { name: "Mercury", color: 0xaaaaaa, distance: 6, size: 0.4, speed: 0.02 },
    { name: "Venus",   color: 0xffcc99, distance: 8, size: 0.6, speed: 0.015 },
    { name: "Earth",   color: 0x3399ff, distance: 10, size: 0.65, speed: 0.01 },
    { name: "Mars",    color: 0xff3300, distance: 12, size: 0.5, speed: 0.008 },
    { name: "Jupiter", color: 0xff9966, distance: 16, size: 1.2, speed: 0.006 },
    { name: "Saturn",  color: 0xffcc66, distance: 20, size: 1.0, speed: 0.005 },
    { name: "Uranus",  color: 0x66ffff, distance: 24, size: 0.8, speed: 0.004 },
    { name: "Neptune", color: 0x3366ff, distance: 28, size: 0.8, speed: 0.003 }
];

// Create planet meshes
planets.forEach(p => {
    const geometry = new THREE.SphereGeometry(p.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: p.color });
    const mesh = new THREE.Mesh(geometry, material);
    p.mesh = mesh;
    scene.add(mesh);
});

// Create speed controls
const controlsDiv = document.getElementById('controls');
planets.forEach(p => {
    const label = document.createElement('label');
    label.innerText = `${p.name} Speed: `;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = 0.001;
    input.max = 0.05;
    input.step = 0.001;
    input.value = p.speed;
    input.oninput = () => {
        p.speed = parseFloat(input.value);
    };
    label.appendChild(input);
    controlsDiv.appendChild(label);
    controlsDiv.appendChild(document.createElement('br'));
});

// Animate orbits
let angle = 0;

function animate() {
    requestAnimationFrame(animate);
    angle += 0.01;

    planets.forEach(p => {
        const orbitAngle = angle * p.speed;
        p.mesh.position.x = Math.cos(orbitAngle) * p.distance;
        p.mesh.position.z = Math.sin(orbitAngle) * p.distance;
    });

    renderer.render(scene, camera);
}

camera.position.z = 40;
animate();
