<template>
    <button @click="store.methods.cashoutBet" type="button" class="btn btn-success action-btn">
        <span class="action">Cashout</span>
        <span class="amount">({{ formattedBetAmount }})</span>
    </button>
</template>

<script lang="ts" setup>
import { inject, ref, computed, watchEffect } from "vue";
import { Store } from "../../interfaces/store";
import Utils from "../../utils";

const store = <Store>inject("store");
const cashoutAmount = ref(store.getters.cashoutAmount());
const formattedBetAmount = computed(() => Utils.formatCurrency(cashoutAmount.value));

watchEffect(() => (cashoutAmount.value = store.getters.cashoutAmount()));
</script>
