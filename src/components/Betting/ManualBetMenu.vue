<template>
    <div class="col-12 col-md-4">
        <div class="pt-3">
            <div class="mb-3">
                <label for="bet-amount" class="form-label">Bet Amount</label>
                <div class="input-group dark-input-group">
                    <span class="input-group-text">£</span>
                    <input
                        v-model="cashBetAmount"
                        :max="convertToPounds(store.state.betRange.max)"
                        :min="convertToPounds(store.state.betRange.min)"
                        :step="convertToPounds(store.state.betRange.step)"
                        type="number"
                        class="form-control"
                        placeholder="Bet Amount"
                        aria-label="Bet Amount"
                        id="bet-amount"
                    />
                    <button @click="halfBet" class="btn" type="button">½</button>
                    <button @click="doubleBet" class="btn" type="button">2x</button>
                    <button @click="maxBet" class="btn" type="button">Max</button>
                </div>
            </div>
            <ActionButton />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { inject, ref, computed, watchEffect } from "vue";
import { Store } from "../../interfaces/store";
import ActionButton from "./ActionButton.vue";

const store = <Store>inject("store");
const betAmount = ref(store.state.betAmount);

const updateBet = (value: number) => store.methods.setBetAmount({ value });

const convertToPence = (amount: number) => amount * 100;
const convertToPounds = (amount: number) => amount / 100;

const cashBetAmount = computed({
    get: () => convertToPounds(betAmount.value),
    set: (value: number) => updateBet(convertToPence(value)),
});

const halfBet = () => updateBet(betAmount.value / 2);
const doubleBet = () => updateBet(betAmount.value * 2);
const maxBet = () => updateBet(store.state.betRange.max);

watchEffect(() => (betAmount.value = store.state.betAmount));
</script>
