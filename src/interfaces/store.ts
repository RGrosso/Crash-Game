export interface State {
    autoBetEnabled: boolean;
    gameRoundActive: boolean;
    multiplier: number;
    newRoundDuration: number;
    betRange: {
        min: number;
        max: number;
        step: number;
    };
    balance: number;
    betActive: boolean;
    betAmount: number;
    betState: BetState;
}

type BetState = "BET_PLACED" | "BET_ACTIVE" | "BET_INACTIVE" | "BET_PENDING";

export interface ValuePayload {
    value: number;
}

export interface Methods {
    setMultiplier(payload: ValuePayload): void;
    initialiseState(payload: ValuePayload): void;
    startRound(): void;
    endRound(): void;
    setBetAmount(payload: ValuePayload): void;
    placeBet(): void;
    cancelBet(): void;
    cashoutBet(): void;
    updateAutoBet(enabled: boolean): void;
}

export interface Getters {
    multiplier(): string;
    cashBetAmount(): number;
    cashBalance(): number;
    cashoutAmount(): number;
}

export interface Store {
    state: State;
    methods: Methods;
    getters: Getters;
}
