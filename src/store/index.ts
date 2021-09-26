import { reactive } from "vue";
import { ValuePayload, State, Getters, Methods } from "../interfaces/store";

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
};

const getters: Getters = {
    multiplier: (): string => `${state.multiplier.toFixed(2)}x`,
    cashBetAmount: (): number => state.betAmount / 100,
    cashBalance: (): number => state.balance / 100,
};

export default {
    state,
    methods,
    getters,
};
