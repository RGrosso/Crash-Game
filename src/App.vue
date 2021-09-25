<template>
    <div>
        <TheHeader />
        <div class="row g-2 w-100">
            <TheGame />
            <ManualBetMenu />
        </div>
    </div>
</template>

<script lang="ts" setup>
import ManualBetMenu from "./components/Betting/ManualBetMenu.vue";
import TheGame from "./components/TheGame.vue";
import TheHeader from "./components/TheHeader.vue";

import { provide } from "vue";
import { Store } from "./interfaces/store";
import store from "./store";

provide("store", <Store>store);
</script>
