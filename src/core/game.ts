import * as THREE from 'three';
import { Train } from './train';
import { initUI } from '../ui/hud';

export class Game {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private train: Train;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('game-canvas') as HTMLCanvasElement,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x87ceeb); // Sky blue background

        this.train = new Train(this.scene);

        this.setupScene();
        initUI(this.train);
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    private setupScene() {
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 50);
        this.scene.add(directionalLight);

        // Ground
        const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // Forest green
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);

        // Simple tracks
        const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
        for (let i = -500; i < 500; i += 5) {
            const sleeperGeometry = new THREE.BoxGeometry(3, 0.2, 1);
            const sleeper = new THREE.Mesh(sleeperGeometry, trackMaterial);
            sleeper.position.set(0, 0.1, i);
            this.scene.add(sleeper);
        }
        const railGeometry = new THREE.BoxGeometry(0.2, 0.2, 1000);
        const leftRail = new THREE.Mesh(railGeometry, trackMaterial);
        leftRail.position.set(-1, 0.2, 0);
        this.scene.add(leftRail);
        const rightRail = new THREE.Mesh(railGeometry, trackMaterial);
        rightRail.position.set(1, 0.2, 0);
        this.scene.add(rightRail);


        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(this.train.mesh.position);
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate() {
        requestAnimationFrame(() => this.animate());

        this.train.update();

        // Update camera to follow train
        this.camera.position.x = this.train.mesh.position.x + 0;
        this.camera.position.y = this.train.mesh.position.y + 5;
        this.camera.position.z = this.train.mesh.position.z + 15;
        this.camera.lookAt(this.train.mesh.position);

        this.renderer.render(this.scene, this.camera);
    }
}
