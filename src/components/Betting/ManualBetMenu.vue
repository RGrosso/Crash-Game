<template>
    <div class="col-12 col-md-4">
        <form class="pt-3">
            <div class="mb-3">
                <label for="bet-amount" class="form-label">Bet Amount</label>
                <div class="input-group dark-input-group">
                    <span class="input-group-text">£</span>
                    <input
                        type="number"
                        class="form-control"
                        placeholder="Bet Amount"
                        aria-label="Bet Amount"
                        id="bet-amount"
                    />
                    <button class="btn" type="button">½</button>
                    <button class="btn" type="button">2x</button>
                    <button class="btn" type="button">Max</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>

</script>
