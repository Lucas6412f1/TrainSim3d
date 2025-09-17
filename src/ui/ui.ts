import { Train } from "../core/train";

export class UI {
    private train: Train;
    private speedDisplay: HTMLElement;
    private throttleSlider: HTMLInputElement;
    private timeDisplay: HTMLElement;
    private speedProgress: SVGCircleElement;
    private notification: HTMLElement;
    private readonly circumference: number;

    constructor(train: Train) {
        this.train = train;
        this.speedDisplay = document.getElementById('speed-display')!;
        this.throttleSlider = document.getElementById('throttle-slider') as HTMLInputElement;
        this.timeDisplay = document.getElementById('time-display')!;
        this.speedProgress = document.querySelector('.speedometer-progress') as SVGCircleElement;
        this.notification = document.getElementById('notification')!;
        this.circumference = 2 * Math.PI * this.speedProgress.r.baseVal.value;

        this.initControls();
    }

    private initControls() {
        if (this.throttleSlider) {
            this.throttleSlider.addEventListener('input', () => {
                const throttleValue = parseInt(this.throttleSlider.value) / 100;
                this.train.setThrottle(throttleValue);
            });
        }
        
        document.getElementById('horn-btn')?.addEventListener('click', () => {
            this.showNotification('Toot Toot!');
            // new Audio('/path/to/horn.mp3').play();
        });
    }

    public update() {
        // Speedometer
        const currentSpeed = this.train.getSpeedKPH();
        this.speedDisplay.textContent = currentSpeed.toString();
        const progress = currentSpeed / 160; // Max speed 160 kph
        const offset = this.circumference * (1 - progress);
        this.speedProgress.style.strokeDashoffset = offset.toString();

        // Time
        this.timeDisplay.textContent = new Date().toLocaleTimeString('nl-NL');
    }

    private showNotification(message: string) {
        this.notification.textContent = message;
        this.notification.style.opacity = '1';
        setTimeout(() => {
            this.notification.style.opacity = '0';
        }, 2000);
    }
}
