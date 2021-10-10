<template>
    <div id="game" class="col-12 col-md-8 p-2" :class="`game-active-${gameRoundActive}`">
        <div
            id="game-square"
            class="d-flex justify-content-center align-items-center position-relative overflow-hidden"
        >
            <GameRocket />
            <div class="position-absolute" style="top: 5%">
                <h2 v-if="gameRoundActive" class="mb-0 monospace">{{ multipler }}</h2>
                <h3 v-else>Preparing Round...</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, watchEffect, ref } from "vue";
import { Store } from "../interfaces/store";
import GameRocket from "./GameRocket.vue";

const store = <Store>inject("store");
const multipler = ref(store.getters.multiplier());
const gameRoundActive = ref(store.state.gameRoundActive);

watchEffect(() => {
    multipler.value = store.getters.multiplier();
    gameRoundActive.value = store.state.gameRoundActive;
});
</script>
