<template>
    <div class="form-check form-switch mb-3">
        <input
            v-model="autoBetEnabled"
            class="form-check-input"
            type="checkbox"
            id="auto-bet-checkbox"
            @change="updateAutoBetEnabled"
        />
        <label class="form-check-label" for="auto-bet-checkbox">Auto Bet</label>
    </div>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import { Store } from "../../interfaces/store";

const store = <Store>inject("store");
const autoBetEnabled = ref(false);

const updateAutoBetEnabled = () => store.methods.updateAutoBet(autoBetEnabled.value);
</script>
