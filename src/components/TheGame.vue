<template>
    <div id="game" class="col-12 col-md-8 p-2">
        <div id="game-square" class="d-flex justify-content-center align-items-center">
            <h2 v-if="gameRoundActive" class="mb-0 monospace">{{ multipler }}</h2>
            <h3 v-else>Preparing Round...</h3>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, watchEffect, ref } from "vue";
import { Store } from "../interfaces/store";

const store = <Store>inject("store");
const multipler = ref(store.getters.multiplier());
const gameRoundActive = ref(store.state.gameRoundActive);

watchEffect(() => {
    multipler.value = store.getters.multiplier();
    gameRoundActive.value = store.state.gameRoundActive;
});
</script>
