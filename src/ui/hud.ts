import { Train } from "../core/train";

export function initUI(train: Train) {
    const speedDisplay = document.getElementById('speed-display');
    const throttleSlider = document.getElementById('throttle-slider') as HTMLInputElement;
    const timeDisplay = document.getElementById('time-display');
    const speedProgress = document.querySelector('.speedometer-progress') as SVGCircleElement;
    const circumference = 2 * Math.PI * 45; // from speedometer radius

    // Throttle control
    if (throttleSlider) {
        throttleSlider.addEventListener('input', () => {
            const throttleValue = parseInt(throttleSlider.value) / 100;
            train.setThrottle(throttleValue);
        });
    }

    // Update loop for UI elements
    setInterval(() => {
        // Update speed display
        const currentSpeed = train.getSpeedKPH();
        if (speedDisplay) {
            speedDisplay.textContent = currentSpeed.toString();
        }

        // Update speedometer progress
        const progress = currentSpeed / 120; // Assuming max speed is 120
        const offset = circumference * (1 - progress);
        if (speedProgress) {
            speedProgress.style.strokeDashoffset = offset.toString();
        }

        // Update time
        if (timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleTimeString('nl-NL');
        }

    }, 100);
}
