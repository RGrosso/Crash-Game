<template>
    <!-- TODO: Replace with a canvas or Three JS -->
    <div id="game" class="mx-auto col-12 p-2">
        <div id="game-square" class="d-flex justify-content-center align-items-center">
            <h2 class="mb-0 monospace">{{ multipler }}</h2>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, watchEffect, ref } from "vue";
import { Store } from "../interfaces/store";

const store = <Store>inject("store");
const multipler = ref(store.getters.multiplier());

watchEffect(() => multipler.value = store.getters.multiplier())
</script>
