<template>
    <PlaceBetButton v-if="betState === 'BET_INACTIVE'" />
    <CashoutButton v-else-if="betState === 'BET_ACTIVE'" />
    <CancelBetButton v-else />
</template>

<script lang="ts" setup>
import CancelBetButton from "./CancelBetButton.vue";
import CashoutButton from "./CashoutButton.vue";
import PlaceBetButton from "./PlaceBetButton.vue";

import { inject, watchEffect, ref } from "vue";
import { Store } from "../../interfaces/store";
const store = <Store>inject("store");
const betState = ref(store.state.betState);

watchEffect(() => (betState.value = store.state.betState));
</script>
