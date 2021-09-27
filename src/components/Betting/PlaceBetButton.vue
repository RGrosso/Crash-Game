<template>
    <button @click="store.methods.placeBet" type="button" class="btn btn-primary action-btn">
        <span class="action">Place Bet</span>
        <span class="amount">({{ formattedBetAmount }})</span>
    </button>
</template>

<script lang="ts" setup>
import { inject, ref, computed, watchEffect } from "vue";
import { Store } from "../../interfaces/store";
import Utils from "../../Utils";

const store = <Store>inject("store");
const betAmount = ref(store.getters.cashBetAmount());
const formattedBetAmount = computed(() => Utils.formatCurrency(betAmount.value));

watchEffect(() => (betAmount.value = store.getters.cashBetAmount()));
</script>
