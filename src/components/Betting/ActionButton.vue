<template>
    <PlaceBetButton v-if="betState === 'BET_INACTIVE'" />
</template>

<script lang="ts" setup>
import PlaceBetButton from "./PlaceBetButton.vue";
import { inject, watchEffect, ref } from "vue";
import { Store } from "../../interfaces/store";
const store = <Store>inject("store");
const betState = ref(store.state.betState);

watchEffect(() => (betState.value = store.state.betState));
</script>
