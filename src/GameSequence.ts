import store from "./store/index";

export default class GameSequence {
    private newRoundDuration: number = 3000;
    private maxValue: number = 5000;
    private elapsed: number = 0;
    private delay: number = 25;
    private crashValue: number = 1;

    constructor() {
        this.initialise();
    }

    /**
     * Initialises the class
     */
    initialise() {
        store.methods.initialiseState({ value: this.newRoundDuration });
        this.startRound();
    }

    /**
     * Starts a game round after the place your bets delay
     */
    startRound() {
        this.elapsed = 0;
        this.crashValue = this.generateMultiplier();
        console.log(this.crashValue);
        setTimeout(() => {
            store.methods.startRound();
            this.autoIncrement();
        }, this.newRoundDuration);
    }

    /**
     * Auto increments the multiplier
     */
    autoIncrement() {
        setTimeout(() => {
            this.elapsed += this.delay;
            const value = this.easeValue(this.elapsed);
            if (value >= this.crashValue) {
                this.endRound();
                // start delay between round
                return;
            }
            this.setMultiplier(value);
            this.autoIncrement();
        }, this.delay);
    }

    /**
     * Generates the final round multiplier
     * @returns Multiplier
     */
    generateMultiplier = (): number => {
        const value: number = this.floorValue((0.01 + 99 / Math.random()) / 100);
        return value < this.maxValue ? value : this.maxValue;
    };

    /**
     * Floors a value to 2dp
     * @param {Number} value
     * @returns 2dp value
     */
    floorValue(value: number): number {
        return Math.floor(value * 100) / 100;
    }

    /**
     * Increases the value by an easing function
     * @param {Number} elapsed (ms)
     * @returns Value incremented based on the duration
     */
    easeValue(elapsed: number): number {
        return Math.exp((elapsed / 1e3) * 0.07) * 1.275 - 0.27;
    }

    /**
     * Sets the value in the store
     * @param {Number} value
     */
    setMultiplier(value: number) {
        store.methods.setMultiplier({ value });
    }

    /**
     * On the round end, set state to create time
     */
    endRound() {
        this.setMultiplier(this.crashValue);
        store.methods.endRound();
        this.startRound();
    }
}
