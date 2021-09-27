<template>
    <div class="col-12 col-md-4">
        <div class="pt-3">
            <div class="mb-3">
                <label for="bet-amount" class="form-label">Bet Amount</label>
                <div class="input-group dark-input-group">
                    <span class="input-group-text">£</span>
                    <input
                        v-model="cashBetAmount"
                        :max="Utils.convertToPounds(store.state.betRange.max)"
                        :min="Utils.convertToPounds(store.state.betRange.min)"
                        :step="Utils.convertToPounds(store.state.betRange.step)"
                        :disabled="userCannotChangeBet"
                        type="number"
                        class="form-control"
                        placeholder="Bet Amount"
                        aria-label="Bet Amount"
                        id="bet-amount"
                    />
                    <button @click="halfBet" class="btn" type="button" :disabled="userCannotChangeBet">½</button>
                    <button @click="doubleBet" class="btn" type="button" :disabled="userCannotChangeBet">2x</button>
                    <button @click="maxBet" class="btn" type="button" :disabled="userCannotChangeBet">Max</button>
                </div>
            </div>
            <AutoBetCheckbox class="mb-3" />
            <ActionButton />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { inject, ref, computed, watchEffect } from "vue";
import { Store } from "../../interfaces/store";
import ActionButton from "./ActionButton.vue";
import Utils from "../../Utils";
import AutoBetCheckbox from "./AutoBetCheckbox.vue";

const store = <Store>inject("store");
const betAmount = ref(store.state.betAmount);

const updateBet = (value: number) => store.methods.setBetAmount({ value });

const cashBetAmount = computed({
    get: () => Utils.convertToPounds(betAmount.value),
    set: (value: number) => updateBet(Utils.convertToPence(value)),
});
const userCannotChangeBet = computed(() => store.state.betState !== "BET_INACTIVE");

const halfBet = () => updateBet(betAmount.value / 2);
const doubleBet = () => updateBet(betAmount.value * 2);
const maxBet = () => updateBet(store.state.betRange.max);

watchEffect(() => (betAmount.value = store.state.betAmount));
</script>
