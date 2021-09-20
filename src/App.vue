<template>
    <div class="container">
        <p>{{ hello }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        const hello: string = "hello world";

        return { hello };
    },
});
</script>
