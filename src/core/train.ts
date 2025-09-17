import * as THREE from 'three';

export class Train {
    public mesh: THREE.Mesh;
    public speed: number = 0;
    private throttle: number = 0;
    private maxSpeed: number = 120; // kph

    constructor(scene: THREE.Scene) {
        const geometry = new THREE.BoxGeometry(2.5, 2, 10);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.y = 1.2;
        scene.add(this.mesh);
    }

    public setThrottle(value: number) {
        this.throttle = value; // value between 0 and 1
    }

    public update() {
        // Simple physics
        const acceleration = this.throttle * 0.1;
        const friction = 0.01;
        
        this.speed += acceleration;
        this.speed -= friction;

        if (this.speed < 0) this.speed = 0;
        if (this.speed > this.maxSpeed / 3.6) { // convert kph to m/s for internal calcs
             this.speed = this.maxSpeed / 3.6;
        }

        this.mesh.position.z -= this.speed * 0.05; // Move along z-axis
    }

    public getSpeedKPH(): number {
        return Math.round(this.speed * 3.6);
    }
}
