<template>
    <div>
        <TheHeader></TheHeader>
        <div class="container">
            <p>{{ hello }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TheHeader from "./components/TheHeader.vue";
const hello: string = "hello world";
</script>
