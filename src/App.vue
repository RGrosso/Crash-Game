<template>
    <div>
        <TheHeader />
        <TheGame />
    </div>
</template>

<script lang="ts" setup>
import TheHeader from "./components/TheHeader.vue";
import TheGame from "./components/TheGame.vue";

import { provide } from "vue";
import { Store } from "./interfaces/store";
import store from "./store";

provide("store", <Store>store);
</script>
