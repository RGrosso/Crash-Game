import { reactive } from "vue";
import { ValuePayload, State, Getters, Methods } from "../interfaces/store";
import Utils from "../Utils";

const state = <State>reactive({
    autoBetEnabled: false,
    gameRoundActive: false,
    multiplier: 1,
    newRoundDuration: 3000,
    betRange: {
        min: 100,
        max: 50000,
        step: 10,
    },
    balance: 1000000,
    betActive: false,
    betAmount: 100,
    betState: "BET_INACTIVE",
});

const methods: Methods = {
    setMultiplier: ({ value }: ValuePayload) => {
        state.multiplier = value;
    },
    initialiseState: ({ value }: ValuePayload) => {
        state.newRoundDuration = value;
    },
    startRound: () => {
        state.multiplier = 1;
        state.gameRoundActive = true;

        // if bet placed, set state to active
        if (state.betState === "BET_PLACED") {
            state.betState = "BET_ACTIVE";
        }
    },
    endRound: () => {
        state.gameRoundActive = false;

        if (state.betState === "BET_PENDING" || state.autoBetEnabled) {
            // if the bet is pending or autobet, place it for next round
            state.balance = Math.floor(state.balance - state.betAmount);
            state.betState = "BET_PLACED";
        } else {
            // otherwise set the bet to inactive
            state.betState = "BET_INACTIVE";
        }
    },
    setBetAmount: ({ value }: ValuePayload) => {
        if (state.betState !== "BET_INACTIVE") {
            return; //bet can only be placed
        }

        const formattedValue = Math.round(value / state.betRange.step) * state.betRange.step;

        if (formattedValue > state.balance || formattedValue > state.balance) {
            return;
        }

        if (formattedValue < state.betRange.min) {
            state.betAmount = state.betRange.min;
            return;
        }

        if (formattedValue > state.betRange.max) {
            state.betAmount = state.betRange.max;
            return;
        }

        state.betAmount = value;
    },
    placeBet: () => {
        if (!state.betActive) {
            state.betActive = true;

            if (!state.gameRoundActive) {
                state.balance = Math.floor(state.balance - state.betAmount);
                state.betState = "BET_PLACED";
            } else if (state.betState === "BET_INACTIVE") {
                state.betState = "BET_PENDING";
            }
        }
    },
    cancelBet: () => {
        if (state.betActive) {
            // only increase the bet if it was placed and not pending
            if (!state.gameRoundActive && state.betState === "BET_PLACED") {
                state.balance = Math.floor(state.balance + state.betAmount);
            }
            state.betActive = false;
            state.autoBetEnabled = false;
            state.betState = "BET_INACTIVE";
        }
    },
    cashoutBet: () => {
        const currentMultiplier: number = state.multiplier;
        if (state.gameRoundActive) {
            state.balance = Math.floor(state.balance + currentMultiplier * state.betAmount);
            state.betActive = state.autoBetEnabled; // if auto bet is active, bet remains active
            state.betState = state.autoBetEnabled ? "BET_PENDING" : "BET_INACTIVE";
        }
    },
};

const getters: Getters = {
    multiplier: (): string => `${state.multiplier.toFixed(2)}x`,
    cashBetAmount: (): number => Utils.convertToPounds(state.betAmount),
    cashBalance: (): number => Utils.convertToPounds(state.balance),
    cashoutAmount: (): number => Utils.convertToPounds(Math.floor(state.multiplier * state.betAmount)),
};

export default {
    state,
    methods,
    getters,
};
