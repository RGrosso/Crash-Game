import { reactive } from "vue";
import { ValuePayload, State } from "../interfaces/store";

const state = <State>reactive({
    autoBetEnabled: false,
    gameRoundActive: false,
    multiplier: 0,
    newRoundDuration: 3000,
    betRange: {
        min: 100,
        max: 50000,
    },
    balance: 1000000,
    betActive: false,
    betAmount: 100,
    betState: "BET_INACTIVE",
});

const methods = {
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
};

export default {
    state,
    methods,
};
